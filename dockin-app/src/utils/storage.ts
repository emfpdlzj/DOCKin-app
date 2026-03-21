import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthTokens, AuthUser } from "@/src/types";

const TOKEN_KEY = "dockin.auth.tokens";
const USER_KEY = "dockin.auth.user";

export async function saveAuthSession(tokens: AuthTokens, user: AuthUser) {
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function loadAuthSession() {
  const tokens = await AsyncStorage.getItem(TOKEN_KEY);
  const user = await AsyncStorage.getItem(USER_KEY);
  let parsedTokens: AuthTokens | null = null;
  let parsedUser: AuthUser | null = null;

  try {
    parsedTokens = tokens ? (JSON.parse(tokens) as AuthTokens) : null;
    parsedUser = user ? (JSON.parse(user) as AuthUser) : null;
  } catch {
    await clearAuthSession();
  }

  return {
    tokens: parsedTokens,
    user: parsedUser,
  };
}

export async function clearAuthSession() {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}

export async function getAccessToken() {
  const raw = await AsyncStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    return (JSON.parse(raw) as AuthTokens).accessToken;
  } catch {
    await clearAuthSession();
    return null;
  }
}
