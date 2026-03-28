import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { theme } from "@/src/theme/theme";
import { useAuthStore } from "@/src/store/authStore";
import { UserAvatar } from "@/src/components/common/UserAvatar";

export function AdminHomeScreen({ navigation }: BottomTabScreenProps<any>) {
  const userName = useAuthStore((state) => state.userName);

  const actions = [
    { label: "근태관리", icon: "description", route: "AttendanceManagement" },
    { label: "긴급사항", icon: "error-outline", route: "EmergencyNotice" },
    { label: "구역관리", icon: "place" },
    { label: "일일점검", icon: "verified-user" },
    { label: "일정관리", icon: "event-note" },
    { label: "즐겨찾기", icon: "star-outline" },
    { label: "관심목록", icon: "favorite-border" },
    { label: "저장자료", icon: "bookmark-border" },
  ];

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View style={styles.nameRow}>
          <UserAvatar size={42} accent />
          <Text style={styles.name}>관리자 {userName ?? "김철수"}</Text>
        </View>
        <View style={styles.headerIcons}>
          <MaterialIcons name="search" size={24} color={theme.colors.text} />
          <MaterialIcons name="public" size={24} color={theme.colors.text} />
          <MaterialIcons name="mail-outline" size={24} color={theme.colors.text} />
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <MaterialIcons name="person-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <AppCard>
        <Text style={styles.sectionTitle}>관리자 메뉴</Text>
        <View style={styles.grid}>
          {actions.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => item.route && navigation.navigate(item.route)}
              style={styles.menuCard}
            >
              <View style={styles.menuIcon}>
                <MaterialIcons name={item.icon as any} size={30} color={item.label === "긴급사항" ? theme.colors.accent : "#54565C"} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>오늘의 날씨</Text>
        <Text style={styles.weatherTitle}>울산 미포조선</Text>
        <Text style={styles.weatherMeta}>강뢰 27°C · 습도 78% · 풍속 6m/s</Text>
        <Text style={styles.weatherNotice}>특이사항: A도크 외야 작업 구역은 배관 전기 공정 주의 필요</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>인원관리</Text>
        <View style={styles.memberRow}>
          <View style={styles.memberGrid}>
            {[0, 1, 2, 3].map((item) => (
              <View key={item} style={styles.memberBox}>
                <UserAvatar size={34} />
              </View>
            ))}
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.teamTitle}>A조 (3명)</Text>
            <Text style={styles.weatherMeta}>작업위치: 2도크 외판부</Text>
            <Text style={styles.weatherMeta}>근무시간: 12:00~20:00</Text>
            <Text style={styles.weatherMeta}>상태: 정상 근무 중</Text>
          </View>
        </View>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.subText,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  menuCard: {
    width: "22%",
    backgroundColor: "transparent",
    borderRadius: 18,
    paddingVertical: 8,
    alignItems: "center",
    gap: 8,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F1F3F8",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontWeight: "700",
    color: theme.colors.text,
  },
  memberRow: {
    flexDirection: "row",
    gap: 14,
  },
  memberGrid: {
    width: 120,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  memberBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F3F5FA",
    alignItems: "center",
    justifyContent: "center",
  },
  memberInfo: {
    flex: 1,
  },
  weatherTitle: {
    color: theme.colors.primary,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 8,
  },
  weatherMeta: {
    color: theme.colors.subText,
    lineHeight: 22,
  },
  weatherNotice: {
    color: theme.colors.text,
    lineHeight: 24,
    marginTop: 10,
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 8,
  },
});
