"use client";

import { ChatPage } from "@/components/ChatPage";
import { ChatProvider } from "@/contexts/ChatContext";

export function ChatWithSuggestions() {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}
