import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { EmptyState } from "@/src/components/common/EmptyState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { useAsyncData } from "@/src/hooks/useAsyncData";
import { translationService } from "@/src/services/translationService";
import { workLogService } from "@/src/services/workLogService";
import { theme } from "@/src/theme/theme";
import { createTraceId } from "@/src/utils/trace";
import type { RootStackParamList } from "@/src/navigation/types";
import type { LanguageCode } from "@/src/types";

type Props = NativeStackScreenProps<RootStackParamList, "WorkLogTranslation">;

export function WorkLogTranslationScreen({ route }: Props) {
  const loadLogs = useCallback(() => workLogService.getWorkLogs(), []);
  const { data, loading, error } = useAsyncData(loadLogs);
  const selected = useMemo(
    () => data?.find((item) => item.logId === route.params?.logId) ?? data?.[0],
    [data, route.params?.logId],
  );
  const [target, setTarget] = useState<LanguageCode>("ko");
  const [translated, setTranslated] = useState("");
  const [translating, setTranslating] = useState(false);

  const runTranslate = async () => {
    if (!selected) return;
    setTranslating(true);
    const result = await translationService.translateWorkLog(selected.logId, {
      source: "en",
      target,
      traceId: createTraceId("worklog-translate"),
    });
    setTranslated(result.translated);
    setTranslating(false);
  };

  return (
    <Screen>
      <Text style={styles.title}>작성된 작업일지 번역</Text>
      {loading ? <LoadingState /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!loading && !selected ? <EmptyState title="번역할 작업일지가 없습니다." /> : null}
      {selected ? (
        <>
          <AppCard>
            <Text style={styles.label}>작업일지 선택</Text>
            <Text style={styles.selected}>{selected.title}</Text>
            <Text style={styles.meta}>{new Date(selected.createdAt).toLocaleString()}</Text>
          </AppCard>
          <AppCard>
            <Text style={styles.label}>언어 변경</Text>
            <View style={styles.languageRow}>
              {(["ko", "en", "vi", "zh", "th"] as LanguageCode[]).map((lang) => (
                <AppButton
                  key={lang}
                  label={lang}
                  variant={target === lang ? "primary" : "secondary"}
                  onPress={() => setTarget(lang)}
                  style={styles.languageButton}
                />
              ))}
            </View>
            <Text style={styles.label}>원문</Text>
            <TextInput editable={false} multiline style={styles.readonly}>
              {selected.logText}
            </TextInput>
            <AppButton label="번역 실행" onPress={runTranslate} loading={translating} />
            <Text style={styles.label}>번역 결과</Text>
            <TextInput editable={false} multiline style={styles.readonly}>
              {translated || "번역 버튼을 눌러주세요."}
            </TextInput>
          </AppCard>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  error: { color: theme.colors.danger },
  label: { fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 8 },
  selected: { fontSize: 18, fontWeight: "700", color: theme.colors.text },
  meta: { color: theme.colors.subText, marginTop: 4 },
  languageRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  languageButton: { minHeight: 42, paddingHorizontal: 14 },
  readonly: {
    minHeight: 120,
    backgroundColor: "#F4F7FA",
    borderRadius: theme.radius.md,
    padding: 14,
    marginBottom: 16,
    color: theme.colors.text,
  },
});

