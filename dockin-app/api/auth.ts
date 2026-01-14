// api/auth.ts
import { apiRequest } from "@/api/client";
import type {
    LoginRequestDto,
    LoginResponseDto,
    LogOutRequestDto,
    MemberRequestDto,
} from "@/api/dto";

export async function loginApi(body: LoginRequestDto) {
    return apiRequest<LoginResponseDto>("/member/login", "POST", body);
}

export async function signupApi(body: MemberRequestDto) {
    // swagger 응답이 string
    return apiRequest<string>("/member/signup", "POST", body);
}

export async function logoutApi(body: LogOutRequestDto) {
    // swagger 응답 body 없음
    return apiRequest<void>("/member/logout", "POST", body);
}
