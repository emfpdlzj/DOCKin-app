import type { ChecklistStatus, NotificationPriority } from "./enums";

export type ApiListResponse<T> = {
  items: T[];
  totalCount?: number;
};

export type PaginationParams = {
  page?: number;
  size?: number;
  keyword?: string;
};

export type ApiErrorPayload = {
  code?: string;
  message: string;
  traceId?: string;
};

export type ChecklistItem = {
  id: number;
  label: string;
  description?: string;
  status: ChecklistStatus;
};

export type Notice = {
  id: number;
  title: string;
  content: string;
  priority: NotificationPriority;
  translated: boolean;
  createdAt: string;
};

