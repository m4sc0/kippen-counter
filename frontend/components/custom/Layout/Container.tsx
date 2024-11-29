import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 12,
    gap: 8,
    backgroundColor: "#222", // TODO: make dynamic
    borderRadius: 8,
  },
});

export default Container;
