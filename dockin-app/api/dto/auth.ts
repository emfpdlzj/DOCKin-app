// api/dto/auth.ts

export type MemberRole = "USER" | "ADMIN";

export type MemberRequestDto = {
  userId: string; // 사원번호
  name: string;
  password: string;
  role?: MemberRole; // enum, example: USER
  language_code: string; // example: ko
  tts_enabled: boolean; // example: true
  shipYardArea: string; // example: 제1조선소
};

export type LoginRequestDto = {
  userId: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
};

export type LogOutRequestDto = {
  accessToken: string;
  refreshToken: string;
};