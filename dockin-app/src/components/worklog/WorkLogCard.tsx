import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "@/src/components/common/AppCard";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { theme } from "@/src/theme/theme";
import type { WorkLog } from "@/src/types";

type Props = {
  item: WorkLog;
  onPress: () => void;
};

export function WorkLogCard({ item, onPress }: Props) {
  const tone =
    item.status === "APPROVED" ? "green" : item.status === "REJECTED" ? "red" : "orange";

  return (
    <Pressable onPress={onPress}>
      <AppCard style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.author}>{item.authorName ?? item.userId}</Text>
          <StatusBadge label={item.status ?? "DRAFT"} tone={tone} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.body}>
          {item.logText}
        </Text>
        {item.managerComment ? <Text style={styles.comment}>관리자 코멘트: {item.managerComment}</Text> : null}
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.colors.text,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.subText,
  },
  comment: {
    color: theme.colors.danger,
    fontWeight: "600",
  },
  date: {
    color: "#98A2B3",
    fontSize: 12,
  },
});

