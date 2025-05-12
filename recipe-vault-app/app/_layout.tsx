import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import '../global.css';

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen
      name="index"
      options={{
        title: "Search",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="search" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="second"
      options={{
        title: "All Recipes",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="format-list-bulleted" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="admin"
      options={{
        title: "Admin menu",
        // href: null, // Permet de cacher le menu admin
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="admin-panel-settings" size={size} color={color} />
        ),
      }}
    />
  </Tabs>;
}
