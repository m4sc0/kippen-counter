import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import useInternal from "@/hooks/useInternal";
import { useState } from "react";

export default function TabOneScreen() {
  const [backendUrl, setBackendUrl] = useInternal(
    "backendUrl",
    "https://localhost:8000",
  );
  const [input, setInput] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Backend URL:</Text>
      <Text style={styles.value}>{backendUrl?.toString()}</Text>

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
          setBackendUrl(input);
          setInput("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent", // Handled by Themed View
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  input: {
    color: "#eee",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "transparent", // Handled by Themed View
  },
});
