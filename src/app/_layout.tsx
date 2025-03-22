import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotifierWrapper } from "react-native-notifier";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../context/AuthProvider";
import {
  darkTheme,
  fontsForNavigation,
  fontsForPaper,
  lightTheme,
  NavigationDarkTheme,
  NavigationLightTheme,
} from "../theme/theme";

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
    "Taviraj-Thin": require("@/assets/fonts/Taviraj-Thin.ttf"),
    "Taviraj-ThinItalic": require("@/assets/fonts/Taviraj-ThinItalic.ttf"),
    "Taviraj-ExtraLight": require("@/assets/fonts/Taviraj-ExtraLight.ttf"),
    "Taviraj-ExtraLightItalic": require("@/assets/fonts/Taviraj-ExtraLightItalic.ttf"),
    "Taviraj-Light": require("@/assets/fonts/Taviraj-Light.ttf"),
    "Taviraj-LightItalic": require("@/assets/fonts/Taviraj-LightItalic.ttf"),
    "Taviraj-Regular": require("@/assets/fonts/Taviraj-Regular.ttf"),
    "Taviraj-Italic": require("@/assets/fonts/Taviraj-Italic.ttf"),
    "Taviraj-Medium": require("@/assets/fonts/Taviraj-Medium.ttf"),
    "Taviraj-MediumItalic": require("@/assets/fonts/Taviraj-MediumItalic.ttf"),
    "Taviraj-SemiBold": require("@/assets/fonts/Taviraj-SemiBold.ttf"),
    "Taviraj-SemiBoldItalic": require("@/assets/fonts/Taviraj-SemiBoldItalic.ttf"),
    "Taviraj-Bold": require("@/assets/fonts/Taviraj-Bold.ttf"),
    "Taviraj-BoldItalic": require("@/assets/fonts/Taviraj-BoldItalic.ttf"),
    "Taviraj-ExtraBold": require("@/assets/fonts/Taviraj-ExtraBold.ttf"),
    "Taviraj-ExtraBoldItalic": require("@/assets/fonts/Taviraj-ExtraBoldItalic.ttf"),
    "Taviraj-Black": require("@/assets/fonts/Taviraj-Black.ttf"),
    "Taviraj-BlackItalic": require("@/assets/fonts/Taviraj-BlackItalic.ttf"),
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
      <PaperProvider // @ts-ignore
        theme={{ ...paperTheme, fonts: fontsForPaper }}
      >
        <ThemeProvider
          // @ts-ignore
          value={{ ...navigationTheme, fonts: fontsForNavigation }}
        >
          <GestureHandlerRootView>
            <NotifierWrapper>
              <TouchableWithoutFeedback
                onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
              >
                <View style={{ flex: 1 }}>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                    <Stack.Screen name="(auth)/login" />
                    <Stack.Screen name="(auth)/register" />
                  </Stack>
                  <StatusBar style="auto" />
                </View>
              </TouchableWithoutFeedback>
            </NotifierWrapper>
          </GestureHandlerRootView>
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
