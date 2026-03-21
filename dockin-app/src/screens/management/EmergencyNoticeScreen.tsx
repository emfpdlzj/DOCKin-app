import React, { useState } from "react";
import { StyleSheet, Switch, Text } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppInput } from "@/src/components/common/AppInput";
import { AppButton } from "@/src/components/common/AppButton";
import { noticeService } from "@/src/services/noticeService";
import { theme } from "@/src/theme/theme";
import { sanitizeTextInput } from "@/src/utils/security";

export function EmergencyNoticeScreen() {
  const [zoneName, setZoneName] = useState("제 8조선소");
  const [category, setCategory] = useState("현장 공지");
  const [title, setTitle] = useState("제 8조선소 현재 비상벨 점검 시간 안내");
  const [content, setContent] = useState("금일 오후 3:00 ~ 4:00 시간대에 제 8조선소 비상벨 점검이 있을 예정입니다.");
  const [translated, setTranslated] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await noticeService.sendNotice({
        zoneName: sanitizeTextInput(zoneName, 60),
        category: sanitizeTextInput(category, 40),
        title: sanitizeTextInput(title, 120),
        content: sanitizeTextInput(content, 2000),
        translated,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>긴급사항</Text>
      <AppCard>
        <Text style={styles.section}>공지발송</Text>
        <AppInput label="작업 구역" value={zoneName} onChangeText={setZoneName} />
        <AppInput label="공지분류" value={category} onChangeText={setCategory} />
        <AppInput label="제목" value={title} onChangeText={setTitle} />
        <AppInput label="본문" value={content} onChangeText={setContent} multiline numberOfLines={6} textAlignVertical="top" style={styles.textArea} />
        <Text style={styles.toggleLabel}>공지 자동 번역</Text>
        <Switch value={translated} onValueChange={setTranslated} />
        <AppButton label="발송하기" onPress={submit} loading={loading} />
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "800", color: theme.colors.text },
  section: { fontSize: 24, fontWeight: "800", color: theme.colors.primary, marginBottom: 12 },
  textArea: { minHeight: 140, paddingTop: 16 },
  toggleLabel: { color: theme.colors.text, fontWeight: "700" },
});
