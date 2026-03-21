import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { translationService } from "@/src/services/translationService";
import { createTraceId } from "@/src/utils/trace";
import { validateSelectedFile } from "@/src/utils/security";
import { theme } from "@/src/theme/theme";
import type { LanguageCode } from "@/src/types";

export function LiveTranslationScreen() {
  const [source, setSource] = useState<LanguageCode>("vi");
  const [target, setTarget] = useState<LanguageCode>("ko");
  const [audioUri, setAudioUri] = useState<string | undefined>();
  const [sourceText, setSourceText] = useState("Đội trưởng, tôi có thể làm việc ở khu A-8 phía Dock được không?");
  const [translatedText, setTranslatedText] = useState("반장님, 도크쪽 A-8구역에서 작업하면 되나요?");
  const [loading, setLoading] = useState(false);
  const nextPair = useMemo<{ source: LanguageCode; target: LanguageCode }>(
    () => ({
      source: source === "vi" ? "ko" : "vi",
      target: target === "ko" ? "vi" : "ko",
    }),
    [source, target],
  );

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: ["audio/*"] });
    if (!result.canceled) {
      validateSelectedFile({
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
        size: result.assets[0].size,
        kind: "audio",
      });
      setAudioUri(result.assets[0].uri);
    }
  };

  const handleTranslate = async () => {
    if (!audioUri) return;
    setLoading(true);
    try {
      const result = await translationService.realtimeTranslate({
        audioUri,
        source,
        target,
        traceId: createTraceId("rt"),
      });
      setSourceText(result.originalText || sourceText);
      setTranslatedText(result.translatedText || translatedText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>실시간 번역</Text>
      <View style={styles.langRow}>
        <StatusBadge label={source} tone="orange" />
        <Text style={styles.arrow}>↔</Text>
        <StatusBadge label={target} tone="blue" />
      </View>
      <View style={styles.actions}>
        <AppButton label="원문 변경" variant="secondary" onPress={() => setSource(nextPair.source)} style={styles.actionButton} />
        <AppButton label="번역 변경" variant="secondary" onPress={() => setTarget(nextPair.target)} style={styles.actionButton} />
      </View>
      <AppCard>
        <Text style={styles.notice}>말하기 버튼을 길게 누른 뒤 업로드한 음성 파일을 번역합니다. 자동 언어 감지 연동 포인트는 `/api/ai/rt-translate`입니다.</Text>
      </AppCard>
      <AppCard>
        <Text style={styles.label}>내 언어</Text>
        <Text style={styles.message}>{sourceText}</Text>
      </AppCard>
      <AppCard style={styles.translateCard}>
        <Text style={styles.label}>번역</Text>
        <Text style={styles.message}>{translatedText}</Text>
      </AppCard>
      <View style={styles.actions}>
        <AppButton label={audioUri ? "음성 선택 완료" : "음성 선택"} variant="secondary" onPress={pickAudio} style={styles.actionButton} />
        <AppButton label="말하기" onPress={handleTranslate} loading={loading} style={styles.actionButton} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  langRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  arrow: { fontSize: 18, color: theme.colors.subText },
  notice: { color: theme.colors.subText, lineHeight: 24 },
  label: { color: theme.colors.subText, marginBottom: 10, fontWeight: "700" },
  message: { color: theme.colors.text, fontSize: 22, lineHeight: 30 },
  translateCard: { borderWidth: 1.5, borderColor: theme.colors.accent },
  actions: { flexDirection: "row", gap: 12 },
  actionButton: { flex: 1 },
});
