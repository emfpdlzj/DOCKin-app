import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { EmptyState } from "@/src/components/common/EmptyState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { useAsyncData } from "@/src/hooks/useAsyncData";
import { chatService } from "@/src/services/chatService";
import { theme } from "@/src/theme/theme";

export function ChatRoomListScreen({ navigation }: any) {
  const loadRooms = useCallback(() => chatService.getRooms(), []);
  const { data, loading, error } = useAsyncData(loadRooms);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>채팅</Text>
        <Pressable onPress={() => navigation.getParent()?.navigate("Settings")}>
          <MaterialIcons name="person-outline" size={28} color={theme.colors.text} />
        </Pressable>
      </View>
      <AppCard style={styles.toolbar}>
        <Text style={styles.search}>채팅방 이름 검색</Text>
        <MaterialIcons name="add-circle-outline" size={32} color={theme.colors.primary} />
      </AppCard>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <LoadingState /> : null}
      {!loading && !data?.length ? <EmptyState title="채팅방이 없습니다." /> : null}
      {data?.map((room) => (
        <Pressable key={room.roomId} onPress={() => navigation.getParent()?.navigate("ChatRoom", { roomId: room.roomId, title: room.title })}>
          <AppCard style={styles.roomCard}>
            <View style={styles.roomHeader}>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <StatusBadge label={room.isOnline ? "접속중" : "오프라인"} tone={room.isOnline ? "green" : "gray"} />
            </View>
            <Text numberOfLines={1} style={styles.lastMessage}>{room.lastMessage}</Text>
          </AppCard>
        </Pressable>
      ))}
      <AppCard>
        <Pressable onPress={() => navigation.getParent()?.navigate("Chatbot")}>
          <Text style={styles.chatbot}>토크인 챗봇 열기</Text>
        </Pressable>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  toolbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  search: { color: theme.colors.primary, fontWeight: "700", fontSize: 18 },
  roomCard: { gap: 10 },
  roomHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  roomTitle: { fontSize: 20, fontWeight: "800", color: theme.colors.text },
  lastMessage: { color: theme.colors.subText, fontSize: 16 },
  chatbot: { fontSize: 18, fontWeight: "800", color: theme.colors.primary, textAlign: "center" },
  error: { color: theme.colors.danger },
});

