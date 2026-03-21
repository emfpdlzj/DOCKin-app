// app/index.tsx
import { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/auth.store";

export default function Index() {
    const hydrated = useAuthStore((s) => s.hydrated);
    const isAuthed = useAuthStore((s) => s.isAuthed);
    const role = useAuthStore((s) => s.role);

    useEffect(() => {
        if (!hydrated) return;

        if (!isAuthed) router.replace("/(auth)");
        else if (role === "ADMIN") router.replace("/(admin)/home");
        else router.replace("/(worker)/home");
    }, [hydrated, isAuthed, role]);

    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
}