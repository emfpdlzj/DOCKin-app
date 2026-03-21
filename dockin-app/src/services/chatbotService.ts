import { springApi } from "@/src/api/http";
import type { ChatbotRequest, ChatbotResponse } from "@/src/types";

export const chatbotService = {
  async ask(payload: ChatbotRequest) {
    const { data } = await springApi.post<ChatbotResponse>("/api/ai/chatbot", payload);
    return data;
  },
};
