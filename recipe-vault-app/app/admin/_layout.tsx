import { Stack } from "expo-router";
import "../../global.css";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Admin" }} />
            <Stack.Screen name="nested" options={{ title: "Nested" }} />
            <Stack.Screen name="also-nested" options={{ title: "Also nested"}} />
        </Stack>
    );
}