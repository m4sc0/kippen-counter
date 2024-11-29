import { darkTheme } from "./dark";
import { lightTheme } from "./light";
import { MD3DarkTheme } from "react-native-paper";

export type ThemeType = "light" | "dark";

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
