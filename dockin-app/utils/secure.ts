// utils/secure.ts
import * as SecureStore from "expo-secure-store";

const KEY = "dockin_auth_v1";

export type PersistedAuth = {
    accessToken: string;
    refreshToken: string;
    role: "USER" | "ADMIN";
    name?: string; // ✅ 추가
};

export async function saveAuth(data: PersistedAuth) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(data));
}

export async function loadAuth(): Promise<PersistedAuth | null> {
    const raw = await SecureStore.getItemAsync(KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as PersistedAuth;
    } catch {
        return null;
    }
}

export async function clearAuth() {
    await SecureStore.deleteItemAsync(KEY);
}