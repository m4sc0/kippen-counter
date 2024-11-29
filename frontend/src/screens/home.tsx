import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { getBaseUrl, saveBaseUrl } from "@/src/services/constantsService";
import apiClient from "@/src/services/axiosService";
import { useTheme } from "../theming/ThemeProvider";

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [backendUrl, setBackendUrl] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const loadBackendUrl = async () => {
    const url = await getBaseUrl();
    setBackendUrl(url);
  };

  const updateBackendUrl = async (newUrl: string) => {
    await saveBaseUrl(newUrl);
    setBackendUrl(newUrl);
  };

  const testConn = async () => {
    try {
      const response = await apiClient.get<{ message: string }>(
        `${backendUrl}/api/protected/`,
      );
      setResponse(response.data.message);
    } catch (error) {
      setResponse("Failed to connect");
    }
  };

  // Load the backend URL on mount
  useEffect(() => {
    loadBackendUrl();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Current Backend URL:
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              marginBottom: 16,
              color: backendUrl ? colors.primary : colors.error,
            }}
          >
            {backendUrl || "Loading..."}
          </Text>
        </Card.Content>
      </Card>

      <TextInput
        mode="outlined"
        label="New Backend URL"
        placeholder="Enter new backend URL"
        value={input}
        onChangeText={setInput}
        style={{ marginBottom: 16 }}
      />

      <Button
        mode="contained"
        onPress={() => {
          updateBackendUrl(input);
          setInput("");
          setResponse(null);
        }}
        style={{ marginBottom: 16 }}
      >
        Update Backend URL
      </Button>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Test Response:
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: response ? colors.primary : colors.text,
            }}
          >
            {response || "No response"}
          </Text>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={testConn}>
        Test Connection
      </Button>
    </ScrollView>
  );
}
