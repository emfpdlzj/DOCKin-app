import type { UserRole } from "./enums";

export type LoginRequest = {
  employeeNumber: string;
  password: string;
};

export type SignupRequest = {
  employeeNumber: string;
  name: string;
  password: string;
  role: UserRole;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type AuthUser = {
  id: number;
  employeeNumber: string;
  name: string;
  role: UserRole;
  department?: string;
  workZone?: string;
};

export type LoginResponse = AuthTokens & {
  user: AuthUser;
};

