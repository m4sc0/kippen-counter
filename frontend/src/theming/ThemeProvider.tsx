import { createContext, ReactNode, useContext, useState } from "react";
import { themes, ThemeType } from "./themes";
import { PaperProvider } from "react-native-paper";

type ThemeContextType = {
  themeType: ThemeType; // Current theme as a string (e.g., 'light', 'dark')
  theme: (typeof themes)[ThemeType]; // Current theme object
  setTheme: (theme: ThemeType) => void; // Function to update the theme
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme: ThemeType;
  children: ReactNode;
}) => {
  const [themeType, setThemeType] = useState<ThemeType>(initialTheme);

  return (
    <ThemeContext.Provider
      value={{
        themeType,
        theme: themes[themeType], // Provide the full theme object
        setTheme: setThemeType,
      }}
    >
      <PaperProvider theme={themes[themeType]}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
