import React, { ReactNode, useContext, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // Redirect to login if not authenticated
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Loading...</Text>
      </View>
    );
  }

  // If the user is not authenticated and we're redirecting, don't render anything
  if (!user) {
    return null;
  }

  // Render children if the user is authenticated
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
