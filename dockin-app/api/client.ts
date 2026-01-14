// api/client.ts
import { Platform } from "react-native";
import type { ApiErrorResponse, CommonErrorCode } from "@/api/dto/error";

function getDefaultBaseUrl() {
    // 물리 디바이스/공유 개발환경이면 여기로 통일 (ex:http://192.168.0.12:8080)
    const env = process.env.EXPO_PUBLIC_API_BASE_URL;
    if (env && env.startsWith("http")) return env;

    // 에뮬레이터 기본값
    if (Platform.OS === "android") return "http://10.0.2.2:8081"; //OS에따라 분기
    return "http://localhost:8081";
}

const DEFAULT_BASE_URL = getDefaultBaseUrl();

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiError extends Error {
    status?: number;
    code?: CommonErrorCode;

    constructor(message: string, status?: number, code?: CommonErrorCode) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.code = code;
    }
}

function isApiErrorResponse(x: any): x is ApiErrorResponse {
    return (
        x &&
        typeof x === "object" &&
        typeof x.code === "string" &&
        typeof x.message === "string"
    );
}

export async function apiRequest<T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
    accessToken?: string | null,
    baseUrl: string = DEFAULT_BASE_URL
): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    const data = text ? safeJsonParse(text) : null;

    if (!res.ok) {
        if (isApiErrorResponse(data)) {
            throw new ApiError(data.message, res.status, data.code);
        }
        const fallbackMsg =
            (data && typeof data.message === "string" && data.message) ||
            `요청에 실패했습니다. (${res.status})`;
        throw new ApiError(fallbackMsg, res.status);
    }

    return data as T;
}

function safeJsonParse(text: string) {
    try {
        return JSON.parse(text);
    } catch {
        return { raw: text };
    }
}