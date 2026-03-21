import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/auth.store";

export default function AdminSettings() {
    const logout = useAuthStore((s) => s.logout);

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 20, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "900" }}>관리자 설정(더미)</Text>

            <Pressable
                onPress={() => router.back()}
                style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: "#ddd", justifyContent: "center", alignItems: "center" }}
            >
                <Text style={{ fontSize: 16, fontWeight: "800" }}>뒤로</Text>
            </Pressable>

            <Pressable
                onPress={logout}
                style={{ height: 52, borderRadius: 14, backgroundColor: "#111", justifyContent: "center", alignItems: "center" }}
            >
                <Text style={{ fontSize: 16, fontWeight: "800", color: "#fff" }}>로그아웃</Text>
            </Pressable>
        </View>
    );
}