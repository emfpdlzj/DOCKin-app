import { springApi } from "@/src/api/http";
import type {
  RealtimeTranslateResponse,
  WorkLogTranslateRequest,
  WorkLogTranslateResponse,
} from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const translationService = {
  async translateWorkLog(logId: number, payload: WorkLogTranslateRequest) {
    return requestFirstSuccess<WorkLogTranslateResponse>(springApi, [
      { url: `/api/ai/translate/${logId}`, method: "POST", data: payload },
    ]);
  },

  async translateText(payload: { source: string; target: string; text: string; traceId: string }) {
    return requestFirstSuccess<any>(springApi, [
      { url: "/api/ai/translate", method: "POST", data: payload },
    ]);
  },

  async realtimeTranslate(payload: {
    audioUri?: string;
    source: string;
    target: string;
    traceId: string;
  }): Promise<RealtimeTranslateResponse> {
    const form = new FormData();
    if (payload.audioUri) {
      const normalizedUri = payload.audioUri.toLowerCase();
      const isM4a = normalizedUri.endsWith(".m4a");
      const isMp3 = normalizedUri.endsWith(".mp3");
      const mimeType = isM4a ? "audio/m4a" : isMp3 ? "audio/mpeg" : "audio/wav";
      const fileName = isM4a ? "realtime.m4a" : isMp3 ? "realtime.mp3" : "realtime.wav";
      form.append("file", {
        uri: payload.audioUri,
        type: mimeType,
        name: fileName,
      } as never);
    }
    form.append("source", payload.source);
    form.append("target", payload.target);
    form.append("traceId", payload.traceId);

    const data = await requestFirstSuccess<any>(springApi, [
      {
        url: "/api/ai/rt-translate",
        method: "POST",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      },
    ]);

    return {
      originalText: data.originalText ?? data.sourceText ?? "",
      translatedText: data.translatedText ?? data.translated ?? "",
      detectedLanguage: data.detectedLanguage,
      traceId: data.traceId ?? payload.traceId,
    };
  },
};
