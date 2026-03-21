import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { chatbotService } from "@/src/services/chatbotService";
import { createTraceId } from "@/src/utils/trace";
import { theme } from "@/src/theme/theme";

export function ChatbotScreen() {
  const [question, setQuestion] = useState("연차 규정 좀 검색해줘");
  const [answer, setAnswer] = useState("현장 최신 규정 반영하여 검색 중 입니다.");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    try {
      const result = await chatbotService.ask({
        traceId: createTraceId("chatbot"),
        messages: [{ role: "user", content: question }],
      });
      setAnswer(result.reply);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.logo}>토크인</Text>
      <AppCard>
        <Text style={styles.title}>DOCKin 작업도우미로 작업 중 궁금증을 빠르게 해결해보세요.</Text>
      </AppCard>
      <AppCard>
        <TextInput value={question} onChangeText={setQuestion} style={styles.input} placeholder="토크인에게 물어보세요!" />
        <AppButton label="질문 보내기" onPress={ask} loading={loading} />
      </AppCard>
      <AppCard>
        <Text style={styles.answer}>{answer}</Text>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: { fontSize: 34, fontWeight: "900", color: theme.colors.primary, textAlign: "center" },
  title: { fontSize: 20, fontWeight: "700", color: theme.colors.text, lineHeight: 30 },
  input: {
    minHeight: 54,
    borderRadius: theme.radius.pill,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  answer: { color: theme.colors.text, lineHeight: 24, fontSize: 16 },
});
