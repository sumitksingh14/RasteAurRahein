export interface PageContext {
  route: string;
  entityType?: "trip" | "region" | "page";
  entitySlug?: string | null;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
  suggestedPrompts?: string[];
}

export interface ChatRequest {
  message: string;
  pageContext?: PageContext;
  history?: {
    role: "user" | "assistant";
    content: string;
  }[];
}

export interface KnowledgeChunk {
  id: string;
  sourceType: "trip" | "region" | "page";
  slug?: string;
  title: string;
  url: string;
  category?: string;
  content: string;
  metadata?: {
    budget?: number;
    days?: number;
    season?: string;
    region?: string;
    tags?: string[];
    [key: string]: unknown;
  };
}

export interface RetrievalResult {
  chunks: KnowledgeChunk[];
  prioritizedEntity?: KnowledgeChunk;
}
