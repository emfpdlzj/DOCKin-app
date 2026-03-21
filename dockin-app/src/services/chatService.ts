import { springApi } from "@/src/api/http";
import type { ChatMessage, ChatRoom, SendMessagePayload } from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const chatService = {
  async getRooms() {
    return requestFirstSuccess<ChatRoom[] | { items: ChatRoom[] }>(springApi, [
      { url: "/api/chat/rooms", method: "GET" },
      { url: "/api/chats/rooms", method: "GET" },
    ]).then((data) => ("items" in data ? data.items : data));
  },

  async getMessages(roomId: number) {
    return requestFirstSuccess<ChatMessage[] | { items: ChatMessage[] }>(springApi, [
      { url: `/api/chat/rooms/${roomId}/messages`, method: "GET" },
      { url: `/api/chats/${roomId}/messages`, method: "GET" },
    ]).then((data) => ("items" in data ? data.items : data));
  },

  async sendMessage(payload: SendMessagePayload) {
    return requestFirstSuccess<ChatMessage>(springApi, [
      { url: `/api/chat/rooms/${payload.roomId}/messages`, method: "POST", data: payload },
      { url: `/api/chats/${payload.roomId}/messages`, method: "POST", data: payload },
    ]);
  },
};

