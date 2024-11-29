import { Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View, Button } from "@/components/Themed";
import Container from "@/components/custom/Layout/Container";
import useInternal from "@/hooks/useInternal";
import { useEffect, useState } from "react";

export default function SettingsScreen() {
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
    const theme = themeBtn;
    if (theme === "light") {
      // TODO: switch theme
      setThemeBtn("dark");
    } else if (theme === "dark") {
      // TODO: switch theme
      setThemeBtn("light");
    }
  };

  return (
    <View style={styles.container}>
      <Container>
        <Text style={styles.label}>Server URL</Text>
        <TextInput
          style={styles.input}
          value={backendUrlInput}
          onChangeText={setBackendUrlInput}
          placeholder="e.g. http://your-server.com"
          placeholderTextColor="#888"
        />
        <Button style={styles.button}>
          <Text style={styles.value}>Update Server URL</Text>
        </Button>
      </Container>

      <Container>
        <Text style={styles.label}>Change theme</Text>
        <Button style={[styles.button, styles.themeBtn]} onPress={changeTheme}>
          <Text style={[styles.value, styles.themeValue]}>
            {themeBtn === "dark" ? "Light" : "Dark"}
          </Text>
        </Button>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: "#121212",
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2c2c2c",
    backgroundColor: "#1e1e1e",
    color: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  value: {
    fontSize: 16,
    color: "#ffffff",
  },
  themeValue: {
    color: "#ffffff",
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#3a3a3a",
    justifyContent: "center",
    alignItems: "center",
  },
  themeBtn: {
    backgroundColor: "#007acc",
  },
});
