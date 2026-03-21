import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { LoadingState } from "@/src/components/common/LoadingState";
import { useAsyncData } from "@/src/hooks/useAsyncData";
import { attendanceService } from "@/src/services/attendanceService";
import { theme } from "@/src/theme/theme";

export function AttendanceManagementScreen() {
  const loadSummary = useCallback(() => attendanceService.getManagerSummary(), []);
  const { data, loading, error } = useAsyncData(loadSummary);

  return (
    <Screen>
      <Text style={styles.title}>근태관리</Text>
      {loading ? <LoadingState /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {data ? (
        <>
          <View style={styles.grid}>
            <AppCard style={styles.tile}><Text style={styles.tileTitle}>출근</Text><Text style={styles.tileValue}>{data.checkInCount}명</Text></AppCard>
            <AppCard style={styles.tile}><Text style={styles.tileTitle}>퇴근</Text><Text style={styles.tileValue}>{data.checkOutCount}명</Text></AppCard>
            <AppCard style={styles.tile}><Text style={styles.tileTitle}>휴가</Text><Text style={styles.tileValue}>{data.leaveCount}명</Text></AppCard>
            <AppCard style={styles.tile}><Text style={styles.tileTitle}>병결</Text><Text style={styles.tileValue}>{data.absentCount}명</Text></AppCard>
          </View>
          <AppCard>
            <Text style={styles.zone}>{data.zoneName}</Text>
            <Text style={styles.shift}>현재 근무형태: {data.workShift}</Text>
          </AppCard>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  error: { color: theme.colors.danger },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  tile: { width: "47%", backgroundColor: "#72B4F5" },
  tileTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  tileValue: { color: "#FFFFFF", fontSize: 36, fontWeight: "900", marginTop: 18 },
  zone: { fontSize: 20, fontWeight: "800", color: theme.colors.text },
  shift: { color: theme.colors.subText, marginTop: 8 },
});

