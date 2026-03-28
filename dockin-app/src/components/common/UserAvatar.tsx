import React from "react";
import { Image, StyleSheet } from "react-native";

type Props = {
  size?: number;
  accent?: boolean;
};

export function UserAvatar({ size = 56 }: Props) {
  return (
    <Image
      source={require("../../../assets/profile.png")}
      resizeMode="contain"
      style={[styles.image, { width: size, height: size }]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 999,
  },
});
