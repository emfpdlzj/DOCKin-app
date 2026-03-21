import { springApi } from "@/src/api/http";
import type { AttendanceSummary, TodayAttendance } from "@/src/types";
import { requestFirstSuccess } from "./requestFallback";

export const attendanceService = {
  async getManagerSummary() {
    return requestFirstSuccess<AttendanceSummary>(springApi, [
      { url: "/api/attendance/summary", method: "GET" },
    ]);
  },

  async getTodayAttendance() {
    return requestFirstSuccess<TodayAttendance>(springApi, [
      { url: "/api/attendance/today", method: "GET" },
    ]);
  },

  async checkIn() {
    return requestFirstSuccess<TodayAttendance>(springApi, [
      { url: "/api/attendance/check-in", method: "POST" },
    ]);
  },

  async checkOut() {
    return requestFirstSuccess<TodayAttendance>(springApi, [
      { url: "/api/attendance/check-out", method: "POST" },
    ]);
  },
};

