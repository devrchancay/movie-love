import "react-native-gesture-handler";

import React from "react";
import { ThemeProvider } from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import defaultTheme from "./src/theme";
import RootStack from "./src/RootStack";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts({
    Gilroy: require("./assets/fonts/Gilroy-Regular.ttf"),
    GilroyBold: require("./assets/fonts/Gilroy-Bold.ttf"),
    GilroyLight: require("./assets/fonts/Gilroy-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={defaultTheme}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <RootStack />
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
