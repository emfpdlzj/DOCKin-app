import { springApi } from "@/src/api/http";
import type { Notice } from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const noticeService = {
  async sendNotice(payload: {
    zoneName: string;
    category: string;
    title: string;
    content: string;
    translated: boolean;
  }) {
    return requestFirstSuccess<Notice>(springApi, [
      { url: "/api/notices/emergency", method: "POST", data: payload },
    ]);
  },
};
