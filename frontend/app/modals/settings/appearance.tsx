import React from "react";
import { ScrollView, Pressable, StyleSheet } from "react-native";
import { Text, Card, Avatar, RadioButton } from "react-native-paper";
import { useTheme } from "@/src/theming/ThemeProvider";
import { View } from "@/components/Themed";

// Define themes and accent colors
const accentColors = [
  { name: "Purple", color: "#6D67E4" },
  { name: "Red", color: "#F00" },
  { name: "Green", color: "#28A745" },
  { name: "Blue", color: "#007BFF" },
];

export default function AppearanceModal() {
  const { theme, setTheme, setPrimaryColor, themeType } = useTheme();

  const accentSize = 42;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Theme Selection */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Theme</Text>
          <RadioButton.Group
            onValueChange={(value) => setTheme(value)}
            value={themeType}
          >
            <Pressable style={styles.option} onPress={() => setTheme("light")}>
              <RadioButton value="light" />
              <Text style={styles.optionText}>Light Theme</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={() => setTheme("dark")}>
              <RadioButton value="dark" />
              <Text style={styles.optionText}>Dark Theme</Text>
            </Pressable>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      {/* Accent Color Selection */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Accent Color</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.colorContainer}
            showsHorizontalScrollIndicator={false}
          >
            {accentColors.map((color) => (
              <Pressable
                key={color.name}
                style={styles.colorOption}
                onPress={() => setPrimaryColor(color.color)}
              >
                <View
                  style={{
                    width: accentSize,
                    height: accentSize,
                    borderWidth: 4,
                    borderColor: theme.colors.outlineVariant,
                    backgroundColor: color.color,
                    borderRadius: 100,
                  }}
                />
                <Text
                  style={[styles.colorText, { color: theme.colors.dimmed }]}
                >
                  {color.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  colorOption: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  colorText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
});
