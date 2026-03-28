import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TalkinBlueIcon from "../../../assets/chatbot/talkin_blue.svg";

type Props = {
  bottom?: number;
  right?: number;
  onPress?: () => void;
};

export function FloatingTalkinButton({ bottom = 106, right = 16, onPress }: Props) {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    let current: any = navigation;

    while (current) {
      const routeNames: string[] | undefined = current.getState?.()?.routeNames;

      if (routeNames?.includes("Chatbot")) {
        current.navigate("Chatbot");
        return;
      }

      if (routeNames?.includes("Chat")) {
        current.navigate("Chat", { screen: "Chatbot" });
        return;
      }

      current = current.getParent?.();
    }
  };

  return (
    <Pressable onPress={handlePress} style={[styles.wrap, { bottom, right }]}>
      <View style={styles.button}>
        <TalkinBlueIcon width={117} height={117} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    zIndex: 999,
  },
  button: {
    width: 117,
    height: 117,
    alignItems: "center",
    justifyContent: "center",
  },
});
