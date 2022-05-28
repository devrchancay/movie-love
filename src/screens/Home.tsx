import { StatusBar } from "expo-status-bar";

import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "../components/Box";

import { RootStackParamList } from "../RootStack";
import SearchResult from "../components/SearchResult";

export type HomeScreenProps = StackScreenProps<RootStackParamList, "Start">;

function Home() {
  return (
    <Box variant="full" bg="background">
      <SafeAreaView>
        <StatusBar style="auto" />
        <SearchResult />
      </SafeAreaView>
    </Box>
  );
}

export default Home;
