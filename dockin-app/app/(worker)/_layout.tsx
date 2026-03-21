// app/(worker)/_layout.tsx
import { Stack } from "expo-router";

export default function WorkerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" />
        </Stack>
    );

}