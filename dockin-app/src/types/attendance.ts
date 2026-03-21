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
  id?: number;
  userId?: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  totalWorkTime?: string;
  inLocation?: string;
  outLocation?: string;
  status?: string;
  leaveDays: number;
  absentDays: number;
  state: AttendanceState;
};
