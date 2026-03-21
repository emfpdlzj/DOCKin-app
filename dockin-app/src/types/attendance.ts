import type { AttendanceState } from "./enums";

export type AttendanceSummary = {
  zoneName: string;
  workShift: string;
  state: AttendanceState;
  checkInCount: number;
  checkOutCount: number;
  leaveCount: number;
  absentCount: number;
};

export type TodayAttendance = {
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  leaveDays: number;
  absentDays: number;
  state: AttendanceState;
};

