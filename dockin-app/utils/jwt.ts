// utils/jwt.ts
import { decode as atob } from "base-64";

type JwtPayload = {
    role?: "USER" | "ADMIN";
    roles?: string[];
    [key: string]: unknown;
};

function base64UrlToUtf8(input: string): string {
    const pad = "=".repeat((4 - (input.length % 4)) % 4);
    const base64 = (input + pad).replace(/-/g, "+").replace(/_/g, "/");
    return atob(base64);
}

export function decodeJwtPayload(token: string): JwtPayload | null {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    try {
        const json = base64UrlToUtf8(parts[1]);
        return JSON.parse(json) as JwtPayload;
    } catch {
        return null;
    }
}

export function extractRoleFromToken(accessToken: string): "USER" | "ADMIN" {
    const payload = decodeJwtPayload(accessToken);

    if (payload?.role === "ADMIN" || payload?.role === "USER") return payload.role;

    if (Array.isArray(payload?.roles)) {
        if (payload.roles.includes("ADMIN")) return "ADMIN";
        if (payload.roles.includes("USER")) return "USER";
    }

    return "USER";
}