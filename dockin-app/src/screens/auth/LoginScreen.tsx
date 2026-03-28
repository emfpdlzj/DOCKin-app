import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "@/src/components/common/Screen";
import { AppInput } from "@/src/components/common/AppInput";
import { AppButton } from "@/src/components/common/AppButton";
import { theme } from "@/src/theme/theme";
import { useAuthStore } from "@/src/store/authStore";
import { toErrorMessage } from "@/src/utils/error";
import { sanitizeTextInput } from "@/src/utils/security";
import type { AuthStackParamList } from "@/src/navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login({
        employeeNumber: sanitizeTextInput(employeeNumber, 40),
        password: sanitizeTextInput(password, 120),
      });
    } catch (error) {
      setError(toErrorMessage(error, "로그인에 실패했습니다."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen useGradient contentStyle={styles.content}>
      <Pressable style={styles.languageButton}>
        <MaterialCommunityIcons name="web" size={28} color={theme.colors.text} />
      </Pressable>
      <View style={styles.brandCopy}>
        <Text style={styles.subtitle}><Text style={styles.accent}>도크</Text>에서 안전하게, 도크인</Text>
        <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>로그인</Text>
        <AppInput label="사원번호(아이디)" value={employeeNumber} onChangeText={setEmployeeNumber} placeholder="사원번호를 입력하세요" autoCapitalize="none" autoCorrect={false} />
        <AppInput label="비밀번호" value={password} onChangeText={setPassword} placeholder="비밀번호를 입력하세요" secureTextEntry autoCapitalize="none" autoCorrect={false} textContentType="password" />
        <View style={styles.keepLogin}>
          <View style={styles.checkbox} />
          <Text style={styles.keepLoginText}>로그인 유지하기</Text>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton label="로그인" onPress={handleLogin} loading={loading} />
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    gap: 18,
    paddingTop: 32,
  },
  languageButton: {
    alignSelf: "flex-end",
  },
  brandCopy: {
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  accent: {
    color: theme.colors.accent,
  },
  logo: {
    width: 190,
    height: 76,
  },
  form: {
    gap: 18,
    marginTop: 42,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: theme.colors.text,
  },
  keepLogin: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#B9BDC5",
    backgroundColor: "#F5F5F5",
  },
  keepLoginText: {
    color: "#70757E",
    fontSize: 16,
  },
  error: {
    color: theme.colors.danger,
  },
  link: {
    textAlign: "center",
    color: "#757B84",
    fontWeight: "700",
    marginTop: 8,
  },
});
