// api/dto/chat.ts

export type ChatRoomRequestDto = {
  room_name: string;
  is_group: boolean;
  participantIds: string[]; // 사원번호들
};

export type ChatRoomUpdateRequestDto = {
  room_name?: string;
  is_group?: boolean;
  addParticipantIds?: string[];
  removeParticipantIds?: string[];
};

export type ChatRoomResponseDto = {
  room_name: string;
  is_group: boolean;
  participantIds: string[];
  createdAt: string; // date-time
};

export type ChatMessageType = "TEXT" | "IMAGE" | "FILE";

export type ChatMessageRequestDto = {
  roomId: number; // int32 (주의: path roomId는 string으로 되어있었음)
  senderId: string;
  content?: string;
  messageType: ChatMessageType;
  fileUrl?: string; // FILE/IMAGE일 때 사용
};

export type ChatMessageResponseDto = {
  roomId: number; // int32
  senderId: string;
  messageId: string; // 전역번호
  content?: string;
  fileUrl?: string;
  messageType: ChatMessageType;
  sentAt: string; // date-time
};