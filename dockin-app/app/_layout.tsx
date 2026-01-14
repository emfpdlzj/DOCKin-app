// app/_layout.tsx
import { useEffect } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useAuthStore } from "@/stores/auth.store";

export default function RootLayout() {
    const { hydrated, hydrate, isAuthed, role } = useAuthStore();

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    if (!hydrated) {
        // 필요하면 여기서 SplashScreen 연동 가능
        return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {!isAuthed ? (
                <Stack.Screen name="(auth)" />
            ) : role === "ADMIN" ? (
                <Stack.Screen name="(admin)" />
            ) : (
                <Stack.Screen name="(worker)" />
            )}
        </Stack>
    );
}