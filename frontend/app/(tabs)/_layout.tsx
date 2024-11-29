import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useTheme } from "@/src/theming/ThemeProvider"; // Access theme
import ProtectedRoute from "@/components/ProtectedRoute";
import HomeScreen from "@/src/screens/home";
import ProfileScreen from "@/src/screens/profile";
import SettingsScreen from "@/src/screens/settings";

export default function TabLayout() {
  const { theme } = useTheme(); // Access the current theme
  const [index, setIndex] = useState(0);

  // Define routes for the bottom navigation
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: "home" },
    { key: "settings", title: "Settings", focusedIcon: "cog" },
  ]);

  // Map each route key to its component
  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    settings: SettingsScreen,
  });

  return (
    <ProtectedRoute>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{
          backgroundColor: theme.colors.background, // Themed background
        }}
        activeColor={theme.colors.primary} // Themed active tab color
        inactiveColor={theme.colors.text} // Themed inactive tab color
      />
    </ProtectedRoute>
  );
}
