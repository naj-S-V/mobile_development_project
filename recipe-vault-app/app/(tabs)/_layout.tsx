import { useAuth } from "@/lib/auth"; // Assurez-vous que le chemin est correct
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function RootLayout() {
    const { user, logout } = useAuth();
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="all-recipe"
                options={{
                    headerShown: false,
                    title: "All Recipes",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="format-list-bulleted" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="admin"
                options={{
                    headerShown: false,
                    title: "Admin menu",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="admin-panel-settings" size={size} color={color} />
                    ),
                    href: user?.isAdmin ? "/admin" : null,
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: "Login",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="login" size={24} color="black" />
                    ),
                    href: user ? null : "/login",
                }}
            />
            <Tabs.Screen
                name="logout"
                options={{
                    title: "Logout",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="logout" size={24} color="black" />
                    ),
                    href: user ? "/logout" : null,
                }}
            />
        </Tabs>
    );
}
