import { springApi } from "@/src/api/http";
import type { LoginRequest, LoginResponse, SignupRequest } from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const legacyPayload = {
      userId: payload.employeeNumber,
      password: payload.password,
    };

    const data = await requestFirstSuccess<any>(springApi, [
      { url: "/api/auth/login", method: "POST", data: payload },
      { url: "/member/login", method: "POST", data: legacyPayload },
    ]);

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user ?? {
        id: data.id ?? 0,
        employeeNumber: data.employeeNumber ?? legacyPayload.userId,
        name: data.name ?? "사용자",
        role: data.role === "USER" ? "WORKER" : data.role,
        department: data.department,
        workZone: data.workZone,
      },
    };
  },

  async signup(payload: SignupRequest) {
    const legacyPayload = {
      userId: payload.employeeNumber,
      username: payload.name,
      password: payload.password,
      role: payload.role === "WORKER" ? "USER" : payload.role,
    };

    await requestFirstSuccess(springApi, [
      { url: "/api/auth/signup", method: "POST", data: payload },
      { url: "/member/signup", method: "POST", data: legacyPayload },
    ]);
  },

  async logout() {
    await requestFirstSuccess(springApi, [
      { url: "/api/auth/logout", method: "POST" },
      { url: "/member/logout", method: "POST" },
    ]);
  },
};

