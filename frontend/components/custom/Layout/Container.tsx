import React, { FC } from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ContainerProps extends ViewProps {
  flex?: boolean;
  center?: boolean;
  row?: boolean;
  col?: boolean;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  style?: StyleProp<ViewStyle>;
}

const Container: FC<ContainerProps> = ({
  flex,
  center,
  row,
  col,
  justifyContent,
  alignItems,
  style,
  children,
  ...props
}) => {
  return (
    <View
      style={[
        flex && styles.flex,
        center && styles.center,
        row && styles.row,
        col && styles.col,
        justifyContent && { justifyContent },
        alignItems && { alignItems },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Container;
