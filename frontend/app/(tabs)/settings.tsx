import React from "react";
import { ScrollView, Pressable } from "react-native";
import { Avatar, Card, Icon, List, Text } from "react-native-paper";
import ProtectedRoute from "@/components/ProtectedRoute";
import Container from "@/components/custom/Layout/Container";
import { useAuth } from "@/src/contexts/AuthContext";
import { useTheme } from "@/src/theming/ThemeProvider";
import { Link, useRouter } from "expo-router";

const settingsEntries = [
  {
    name: "appearance",
    title: "Appearance",
    icon: "palette",
    route: "modals/settings/appearance",
  },
  {
    name: "server",
    title: "Server Configuration",
    icon: "server",
    route: "modals/settings/server",
  },
  {
    name: "account",
    title: "Account",
    icon: "account-circle",
    route: "modals/settings/account",
  },
];

export default function SettingsScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Profile Section */}
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Container flex col style={{ alignItems: "center" }}>
              <Avatar.Image
                size={80}
                source={{
                  uri: user?.avatar || "https://via.placeholder.com/80",
                }}
              />
              <Text style={{ fontSize: 18, marginTop: 8 }}>
                {user?.username || "John Doe"}
              </Text>
              <Text style={{ fontSize: 14, color: theme.colors.dimmed }}>
                {user?.email || "johndoe@example.com"}
              </Text>
            </Container>
          </Card.Content>
        </Card>

        {/* Settings List */}
        <Card>
          <Card.Content style={{ flex: 1, gap: 8 }}>
            {settingsEntries.map((entry) => (
              <Pressable
                key={entry.name}
                onPress={() => router.push(entry.route)}
              >
                <List.Item
                  title={entry.title}
                  left={(props) => <List.Icon {...props} icon={entry.icon} />}
                />
              </Pressable>
            ))}
          </Card.Content>
        </Card>

        {/* Versioning */}
        <Container flex col style={{ alignItems: "center", marginTop: 16 }}>
          <Text style={{ fontSize: 14, color: theme.colors.dimmed }}>
            Version 1.0.0
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.dimmed }}>
            Made with <Icon source="heart" size={12} /> by{" "}
            <Link
              href="https://github.com/m4sc0"
              target="_blank"
              style={{ color: theme.colors.primary }}
            >
              Masco
            </Link>
          </Text>
        </Container>
      </ScrollView>
    </ProtectedRoute>
  );
}
