import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function TabTwoScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.paragraph}>This is the profile page</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
