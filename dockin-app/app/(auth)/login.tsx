// app/(auth)/login.tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TitleLogo from "@/assets/dkTitle.png";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { useAuthStore } from "@/stores/auth.store";
import { ApiError } from "@/api/client";
import { ERROR_MESSAGE } from "@/api/dto/error";
import { router } from "expo-router";

export default function LoginScreen() {
    const login = useAuthStore((s) => s.login);

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);
    const [keepLogin, setKeepLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            await login({ userId, password }, keepLogin);
            const s = useAuthStore.getState();
            console.log("AFTER LOGIN:", { isAuthed: s.isAuthed, role: s.role, name: s.name });
            router.replace("/"); // 루트로 보내고, app/index.tsx가 role에 따라 분기
        } catch (e) {
            Alert.alert("로그인 실패", toUserMessage(e));
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
                <Image source={TitleLogo} style={{ width: 240, height: 120 }} resizeMode="contain" />
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>로그인</Text>

                <Text style={styles.label}>사원번호(아이디)</Text>
                <TextInput
                    value={userId}
                    onChangeText={setUserId}
                    placeholder="사원번호를 입력하세요"
                    style={styles.input}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>비밀번호</Text>
                <View style={styles.passwordWrap}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="비밀번호를 입력하세요"
                        style={[styles.input, styles.passwordInput]}
                        secureTextEntry={secure}
                    />
                    <Pressable style={styles.eyeBtn} onPress={() => setSecure((v) => !v)}>
                        <MaterialIcons name={secure ? "visibility-off" : "visibility"} size={22} color="#8a8a8a" />
                    </Pressable>
                </View>

                <Pressable style={styles.keepRow} onPress={() => setKeepLogin((v) => !v)}>
                    <View style={[styles.checkbox, keepLogin && styles.checkboxOn]} />
                    <Text style={styles.keepText}>로그인 유지하기</Text>
                </Pressable>

                <Pressable onPress={onSubmit} disabled={loading} style={styles.primaryBtn}>
                    <Text style={styles.primaryText}>{loading ? "로그인 중..." : "로그인"}</Text>
                </Pressable>

                <Text style={styles.helper}>비밀번호를 잊으셨나요?</Text>
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
    header: { alignItems: "center", paddingTop: 90, paddingBottom: 20 },
    logo: { width: 240, height: 120 },
    body: { paddingHorizontal: 24, paddingTop: 12 },
    title: { fontSize: 36, fontWeight: "900", color: theme.colors.text, marginBottom: 20 },
    label: { fontSize: 16, fontWeight: "800", color: theme.colors.text, marginTop: 14, marginBottom: 8 },
    input: {
        height: 56,
        borderRadius: theme.radius.input,
        backgroundColor: theme.colors.inputBg,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    passwordWrap: { position: "relative" },
    passwordInput: { paddingRight: 46 },
    eyeBtn: { position: "absolute", right: 14, top: 17, width: 28, height: 28, justifyContent: "center", alignItems: "center" },

    keepRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#bbb",
        marginRight: 10,
        backgroundColor: "#fff",
    },
    checkboxOn: { backgroundColor: theme.colors.orange, borderColor: theme.colors.orange },
    keepText: { fontSize: 14, color: theme.colors.text, fontWeight: "700" },

    primaryBtn: {
        marginTop: 22,
        height: 60,
        borderRadius: 18,
        backgroundColor: theme.colors.orange,
        justifyContent: "center",
        alignItems: "center",
    },
    primaryText: { color: "#fff", fontSize: 20, fontWeight: "900" },

    helper: { textAlign: "center", marginTop: 18, color: theme.colors.subText, fontWeight: "700" },
});