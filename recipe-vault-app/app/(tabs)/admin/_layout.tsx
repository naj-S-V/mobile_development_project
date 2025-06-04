import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Admin",
                headerShown: false
            }} />
            <Stack.Screen name="nested" options={{ title: "Add user" }} />
            <Stack.Screen name="also-nested" options={{ title: "Delete user" }} />
        </Stack>
    );
}