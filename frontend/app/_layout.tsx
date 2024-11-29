import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { ThemeProvider } from "@/src/theming/ThemeProvider";
import { AuthProvider } from "@/src/contexts/AuthContext";

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)", // Ensure that reloading on `/modal` keeps a back button present.
};

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider initialTheme={colorScheme === "dark" ? "dark" : "light"}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
