// api/dto/error.ts

export type CommonErrorCode =
  | "C001" | "C002" | "C003" | "C004"
  | "A001" | "A002" | "A003" | "A004"
  | "U001" | "U002" | "U003";

export type ApiErrorResponse = {
  code: CommonErrorCode;
  message: string;
  status?: number; // 백엔드가 같이 내려주면 사용
};

export const ERROR_MESSAGE: Record<CommonErrorCode, string> = {
  C001: "올바르지 않은 입력값입니다.",
  C002: "허용되지 않은 HTTP 메서드입니다.",
  C003: "서버 내부 오류가 발생했습니다.",
  C004: "입력값의 타입이 적절하지 않습니다.",
  A001: "로그인이 필요한 서비스입니다.",
  A002: "해당 리소스에 대한 접근 권한이 없습니다.",
  A003: "인증 토큰이 만료되었습니다.",
  A004: "잘못된 인증 토큰입니다.",
  U001: "존재하지 않는 사용자입니다.",
  U002: "이미 가입된 사원번호입니다.",
  U003: "사원번호 또는 비밀번호가 일치하지 않습니다.",
};