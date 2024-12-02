import React from "react";
import { ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useAuth } from "@/src/contexts/AuthContext";

export default function AccountModal() {
  const { logout } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Card.Content>
          <Text style={{ fontSize: 18 }}>Logout</Text>
          <Button onPress={logout} style={{ marginTop: 8 }}>
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
