import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import '../global.css';

export default function RootLayout() {
  return <Tabs>
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
        // href: null, // Permet de cacher le menu admin
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="admin-panel-settings" size={size} color={color} />
        ),
      }}
    />
  </Tabs>;
}
