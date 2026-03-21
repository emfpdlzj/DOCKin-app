import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "@/src/components/common/Screen";
import { AppButton } from "@/src/components/common/AppButton";
import { theme } from "@/src/theme/theme";
import type { AuthStackParamList } from "@/src/navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

export function OnboardingScreen({ navigation }: Props) {
  return (
    <Screen useGradient contentStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.subtitle}>
          <Text style={styles.accent}>도크</Text>에서 안전하게, 도크인
        </Text>
        <Image source={require("../../../assets/dkTitle.png")} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.footer}>
        <AppButton label="시작하기" onPress={() => navigation.navigate("Login")} style={styles.button} />
        <Text style={styles.caption}>도크인이 처음인가요?? 회원가입</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 80,
    paddingBottom: 80,
  },
  hero: {
    alignItems: "center",
    gap: 20,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.text,
  },
  accent: {
    color: theme.colors.accent,
  },
  logo: {
    width: 320,
    height: 140,
  },
  footer: {
    gap: 16,
    alignItems: "center",
  },
  button: {
    width: "88%",
  },
  caption: {
    color: theme.colors.subText,
  },
});

