// stores/auth.store.ts
import { create } from "zustand";
import type { LoginRequestDto, MemberRequestDto, MemberRole } from "@/api/dto";
import { loginApi, logoutApi, signupApi } from "@/api/auth";
import { clearAuth, loadAuth, saveAuth } from "@/utils/secure";

type Role = MemberRole;

type AuthState = {
    hydrated: boolean;

    isAuthed: boolean;
    role: Role | null;
    name: string | null;
    accessToken: string | null;
    refreshToken: string | null;

    hydrate: () => Promise<void>;
    signup: (req: MemberRequestDto) => Promise<void>;
    login: (req: LoginRequestDto, keepLogin: boolean) => Promise<Role>;
    logout: () => Promise<void>;
    clear: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    hydrated: false,

    isAuthed: false,
    role: null,
    name: null,
    accessToken: null,
    refreshToken: null,

    hydrate: async () => {
        const saved = await loadAuth();
        if (saved) {
            set({
                hydrated: true,
                isAuthed: true,
                role: saved.role,
                name: saved.name ?? null,
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
        const role = res.role;

        set({
            isAuthed: true,
            role,
            name: res.name ?? null,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
        });

        if (keepLogin) {
            await saveAuth({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                role,
                name: res.name, //  저장
            });
        } else {
            // await clearAuth();
        }

        return role; //  이거 반드시 필요
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
                name: null,
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
            name: null,
            accessToken: null,
            refreshToken: null,
        }),
}));