import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useTheme } from "@/src/theming/ThemeProvider";
import HomeScreen from "@/app/(tabs)/home";
import SettingsScreen from "@/app/(tabs)/settings";

export default function TabLayout() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  // Define tab routes
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: "home" },
    { key: "settings", title: "Settings", focusedIcon: "cog" },
  ]);

  // Map routes to components
  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: theme.colors.background,
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.text}
    />
  );
}
