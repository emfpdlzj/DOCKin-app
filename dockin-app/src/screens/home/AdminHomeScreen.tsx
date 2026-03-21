import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { theme } from "@/src/theme/theme";
import { useAuthStore } from "@/src/store/authStore";

export function AdminHomeScreen({ navigation }: BottomTabScreenProps<any>) {
  const userName = useAuthStore((state) => state.userName);

  const actions = [
    { label: "근태관리", icon: "clipboard-list-outline", route: "AttendanceManagement" },
    { label: "긴급사항", icon: "alert-circle-outline", route: "EmergencyNotice" },
    { label: "구역관리", icon: "map-marker-radius-outline" },
    { label: "일일점검", icon: "shield-check-outline" },
  ];

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.name}>관리자 {userName ?? "김철수"}</Text>
          <Text style={styles.subtitle}>현장 운영과 공지, 근태를 한 번에 관리합니다.</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.getParent()?.navigate("Settings")}>
          <MaterialIcons name="settings" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <AppCard>
        <Text style={styles.sectionTitle}>관리자 메뉴</Text>
        <View style={styles.grid}>
          {actions.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => item.route && navigation.getParent()?.navigate(item.route)}
              style={styles.menuCard}
            >
              <MaterialCommunityIcons name={item.icon as never} size={28} color={theme.colors.accent} />
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
        <Text style={styles.teamTitle}>A조 (3명)</Text>
        <Text style={styles.weatherMeta}>작업위치: 2도크 외판부 · 근무시간: 12:00~20:00</Text>
        <Text style={styles.weatherMeta}>상태: 정상 근무 중 · 이탈자 1명 / 보고 지연 2건</Text>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 30,
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
    width: "47%",
    backgroundColor: "#F3F5F9",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    gap: 8,
  },
  menuLabel: {
    fontWeight: "700",
    color: theme.colors.text,
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

