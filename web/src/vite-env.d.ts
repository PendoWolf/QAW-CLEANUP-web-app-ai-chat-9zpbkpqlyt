/// <reference types="vite/client" />

// Pendo Agent Analytics (trackAgent), available when the Pendo agent is loaded on the page.
type PendoAgentEventType = "prompt" | "agent_response" | "user_reaction";

interface PendoAgentEventMetadata {
  agentId: string;
  conversationId: string;
  messageId: string;
  content: string;
  modelUsed?: string;
  suggestedPrompt?: boolean;
  toolsUsed?: string[];
  fileUploaded?: boolean;
}

interface Window {
  pendo?: {
    trackAgent?: (eventType: PendoAgentEventType, metadata: PendoAgentEventMetadata) => void;
  };
}
