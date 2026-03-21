export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  WorkLogDetail: { logId: number };
  WorkLogEditor: { mode: "create" | "edit"; logId?: number };
  WorkLogTranslation: { logId?: number };
  LiveTranslation: undefined;
  ChatRoom: { roomId: number; title: string };
  Settings: undefined;
  AttendanceManagement: undefined;
  EmergencyNotice: undefined;
  Chatbot: undefined;
};
