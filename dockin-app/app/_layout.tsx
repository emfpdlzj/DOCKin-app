// app/_layout.tsx
import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { View } from "react-native";
import { useAuthStore } from "@/stores/auth.store";

export default function RootLayout() {
    const hydrated = useAuthStore((s) => s.hydrated);
    const hydrate = useAuthStore((s) => s.hydrate);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    if (!hydrated) {
        return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(admin)" />
            <Stack.Screen name="(worker)" />
        </Stack>
    );
}