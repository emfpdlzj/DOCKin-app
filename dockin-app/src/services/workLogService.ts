import { springApi } from "@/src/api/http";
import type { PaginationParams, WorkLog, WorkLogPayload } from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

function toWorkLog(dto: any): WorkLog {
  return {
    logId: dto.logId,
    userId: dto.userId,
    equipmentId: dto.equipmentId ?? 0,
    title: dto.title ?? "",
    logText: dto.logText ?? "",
    imageUrls: dto.imageUrls ?? [],
    imageUrl: dto.imageUrls?.[0],
    audioFileUrl: dto.audioFileUrl,
    createdAt: dto.createdAt ?? new Date().toISOString(),
    updatedAt: dto.updatedAt ?? dto.createdAt ?? new Date().toISOString(),
  };
}

function toPageableParams(params?: PaginationParams) {
  return {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    ...(params?.keyword ? { keyword: params.keyword } : {}),
  };
}

export const workLogService = {
  async getWorkLogs(params?: PaginationParams) {
    const response = await springApi.get("/api/work-logs", {
      params: toPageableParams(params),
    });
    return (response.data.content ?? []).map(toWorkLog);
  },

  async getWorkLogDetail(logId: number) {
    const response = await springApi.get("/api/work-logs", {
      params: { page: 0, size: 100 },
    });
    const found = (response.data.content ?? []).find((item: any) => item.logId === logId);
    if (!found) {
      throw new Error("존재하지 않는 작업일지입니다.");
    }
    return toWorkLog(found);
  },

  async createWorkLog(payload: WorkLogPayload) {
    const form = new FormData();
    form.append(
      "requestDto",
      JSON.stringify({
        title: payload.title,
        logText: payload.logText,
        imageUrls: payload.imageUrls ?? (payload.imageUrl ? [payload.imageUrl] : []),
        equipmentId: payload.equipmentId,
        audioFileUrl: payload.audioFileUrl ?? "",
      }),
    );
    const response = await springApi.post("/api/work-logs", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return toWorkLog(response.data);
  },

  async updateWorkLog(logId: number, payload: WorkLogPayload) {
    const form = new FormData();
    form.append(
      "requestDto",
      JSON.stringify({
        title: payload.title,
        logText: payload.logText,
        imageUrls: payload.imageUrls ?? (payload.imageUrl ? [payload.imageUrl] : []),
        equipmentId: payload.equipmentId,
        audioFileUrl: payload.audioFileUrl ?? "",
      }),
    );
    const response = await springApi.put(`/api/work-logs/${logId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return toWorkLog(response.data);
  },

  async deleteWorkLog(logId: number) {
    await springApi.delete(`/api/work-logs/${logId}`);
  },

  async createSttWorkLog(payload: {
    audioUri: string;
    title: string;
    logText: string;
    equipmentId: number;
    imageUrl?: string;
    audioFileUrl?: string;
  }) {
    const form = new FormData();
    form.append("file", {
      uri: payload.audioUri,
      type: "audio/wav",
      name: "worklog-audio.wav",
    } as never);
    form.append(
      "request",
      JSON.stringify({
        title: payload.title,
        logText: payload.logText,
        equipmentId: payload.equipmentId,
        imageUrl: payload.imageUrl ?? "",
        audioFileUrl: payload.audioFileUrl ?? "",
      }),
    );
    form.append("traceId", `stt-${Date.now()}`);

    return requestFirstSuccess<WorkLog>(springApi, [
      {
        url: "/api/work-logs/stt",
        method: "POST",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      },
    ]).then(toWorkLog);
  },
};
