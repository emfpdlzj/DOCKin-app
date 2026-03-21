//(admin)/home.tsx
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/auth.store";

export default function AdminHome() {
    const name = useAuthStore((s) => s.name) ?? "관리자";

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "900" }}>관리자 홈(더미)</Text>
            <Text style={{ fontSize: 16 }}>안녕하세요, {name}</Text>

            <Pressable
                onPress={() => router.push("/(admin)/settings")}
                style={{ marginTop: 10, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, backgroundColor: "#111" }}
            >
                <Text style={{ color: "#fff", fontWeight: "800" }}>설정으로</Text>
            </Pressable>
        </View>
    );
}