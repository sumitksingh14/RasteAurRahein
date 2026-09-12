"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, PageContext } from "./types";

const STORAGE_KEY = "raahi_chat_messages_v1";

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Namaste! I'm **Raahi**, your guide to **Raste Aur Raahein**.\n\nAsk me anything about our documented trips, Himalayan passes, honest budgets, regional seasons, or how to use our AI itinerary planner!",
};

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [INITIAL_MESSAGE];
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // sessionStorage unavailable
    }
    return [INITIAL_MESSAGE];
  });

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
    setError(null);
    setMessages([INITIAL_MESSAGE]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string, pageContext: PageContext) => {
      const userText = text.trim();
      if (!userText || isStreaming) return;

      setError(null);
      const userMsgId = `user-${Date.now()}`;
      const assistantMsgId = `assistant-${Date.now()}`;

      const userMessage: ChatMessage = {
        id: userMsgId,
        role: "user",
        content: userText,
        createdAt: new Date().toISOString(),
      };

      const pendingAssistantMessage: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      // Prepare conversation history for backend (omit welcome message)
      const currentHistory = messages
        .filter((m) => m.id !== "welcome-msg")
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

      setMessages((prev) => [...prev, userMessage, pendingAssistantMessage]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            message: userText,
            pageContext,
            history: currentHistory,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.error || `Error ${res.status}: Failed to receive answer from Raahi.`
          );
        }

        if (!res.body) {
          throw new Error("No response body received from server.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulated = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;

            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") break;

            try {
              const parsed = JSON.parse(payload);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.token) {
                accumulated += parsed.token;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? { ...msg, content: accumulated }
                      : msg
                  )
                );
              }
            } catch (jsonErr: unknown) {
              if (jsonErr instanceof Error && !jsonErr.message.includes("JSON")) {
                throw jsonErr;
              }
            }
          }
        }

        // Final safety check: if response finished empty
        if (!accumulated.trim()) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    content:
                      "I'm sorry, I couldn't find relevant information in our documented trips for that question. Feel free to ask about our published trips, regions, or routes!",
                  }
                : msg
            )
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          // User aborted manually
          return;
        }
        console.error("Chat streaming error:", err);
        const errorMsg =
          err instanceof Error ? err.message : "Something went wrong while connecting to Raahi. Please try again.";
        setError(errorMsg);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId && !msg.content
              ? {
                  ...msg,
                  content:
                    "⚠️ I encountered an issue retrieving that information. Please try again in a moment.",
                }
              : msg
          )
        );
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [isStreaming, messages]
  );

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearChat,
    stopStreaming,
  };
}
