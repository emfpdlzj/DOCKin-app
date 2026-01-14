// stores/auth.store.ts
import { create } from "zustand";
import type { LoginRequestDto, MemberRequestDto } from "@/api/dto";
import { loginApi, logoutApi, signupApi } from "@/api/auth";
import { extractRoleFromToken } from "@/utils/jwt";
import { clearAuth, loadAuth, saveAuth } from "@/utils/secure";

type Role = "USER" | "ADMIN";

type AuthState = {
    hydrated: boolean;

    isAuthed: boolean;
    role: Role | null;
    accessToken: string | null;
    refreshToken: string | null;

    hydrate: () => Promise<void>;
    signup: (req: MemberRequestDto) => Promise<void>;
    login: (req: LoginRequestDto, keepLogin: boolean) => Promise<void>;
    logout: () => Promise<void>;
    clear: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    hydrated: false,

    isAuthed: false,
    role: null,
    accessToken: null,
    refreshToken: null,

    hydrate: async () => {
        const saved = await loadAuth();
        if (saved) {
            set({
                hydrated: true,
                isAuthed: true,
                role: saved.role,
                accessToken: saved.accessToken,
                refreshToken: saved.refreshToken,
            });
            return;
        }
        set({ hydrated: true });
    },

    signup: async (req) => {
        await signupApi(req);
    },

    login: async (req, keepLogin) => {
        const res = await loginApi(req);
        const role = extractRoleFromToken(res.accessToken);

        set({
            isAuthed: true,
            role,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
        });

        if (keepLogin) {
            await saveAuth({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                role,
            });
        } else {
            await clearAuth();
        }
    },

    logout: async () => {
        const { accessToken, refreshToken } = get();
        try {
            if (accessToken && refreshToken) {
                await logoutApi({ accessToken, refreshToken });
            }
        } finally {
            await clearAuth();
            set({
                isAuthed: false,
                role: null,
                accessToken: null,
                refreshToken: null,
            });
        }
    },

    clear: () =>
        set({
            hydrated: true,
            isAuthed: false,
            role: null,
            accessToken: null,
            refreshToken: null,
        }),
}));