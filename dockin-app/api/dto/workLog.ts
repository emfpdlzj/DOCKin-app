// api/dto/workLog.ts

export type WorkLogsCreateRequestDto = {
  title: string;
  log_text: string;
  image_url?: string;
  equipmentId: number; // int64
};

export type WorkLogsUpdateRequestDto = {
  title: string;
  log_text: string;
  image_url?: string; // 변경 시에만 입력
  equipmentId?: number; // int64
};

export type Work_logsDto = {
  log_id: number; // int64
  user_id: string; // 사원번호
  equipment_id?: number; // int64
  title: string;
  log_text?: string;
  image_url?: string;
  created_at: string; // date-time
  updated_at?: string; // date-time
};