import { create } from "zustand";
import { clearAuthSession, loadAuthSession, saveAuthSession } from "@/src/utils/storage";
import { authService } from "@/src/services/authService";
import type { LoginRequest, SignupRequest, UserRole } from "@/src/types";

type AuthStore = {
  hydrated: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string | null;
  employeeNumber: string | null;
  accessToken: string | null;
  hydrate: () => Promise<void>;
  login: (payload: LoginRequest) => Promise<UserRole>;
  signup: (payload: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  hydrated: false,
  isAuthenticated: false,
  role: null,
  userName: null,
  employeeNumber: null,
  accessToken: null,
  hydrate: async () => {
    const session = await loadAuthSession();
    if (session.tokens && session.user) {
      set({
        hydrated: true,
        isAuthenticated: true,
        role: session.user.role,
        userName: session.user.name,
        employeeNumber: session.user.employeeNumber,
        accessToken: session.tokens.accessToken,
      });
      return;
    }
    set({ hydrated: true });
  },
  login: async (payload) => {
    const result = await authService.login(payload);
    await saveAuthSession(
      { accessToken: result.accessToken, refreshToken: result.refreshToken },
      result.user,
    );
    set({
      isAuthenticated: true,
      role: result.user.role,
      userName: result.user.name,
      employeeNumber: result.user.employeeNumber,
      accessToken: result.accessToken,
    });
    return result.user.role;
  },
  signup: async (payload) => {
    await authService.signup(payload);
  },
  logout: async () => {
    try {
      await authService.logout();
    } finally {
      await clearAuthSession();
      set({
        isAuthenticated: false,
        role: null,
        userName: null,
        employeeNumber: null,
        accessToken: null,
      });
    }
  },
}));

