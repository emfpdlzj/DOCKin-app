// api/dto/safety.ts

export type SafetyCourseCreateRequest = {
  courseId: number; // int32
  title: string;
  description?: string;
  videoUrl: string;
  durationMinutes: number; // int32
};

export type SafetyCourseResponse = {
  courseId: number; // int32
  title: string;
  description?: string;
  videoUrl: string;
  durationMinutes: number; // int32
};