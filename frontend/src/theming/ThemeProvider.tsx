import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { themes, ThemeType } from "./themes";
import { PaperProvider } from "react-native-paper";

type ThemeContextType = {
  themeType: ThemeType; // Current theme as a string (e.g., 'light', 'dark')
  theme: (typeof themes)[ThemeType]; // Current theme object
  setTheme: (theme: ThemeType) => void; // Function to update the theme
  setPrimaryColor: (color: string) => void; // Function to update the primary color
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
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string | null>(
    null,
  );

  // Memoized theme to avoid unnecessary re-renders
  const currentTheme = useMemo(() => {
    const baseTheme = themes[themeType];
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: customPrimaryColor || baseTheme.colors.primary,
      },
    };
  }, [themeType, customPrimaryColor]);

  return (
    <ThemeContext.Provider
      value={{
        themeType,
        theme: currentTheme,
        setTheme: setThemeType,
        setPrimaryColor: setCustomPrimaryColor,
      }}
    >
      <PaperProvider theme={currentTheme}>{children}</PaperProvider>
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
