import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from "../context/UserContext"; 

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Stack />
      </UserProvider>
    </GestureHandlerRootView>
  );
}
