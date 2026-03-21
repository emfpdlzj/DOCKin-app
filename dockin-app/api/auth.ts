// // // api/auth.ts
// // import { apiRequest } from "@/api/client";
// // import type {
// //     LoginRequestDto,
// //     LoginResponseDto,
// //     LogOutRequestDto,
// //     MemberRequestDto,
// // } from "@/api/dto";
// //
// // export async function loginApi(body: LoginRequestDto) {
// //     return apiRequest<LoginResponseDto>("/member/login", "POST", body);
// // }
// //
// // export async function signupApi(body: MemberRequestDto) {
// //     // swagger 응답이 string
// //     return apiRequest<string>("/member/signup", "POST", body);
// // }
// //
// // export async function logoutApi(body: LogOutRequestDto) {
// //     // swagger 응답 body 없음
// //     return apiRequest<void>("/member/logout", "POST", body);
// // }
//
// // api/auth.ts
// import { apiRequest, ApiError } from "@/api/client";
// import type {
//     LoginRequestDto,
//     LoginResponseDto,
//     LogOutRequestDto,
//     MemberRequestDto,
//     MemberRole,
// } from "@/api/dto";
//
// const MOCK_AUTH = process.env.EXPO_PUBLIC_MOCK_AUTH === "true";
//
// // 목업 계정 2개: 관리자 1 / 근로자 1
// const MOCK_ACCOUNTS: Array<{
//     userId: string;
//     password: string;
//     name: string;
//     role: MemberRole;
//     accessToken: string;
//     refreshToken: string;
// }> = [
//     {
//         userId: "1111",
//         password: "1111",
//         name: "관리자",
//         role: "ADMIN",
//         accessToken: "mock-admin-access-token",
//         refreshToken: "mock-admin-refresh-token",
//     },
//     {
//         userId: "2222",
//         password: "2222",
//         name: "근로자",
//         role: "USER", // 현재 role enum이 USER/ADMIN만 있으니 근로자는 USER로 매핑
//         accessToken: "mock-worker-access-token",
//         refreshToken: "mock-worker-refresh-token",
//     },
// ];
//
// function mockLogin(body: LoginRequestDto): LoginResponseDto {
//     const found = MOCK_ACCOUNTS.find(
//         (u) => u.userId === body.userId && u.password === body.password
//     );
//
//     if (!found) {
//         // 화면에서 잡기 쉬운 형태로 에러 던지기
//         // (ApiError를 써도 되고 일반 Error 써도 됨)
//         throw new ApiError("아이디/비밀번호가 올바르지 않습니다. (MOCK)", 401, "AUTH_INVALID_CREDENTIALS" as any);
//     }
//
//     return {
//         accessToken: found.accessToken,
//         refreshToken: found.refreshToken,
//         name: found.name,
//         role: found.role,
//     };
// }
//
// export async function loginApi(body: LoginRequestDto) {
//     if (MOCK_AUTH) return mockLogin(body);
//     return apiRequest<LoginResponseDto>("/member/login", "POST", body);
// }
//
// export async function signupApi(body: MemberRequestDto) {
//     // swagger 응답이 string
//     if (MOCK_AUTH) {
//         // 목업 모드에서는 “가입 성공”처럼만 응답
//         return "OK";
//     }
//     return apiRequest<string>("/member/signup", "POST", body);
// }
//
// export async function logoutApi(body: LogOutRequestDto) {
//     // swagger 응답 body 없음
//     if (MOCK_AUTH) return;
//     return apiRequest<void>("/member/logout", "POST", body);
// }
