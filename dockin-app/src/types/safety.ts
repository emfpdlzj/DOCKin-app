import type { ChecklistItem } from "./common";

export type SafetyInspectionSummary = {
  totalWorkers: number;
  completedWorkers: number;
  incompleteWorkers: number;
  unsignedWorkers: number;
};

export type SafetyWorkerProgress = {
  workerId: number;
  workerName: string;
  teamName: string;
  completedCount: number;
  totalCount: number;
  completed: boolean;
};

export type SafetyEducation = {
  id: number;
  title: string;
  durationMinutes: number;
  deadline: string;
  progressRate: number;
  completed: boolean;
};

export type SafetyInspectionGroup = {
  id: number;
  title: string;
  completedCount: number;
  totalCount: number;
  items: ChecklistItem[];
};

