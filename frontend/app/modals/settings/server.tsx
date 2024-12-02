import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { getBaseUrl } from "@/src/services/constantsService";
import apiClient from "@/src/services/axiosService";

export default function ServerModal() {
  const [backendUrl, setBackendUrl] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  useEffect(() => {
    const loadBackendUrl = async () => {
      const url = await getBaseUrl();
      setBackendUrl(url);
    };
    loadBackendUrl();
  }, []);

  const checkServer = async () => {
    const response = await apiClient.get("/api/protected/");
    setServerResponse(
      response.status === 200
        ? "Connection successful and login valid"
        : response.status === 401
          ? "Connection successful but refresh failed"
          : "Unknown Error",
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text style={{ fontSize: 18 }}>Server URL</Text>
          <TextInput
            mode="outlined"
            label="Server URL"
            placeholder="e.g. http://your-server.com"
            value={backendUrl}
            onChangeText={setBackendUrl}
            style={{ marginTop: 8 }}
          />
          <Button onPress={checkServer} style={{ marginTop: 8 }}>
            Check Server Connection
          </Button>
          {serverResponse && (
            <Text style={{ marginTop: 8 }}>{serverResponse}</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
