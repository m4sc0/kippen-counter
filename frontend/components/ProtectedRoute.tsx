import React, { ReactNode, useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import LoginScreen from "@/src/screens/login";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#FFF",
  },
});

export default ProtectedRoute;
