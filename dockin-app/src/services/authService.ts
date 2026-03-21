import { springApi } from "@/src/api/http";
import type { LoginRequest, LoginResponse, SignupRequest } from "@/src/types";

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const swaggerPayload = {
      userId: payload.employeeNumber,
      password: payload.password,
    };

    const response = await springApi.request({
      url: "/member/login",
      method: "POST",
      data: swaggerPayload,
    });
    const data = response.data;

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user ?? {
        id: data.id ?? 0,
        employeeNumber: data.employeeNumber ?? swaggerPayload.userId,
        name: data.name ?? "사용자",
        role: data.role === "USER" ? "WORKER" : data.role,
        department: data.department,
        workZone: data.workZone,
      },
    };
  },

  async signup(payload: SignupRequest) {
    const swaggerPayload = {
      userId: payload.employeeNumber,
      name: payload.name,
      password: payload.password,
      role: payload.role === "WORKER" ? "USER" : payload.role,
      language_code: "ko",
      tts_enabled: true,
      shipYardArea: "제1조선소",
    };

    await springApi.request({
      url: "/member/signup",
      method: "POST",
      data: swaggerPayload,
    });
  },

  async logout(tokens: { accessToken: string; refreshToken?: string | null }) {
    await springApi.request({
      url: "/member/logout",
      method: "POST",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken ?? "",
      },
    });
  },
};
