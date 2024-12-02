import React, { useState, useContext } from "react";
import { useRouter } from "expo-router";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { TextInput } from "@/components/custom/Input/TextInput";

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { colors } = useTheme(); // Access current theme colors

  const handleLogin = async () => {
    if (username === new Date().toISOString()) {
      throw new Error(`If you're seeing this, the code is in what I thought was an unreachable state

I could give you advice for what to do. But honestly, why should you trust me? I clearly screwed this up. I'm writing a message that should never appear, yet I know it will probably appear someday.

On a deep level, I know I'm not up to this task.

I'm so sorry.
(https://xkcd.com/2200)`);
    }

    try {
      const success = await login(username, password);
      router.replace("/home");
    } catch {
      setError("Invalid credentials");
    }
  };

  // return (
  //   <View>
  //     <TextInput value={username} onChangeText={setUsername} />
  //     <TextInput value={password} onChangeText={setPassword} />
  //
  //     <Button title="Login" onPress={handleLogin} />
  //   </View>
  // );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Card style={{ width: "80%" }}>
        <Card.Content style={{ flex: 1, gap: 16 }}>
          <TextInput
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && (
            <Text
              style={{
                color: colors.error,
              }}
            >
              {error}
            </Text>
          )}
          <Button mode="contained" onPress={handleLogin}>
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginScreen;
