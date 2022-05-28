import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";

export type RootStackParamList = {
  Start: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen component={Home} name="Start" />
    </Stack.Navigator>
  );
}

export default RootStack;
