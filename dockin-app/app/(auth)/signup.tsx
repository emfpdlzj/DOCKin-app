// app/(auth)/signup.tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { theme } from "@/constants/theme";
import { useAuthStore } from "@/stores/auth.store";
import { DEFAULT_SIGNUP } from "@/constants/defaults";
import { ApiError } from "@/api/client";
import { ERROR_MESSAGE } from "@/api/dto/error";

export default function SignupScreen() {
    const signup = useAuthStore((s) => s.signup);

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            await signup({
                userId,
                name,
                password,
                language_code: DEFAULT_SIGNUP.language_code,
                tts_enabled: DEFAULT_SIGNUP.tts_enabled,
                shipYardArea: DEFAULT_SIGNUP.shipYardArea,
            });

            Alert.alert("회원가입 완료", "시작 화면으로 이동합니다.");
            router.replace("/(auth)");
        } catch (e) {
            Alert.alert("회원가입 실패", toUserMessage(e));
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={[theme.colors.bgTop, theme.colors.bgBottom]} style={styles.container}>
            <Pressable style={styles.langBtn} onPress={() => {}}>
                <MaterialIcons name="language" size={24} color={theme.colors.icon} />
            </Pressable>

            <View style={styles.header}>
                <Image
                    source={require("@/assets/title.svg")}
                    style={styles.logo}
                    contentFit="contain"
                />
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>회원가입</Text>
                <Text style={styles.desc}>필요한 정보만 간단히 입력하세요.</Text>

                <Text style={styles.label}>사원번호(아이디)</Text>
                <TextInput
                    value={userId}
                    onChangeText={setUserId}
                    placeholder="사원번호를 입력하세요"
                    style={styles.input}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>이름</Text>
                <TextInput value={name} onChangeText={setName} placeholder="이름을 입력하세요" style={styles.input} />

                <Text style={styles.label}>비밀번호</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="비밀번호를 입력하세요"
                    style={styles.input}
                    secureTextEntry
                />

                <Pressable onPress={onSubmit} disabled={loading} style={styles.primaryBtn}>
                    <Text style={styles.primaryText}>{loading ? "처리 중..." : "회원가입 완료"}</Text>
                </Pressable>

                <Text style={styles.bottomText}>
                    이미 계정이 있나요?{" "}
                    <Link href="/(auth)/login" style={styles.link}>
                        로그인
                    </Link>
                </Text>
            </View>
        </LinearGradient>
    );
}

function toUserMessage(e: unknown) {
    if (e instanceof ApiError) {
        if (e.code && ERROR_MESSAGE[e.code]) return ERROR_MESSAGE[e.code];
        return e.message;
    }
    return "알 수 없는 오류가 발생했습니다.";
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    langBtn: {
        position: "absolute",
        top: 54,
        right: 18,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    header: { alignItems: "center", paddingTop: 90, paddingBottom: 10 },
    logo: { width: 240, height: 120 },
    body: { paddingHorizontal: 24, paddingTop: 6 },
    title: { fontSize: 36, fontWeight: "900", color: theme.colors.text, marginBottom: 6 },
    desc: { color: theme.colors.subText, fontWeight: "700", marginBottom: 18 },

    label: { fontSize: 16, fontWeight: "800", color: theme.colors.text, marginTop: 14, marginBottom: 8 },
    input: {
        height: 56,
        borderRadius: theme.radius.input,
        backgroundColor: theme.colors.inputBg,
        paddingHorizontal: 16,
        fontSize: 16,
    },

    primaryBtn: {
        marginTop: 26,
        height: 60,
        borderRadius: 18,
        backgroundColor: theme.colors.orange,
        justifyContent: "center",
        alignItems: "center",
    },
    primaryText: { color: "#fff", fontSize: 20, fontWeight: "900" },

    bottomText: { textAlign: "center", marginTop: 18, color: theme.colors.subText, fontWeight: "700" },
    link: { color: theme.colors.orange, fontWeight: "900" },
});