import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { PaperProvider } from "react-native-paper";
import {
  darkTheme,
  lightTheme,
  NavigationDarkTheme,
  NavigationLightTheme,
} from "../theme/theme";
import { AuthProvider } from "../context/AuthProvider";
import {
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let colorScheme = useColorScheme();
  colorScheme = "light"; // Force light theme by default for now
  // @ts-ignore
  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;
  const navigationTheme =
    // @ts-ignore
    colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme;
  const [loadedFont] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loadedFont) {
      SplashScreen.hideAsync();
    }
  }, [loadedFont]);

  if (!loadedFont) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider
          value={{ ...navigationTheme, fonts: DefaultTheme.fonts }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="(auth)/login" />
                <Stack.Screen name="(auth)/register" />
              </Stack>
              <StatusBar style="auto" />
            </View>
          </TouchableWithoutFeedback>
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
