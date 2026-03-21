import React from "react";
import { StyleSheet, Text } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { theme } from "@/src/theme/theme";
import { useAuthStore } from "@/src/store/authStore";

export function SettingsScreen() {
  const userName = useAuthStore((state) => state.userName);
  const employeeNumber = useAuthStore((state) => state.employeeNumber);
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen>
      <Text style={styles.title}>설정</Text>
      <AppCard>
        <Text style={styles.name}>{userName ?? "김철수"}</Text>
        <Text style={styles.meta}>직급: {role === "ADMIN" ? "관리자" : "근로자"}</Text>
        <Text style={styles.meta}>사원번호: {employeeNumber ?? "-"}</Text>
      </AppCard>
      <AppCard>
        <Text style={styles.section}>계정 정보</Text>
        <Text style={styles.item}>사원번호(아이디)</Text>
        <Text style={styles.value}>{employeeNumber ?? "-"}</Text>
      </AppCard>
      <AppCard>
        <Text style={styles.section}>언어</Text>
        <Text style={styles.value}>한국어</Text>
      </AppCard>
      <AppButton label="로그아웃" variant="danger" onPress={logout} />
      <Text style={styles.version}>앱 버전 1.0.0</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  name: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  meta: { color: theme.colors.subText, marginTop: 6 },
  section: { fontSize: 22, fontWeight: "800", color: theme.colors.text, marginBottom: 14 },
  item: { fontSize: 16, color: theme.colors.text },
  value: { color: theme.colors.subText, marginTop: 6 },
  version: { textAlign: "center", color: theme.colors.subText, marginTop: 8 },
});
