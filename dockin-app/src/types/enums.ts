export enum UserRole {
  ADMIN = "ADMIN",
  WORKER = "WORKER",
}

export enum WorkStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum NotificationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ChecklistStatus {
  TODO = "TODO",
  DONE = "DONE",
  MISSED = "MISSED",
}

export enum AttendanceState {
  BEFORE_WORK = "BEFORE_WORK",
  WORKING = "WORKING",
  OFF_WORK = "OFF_WORK",
  LEAVE = "LEAVE",
}

export type LanguageCode = "ko" | "en" | "vi" | "zh" | "th";

