import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { shouldRetryWithFallback } from "@/src/utils/security";

export async function requestFirstSuccess<T>(
  client: AxiosInstance,
  configs: AxiosRequestConfig[],
) {
  let lastError: unknown;
  for (const config of configs) {
    try {
      const response = await client.request<T>(config);
      return response.data;
    } catch (error) {
      lastError = error;
      const status = (error as AxiosError | undefined)?.response?.status;
      if (!shouldRetryWithFallback(status)) {
        throw error;
      }
    }
  }
  throw lastError;
}
