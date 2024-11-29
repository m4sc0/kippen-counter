import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useContext, useEffect, useState } from "react";
import { getBaseUrl, saveBaseUrl } from "@/src/services/constantsService";
import apiClient from "@/src/services/axiosService";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function TabOneScreen() {
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
      console.log(backendUrl);
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
    <View style={styles.container}>
      <Text style={styles.label}>Current Backend URL:</Text>
      <Text style={styles.value}>{backendUrl || "Loading..."}</Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Enter new backend URL"
        placeholderTextColor="#888"
      />
      <Button
        title="Update Backend URL"
        onPress={() => {
          updateBackendUrl(input);
          setInput("");
          setResponse(null);
        }}
      />
      <Text>Test Response: {response || "No response"}</Text>
      <Button title="Test Connection" onPress={testConn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, gap: 10 },
  label: { fontSize: 18, marginBottom: 8, fontWeight: "600" },
  value: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 16 },
});
