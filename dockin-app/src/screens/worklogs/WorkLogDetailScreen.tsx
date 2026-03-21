import React, { useCallback } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { LoadingState } from "@/src/components/common/LoadingState";
import { useAsyncData } from "@/src/hooks/useAsyncData";
import { workLogService } from "@/src/services/workLogService";
import { theme } from "@/src/theme/theme";
import { useAuthStore } from "@/src/store/authStore";
import type { RootStackParamList } from "@/src/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "WorkLogDetail">;

export function WorkLogDetailScreen({ navigation, route }: Props) {
  const role = useAuthStore((state) => state.role);
  const loadDetail = useCallback(() => workLogService.getWorkLogDetail(route.params.logId), [route.params.logId]);
  const { data, loading, error } = useAsyncData(loadDetail);

  const handleDelete = async () => {
    await workLogService.deleteWorkLog(route.params.logId);
    Alert.alert("삭제 완료", "작업일지가 삭제되었습니다.", [{ text: "확인", onPress: () => navigation.goBack() }]);
  };

  return (
    <Screen>
      {loading ? <LoadingState /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {data ? (
        <AppCard style={styles.card}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.meta}>{data.authorName ?? data.userId}</Text>
          <Text style={styles.meta}>{new Date(data.createdAt).toLocaleString()}</Text>
          <Text style={styles.body}>{data.logText}</Text>
          {data.audioFileUrl ? <Text style={styles.file}>첨부 음성: {data.audioFileUrl}</Text> : null}
          {data.imageUrl ? <Text style={styles.file}>첨부 이미지: {data.imageUrl}</Text> : null}
          {role === "ADMIN" ? (
            <View style={styles.buttons}>
              <AppButton label="수정" variant="secondary" onPress={() => navigation.navigate("WorkLogEditor", { mode: "edit", logId: data.logId })} />
              <AppButton label="삭제" variant="danger" onPress={handleDelete} />
            </View>
          ) : null}
        </AppCard>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 14 },
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  meta: { color: theme.colors.subText },
  body: { color: theme.colors.text, fontSize: 16, lineHeight: 26, marginTop: 8 },
  file: { color: theme.colors.primary, fontWeight: "600" },
  buttons: { gap: 12, marginTop: 12 },
  error: { color: theme.colors.danger },
});

