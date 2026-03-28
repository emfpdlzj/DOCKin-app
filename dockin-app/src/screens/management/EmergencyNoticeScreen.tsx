import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppInput } from "@/src/components/common/AppInput";
import { AppButton } from "@/src/components/common/AppButton";
import { noticeService } from "@/src/services/noticeService";
import { theme } from "@/src/theme/theme";
import { sanitizeTextInput } from "@/src/utils/security";
import { toErrorMessage } from "@/src/utils/error";

export function EmergencyNoticeScreen() {
  const [zoneName, setZoneName] = useState("제 8조선소");
  const [category, setCategory] = useState("현장 공지");
  const [title, setTitle] = useState("제 8조선소 현재 비상벨 점검 시간 안내");
  const [content, setContent] = useState("금일 오후 3:00 ~ 4:00 시간대에 제 8조선소 비상벨 점검이 있을 예정입니다.");
  const [translated, setTranslated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      await noticeService.sendNotice({
        zoneName: sanitizeTextInput(zoneName, 60),
        category: sanitizeTextInput(category, 40),
        title: sanitizeTextInput(title, 120),
        content: sanitizeTextInput(content, 2000),
        translated,
      });
    } catch (submitError) {
      setError(toErrorMessage(submitError, "긴급 공지를 발송하지 못했습니다."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen contentStyle={styles.screenContent}>
      <Text style={styles.title}>긴급사항</Text>
      <AppCard style={styles.card}>
        <Text style={styles.section}>공지발송</Text>
        <AppInput label="작업 구역" value={zoneName} onChangeText={setZoneName} />
        <AppInput label="공지분류" value={category} onChangeText={setCategory} />
        <AppInput label="제목" value={title} onChangeText={setTitle} />
        <AppInput label="본문" value={content} onChangeText={setContent} multiline numberOfLines={6} textAlignVertical="top" style={styles.textArea} />
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>공지 자동 번역</Text>
          <Switch
            value={translated}
            onValueChange={setTranslated}
            trackColor={{ false: "#D8E2F2", true: "#9AD5C8" }}
            thumbColor={translated ? "#0FA59E" : "#FFFFFF"}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton label="발송하기" onPress={submit} loading={loading} />
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingTop: 18, paddingBottom: 48 },
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text, marginBottom: 6 },
  card: { borderRadius: 30, gap: 6 },
  section: { fontSize: 30, fontWeight: "800", color: theme.colors.primary, marginBottom: 8 },
  textArea: { minHeight: 200, paddingTop: 20 },
  toggleRow: { marginTop: 8, marginBottom: 14 },
  toggleLabel: { color: theme.colors.text, fontWeight: "800", fontSize: 16, marginBottom: 4 },
  error: { color: theme.colors.danger, marginBottom: 12 },
});
