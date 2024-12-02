import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { ThemeProvider, useTheme } from "@/src/theming/ThemeProvider";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)", // Ensure that tabs are the initial route.
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

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider initialTheme={colorScheme === "dark" ? "dark" : "light"}>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack>
          {/* Tabs */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Modals */}
          <Stack.Screen
            name="modals/settings/appearance"
            options={{
              title: "Appearance",
              presentation: "modal",
              headerStyle: {
                backgroundColor: theme.colors.background,
                borderBottomWidth: 0, // Remove border
              },
              headerTintColor: theme.colors.text,
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          />
          <Stack.Screen
            name="modals/settings/account"
            options={{
              title: "Account",
              presentation: "modal",
              headerStyle: {
                backgroundColor: theme.colors.background,
                borderBottomWidth: 0, // Remove border
              },
              headerTintColor: theme.colors.text,
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          />
          <Stack.Screen
            name="modals/settings/server"
            options={{
              title: "Server",
              presentation: "modal",
              headerStyle: {
                backgroundColor: theme.colors.background,
                borderBottomWidth: 0, // Remove border
              },
              headerTintColor: theme.colors.text,
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          />

          {/* Auth Screen */}
          <Stack.Screen
            name="login"
            options={{
              title: "Login",
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
