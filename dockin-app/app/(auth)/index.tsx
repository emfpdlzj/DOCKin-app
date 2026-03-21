//(auth)/index.tsx
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import type { Href } from "expo-router";

const TitleLogo = require("../../assets/dkTitle.png"); // PNG는 require로 해야함

export default function StartScreen() {
    return (
        <LinearGradient colors={[theme.colors.bgTop, theme.colors.bgBottom]} style={styles.container}>
            <Pressable style={styles.langBtn} onPress={() => {}}>
                <MaterialIcons name="language" size={24} color={theme.colors.icon} />
            </Pressable>

            <View style={styles.center}>
                <View style={styles.logoWrap}>
                    <Image source={TitleLogo} style={styles.logo} resizeMode="contain" />
                </View>

                <Pressable style={styles.primaryBtn} onPress={() => router.push("/(auth)/login")}>
                    <Text style={styles.primaryText}>시작하기</Text>
                </Pressable>

                {/* 개발용 바로가기 버튼 2개 */}
                <View style={styles.devRow}>
                    <Pressable
                        style={[styles.devBtn, styles.devBtnOutline]}
                        onPress={() => router.replace("/(admin)/home")}
                    >
                        <Text style={[styles.devText, styles.devTextOutline]}>관리자 화면 보기</Text>
                    </Pressable>

                    <Pressable
                        style={styles.devBtn}
                        onPress={() => router.replace("/(worker)/home")}
                    >
                        <Text style={styles.devText}>근로자 화면 보기</Text>
                    </Pressable>
                </View>

                <Text style={styles.bottomText}>
                    도크인이 처음인가요??{" "}
                    <Link href="/(auth)/signup" style={styles.link}>
                        회원가입
                    </Link>
                </Text>
            </View>
        </LinearGradient>
    );
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
    },
    center: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
    logoWrap: { marginBottom: 48, alignItems: "center", justifyContent: "center" },
    logo: { width: 260, height: 180 },

    primaryBtn: {
        width: "88%",
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.orange,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },
    primaryText: { color: "#fff", fontSize: 22, fontWeight: "800" },

    // 개발용 버튼 스타일
    devRow: { width: "88%", marginTop: 12, gap: 10 },
    devBtn: {
        height: 52,
        borderRadius: 18,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
    },
    devText: { color: "#fff", fontSize: 16, fontWeight: "800" },
    devBtnOutline: { backgroundColor: "transparent", borderWidth: 2, borderColor: "#111" },
    devTextOutline: { color: "#111" },

    bottomText: { marginTop: 12, color: theme.colors.subText, fontWeight: "600" },
    link: { color: theme.colors.orange, fontWeight: "800" },
});