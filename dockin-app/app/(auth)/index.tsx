// app/(auth)/index.tsx
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

export default function StartScreen() {
    return (
        <LinearGradient
            colors={[theme.colors.bgTop, theme.colors.bgBottom]}
            style={styles.container}
        >
            <Pressable style={styles.langBtn} onPress={() => {}}>
                <MaterialIcons name="language" size={24} color={theme.colors.icon} />
            </Pressable>

            <View style={styles.center}>
                <Image
                    source={require("../../assets/title.svg")}
                    style={styles.logo}
                    contentFit="contain"
                />

                <Pressable style={styles.primaryBtn} onPress={() => router.push("/(auth)/login")}>
                    <Text style={styles.primaryText}>시작하기</Text>
                </Pressable>

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
    logo: { width: 260, height: 180, marginBottom: 48 },
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
    bottomText: { marginTop: 12, color: theme.colors.subText, fontWeight: "600" },
    link: { color: theme.colors.orange, fontWeight: "800" },
});