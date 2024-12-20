/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  Pressable,
  StyleSheet,
} from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps & Pressable["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultView style={style} {...otherProps} />;
}

export function Button(props: ButtonProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const styles = StyleSheet.create({
    defaultPressable: {
      flex: 1,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: "#fff", // TODO: make dynamic
    },
  });

  return <Pressable style={[styles, style]} {...otherProps} />;
}
