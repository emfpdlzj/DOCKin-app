export function toErrorMessage(error: unknown, fallback = "요청 처리 중 오류가 발생했습니다.") {
  if (typeof error === "string") return error;
  if (error instanceof Error) {
    return error.message || fallback;
  }
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  return fallback;
}
