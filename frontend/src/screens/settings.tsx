import React, { useState } from "react";
import { TextInput, Button, Card } from "react-native-paper";
import { ScrollView, View } from "react-native";
import useInternal from "@/src/hooks/useInternal";
import { useTheme } from "../theming/ThemeProvider";

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme(); // Access theme and setter
  const [backendUrl, setBackendUrl] = useInternal(
    "backendUrl",
    "http://localhost:8000",
  );
  const [backendUrlInput, setBackendUrlInput] = useState<string>(backendUrl);

  const updateBackend = () => {
    setBackendUrl(backendUrlInput);
  };

  const [themeBtn, setThemeBtn] = useState<string>("dark");

  const changeTheme = () => {
    const newTheme = themeBtn === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeBtn(newTheme);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Server URL Section */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Server URL"
            placeholder="e.g. http://your-server.com"
            value={backendUrlInput}
            onChangeText={setBackendUrlInput}
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={updateBackend}>
            Update Server URL
          </Button>
        </Card.Content>
      </Card>

      {/* Theme Switcher Section */}
      <Card>
        <Card.Content>
          <Button
            mode="contained"
            onPress={changeTheme}
            style={{
              backgroundColor: theme.colors.primary,
            }}
          >
            Switch to {themeBtn === "dark" ? "Light" : "Dark"} Theme
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
