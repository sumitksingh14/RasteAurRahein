import OpenAI from "openai";

export type LLMModelProvider = "gemini" | "nvidia" | "groq";

interface NvidiaModelConfig {
  id: string;
  label: string;
  streaming: boolean;
  maxTokens: number;
  extraParams?: Record<string, unknown>;
}

export const NVIDIA_MODELS: NvidiaModelConfig[] = [
  {
    id: "nvidia/nemotron-3.5-lightning-30b-a3b",
    label: "Nemotron 3.5 Lightning (30B)",
    streaming: false,
    maxTokens: 8192,
  },
  {
    id: "nvidia/nemotron-3-ultra-550b-a55b",
    label: "Nemotron Ultra (550B)",
    streaming: true,
    maxTokens: 16384,
    extraParams: { chat_template_kwargs: { enable_thinking: true } },
  },
  {
    id: "deepseek-ai/deepseek-v4-flash-0731",
    label: "DeepSeek v4 Flash",
    streaming: false,
    maxTokens: 16384,
    extraParams: { chat_template_kwargs: { thinking: true, reasoning_effort: "high" } },
  },
  {
    id: "nvidia/nemotron-3-nano-30b-a3b",
    label: "Nemotron Nano (30B)",
    streaming: true,
    maxTokens: 16384,
    extraParams: { reasoning_budget: 16384 },
  },
  {
    id: "nvidia/nemotron-3-super-120b-a12b",
    label: "Nemotron Super (120B)",
    streaming: true,
    maxTokens: 16384,
    extraParams: { chat_template_kwargs: { enable_thinking: true } },
  },
];

export const DEFAULT_NVIDIA_MODEL_ID = NVIDIA_MODELS[0].id;

export interface GenerateOptions {
  model: LLMModelProvider;
  specificModelId?: string; // used for nvidia or groq specific models
  jsonMode?: boolean; // if true, forces the output to be JSON
}

export class LLMService {
  static async generateContent(prompt: string, options: GenerateOptions): Promise<string> {
    switch (options.model) {
      case "gemini":
        return this.callGemini(prompt, options.jsonMode);
      case "nvidia":
        return this.callNvidia(prompt, options.specificModelId || DEFAULT_NVIDIA_MODEL_ID, options.jsonMode);
      case "groq":
        return this.callGroq(prompt, options.specificModelId || "openai/gpt-oss-20b", options.jsonMode);
      default:
        throw new Error(`Unsupported LLM provider: ${options.model}`);
    }
  }

  // ---------------------------------------------------------------------------
  // Gemini call helper
  // ---------------------------------------------------------------------------
  private static async callGemini(prompt: string, jsonMode = false): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured. Add it to .env.local.");
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 8192,
            ...(jsonMode ? { responseMimeType: "application/json" } : {}),
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Gemini returned an empty response.");
    return text;
  }

  // ---------------------------------------------------------------------------
  // Nvidia call helper (supports streaming + per-model extra params)
  // ---------------------------------------------------------------------------
  private static async callNvidia(prompt: string, modelId: string, jsonMode = false): Promise<string> {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      throw new Error("NVIDIA_API_KEY is not configured. Add it to .env.local.");
    }

    const config = NVIDIA_MODELS.find((m) => m.id === modelId) ?? NVIDIA_MODELS[0];

    const openai = new OpenAI({
      apiKey,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const baseParams: any = {
      model: config.id,
      messages: [{ role: "user" as const, content: prompt }],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: config.maxTokens,
      ...(config.extraParams ?? {}),
    };
    
    if (jsonMode) {
      baseParams.response_format = { type: "json_object" };
    }

    let raw: string;

    if (config.streaming) {
      const stream = await openai.chat.completions.create({
        ...baseParams,
        stream: true,
      } as any);

      const parts: string[] = [];
      for await (const chunk of stream as any) {
        const delta = chunk.choices?.[0]?.delta;
        const piece: string = delta?.content ?? "";
        if (piece) parts.push(piece);
      }
      raw = parts.join("");
    } else {
      const completion = await openai.chat.completions.create({
        ...baseParams,
        stream: false,
      } as any);

      const choice = completion.choices[0];
      if (!choice) throw new Error("Nvidia returned no choices.");
      raw = (choice.message as any).content ?? "";
    }

    if (!raw.trim()) throw new Error("Nvidia returned an empty response.");

    // Strip <think>...</think> reasoning blocks embedded inline before the JSON
    const cleaned = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    return cleaned || raw;
  }

  // ---------------------------------------------------------------------------
  // Groq call helper
  // ---------------------------------------------------------------------------
  private static async callGroq(prompt: string, modelId: string, jsonMode = false): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not configured. Add it to .env.local.");
    }

    const openai = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
    
    const params: any = {
      model: modelId,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
      stream: false,
    };
    
    if (jsonMode) {
      params.response_format = { type: "json_object" };
    }

    const completion = await openai.chat.completions.create(params);

    const text = completion.choices[0]?.message?.content;
    if (!text?.trim()) throw new Error("Groq returned an empty response.");

    // Strip any accidental <think>...</think> blocks
    return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim() || text;
  }
}
