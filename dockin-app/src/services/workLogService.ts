import { springApi } from "@/src/api/http";
import type { PaginationParams, WorkLog, WorkLogPayload } from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const workLogService = {
  async getWorkLogs(params?: PaginationParams) {
    return requestFirstSuccess<WorkLog[] | { items: WorkLog[] }>(springApi, [
      { url: "/api/work-logs", method: "GET", params },
      { url: "/api/worklogs", method: "GET", params },
    ]).then((data) => ("items" in data ? data.items : data));
  },

  async getWorkLogDetail(logId: number) {
    return requestFirstSuccess<WorkLog>(springApi, [
      { url: `/api/work-logs/${logId}`, method: "GET" },
      { url: `/api/worklogs/${logId}`, method: "GET" },
    ]);
  },

  async createWorkLog(payload: WorkLogPayload) {
    return requestFirstSuccess<WorkLog>(springApi, [
      { url: "/api/work-logs", method: "POST", data: payload },
      { url: "/api/worklogs", method: "POST", data: payload },
    ]);
  },

  async updateWorkLog(logId: number, payload: WorkLogPayload) {
    return requestFirstSuccess<WorkLog>(springApi, [
      { url: `/api/work-logs/${logId}`, method: "PUT", data: payload },
      { url: `/api/worklogs/${logId}`, method: "PUT", data: payload },
    ]);
  },

  async deleteWorkLog(logId: number) {
    await requestFirstSuccess(springApi, [
      { url: `/api/work-logs/${logId}`, method: "DELETE" },
      { url: `/api/worklogs/${logId}`, method: "DELETE" },
    ]);
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
      "text",
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
      {
        url: "/api/worklogs/stt",
        method: "POST",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      },
    ]);
  },
};
