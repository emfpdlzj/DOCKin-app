import { springApi } from "@/src/api/http";
import type {
  SafetyEducation,
  SafetyInspectionGroup,
  SafetyInspectionSummary,
  SafetyWorkerProgress,
} from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const safetyService = {
  async getInspectionSummary(month: string) {
    return requestFirstSuccess<SafetyInspectionSummary>(springApi, [
      { url: "/api/safety/inspections/summary", method: "GET", params: { month } },
    ]);
  },

  async getWorkerProgress(month: string) {
    return requestFirstSuccess<SafetyWorkerProgress[] | { items: SafetyWorkerProgress[] }>(springApi, [
      { url: "/api/safety/inspections/workers", method: "GET", params: { month } },
    ]).then((data) => ("items" in data ? data.items : data));
  },

  async getEducationList() {
    return requestFirstSuccess<SafetyEducation[] | { items: SafetyEducation[] }>(springApi, [
      { url: "/api/safety/educations", method: "GET" },
    ]).then((data) => ("items" in data ? data.items : data));
  },

  async getDailyInspectionGroups() {
    return requestFirstSuccess<SafetyInspectionGroup[] | { items: SafetyInspectionGroup[] }>(springApi, [
      { url: "/api/safety/checklists/daily", method: "GET" },
    ]).then((data) => ("items" in data ? data.items : data));
  },
};

