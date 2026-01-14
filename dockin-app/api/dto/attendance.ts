// api/dto/attendance.ts

export type ClockInRequestDto = {
  inLocation: string; // example: 제1조선소
};

export type ClockOutRequestDto = {
  outLocation: string; // example: 제1조선소
};

// Swagger에서 totalWorkTime이 복잡한 Duration 객체로 잡혀있어서
// 일단 unknown으로 두고, 실제 응답 확인 후 좁히는 게 안전함.
export type AttendanceDto = {
  id?: number; // int64
  userId?: string; // example: 1001
  clockInTime?: string; // date-time
  clockOutTime?: string; // date-time
  totalWorkTime?: unknown;
  status?: string; // NORMAL, LATE, EARLY_LEAVE 등 (서버 enum 확인 필요)
  inLocation?: string;
  outLocation?: string;
};