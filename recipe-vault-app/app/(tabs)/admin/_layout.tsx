import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Admin",
                headerShown: false
            }} />
            <Stack.Screen name="add-user" options={{ title: "Add user" }} />
            <Stack.Screen name="remove-user" options={{ title: "Remove user" }} />
            <Stack.Screen name="update-user" options={{ title: "Update user" }} />
        </Stack>
    );
}