import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { env } from "@/src/config/env";
import { getAccessToken } from "@/src/utils/storage";

export class ApiError extends Error {
  status?: number;
  code?: string;
  traceId?: string;

  constructor(message: string, status?: number, code?: string, traceId?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.traceId = traceId;
  }
}

async function withAuth(config: InternalAxiosRequestConfig) {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function toApiError(error: AxiosError<any>) {
  const payload = error.response?.data;
  const status = error.response?.status;
  const rawMessage = payload?.message ?? payload?.detail?.message ?? payload?.detail ?? error.message;
  const message =
    !status || status >= 500
      ? "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      : typeof rawMessage === "string" && rawMessage.trim()
        ? rawMessage
        : "요청 처리 중 오류가 발생했습니다.";

  return new ApiError(
    message,
    status,
    payload?.code,
    payload?.traceId ?? payload?.detail?.traceId,
  );
}

function createClient(baseURL: string) {
  const client = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  client.interceptors.request.use(withAuth);
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(toApiError(error)),
  );

  return client;
}

export const springApi = createClient(env.springBaseUrl);
