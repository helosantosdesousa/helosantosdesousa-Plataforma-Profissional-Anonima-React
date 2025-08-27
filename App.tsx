import React from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import MatchmakingPage from "./pages/MatchmakingPage";
import ChatPage from "./pages/ChatPage";
import PerfilPage from "./pages/PerfilPage";

export type RootStackParamList = {
  LoginPage: undefined;
  FeedPage: { nome?: string };
  MatchmakingPage: { nomeUsuario: string };
  ChatPage: undefined;
  PerfilPage: { nome?: string; bio?: string; habilidades?: string[]; email?: string; empresa?: string };
};

const PALETTE = {
  primary: "#3B82F6",
  background: "#F8FAFF",
  textOnPrimary: "#FFFFFF",
};

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PALETTE.primary,
    background: PALETTE.background,
    card: PALETTE.primary,
    text: "#111827",
    border: "#E5E7EB",
    notification: "#60A5FA",
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PALETTE.primary}
        translucent={false}
      />
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{
            headerStyle: { backgroundColor: PALETTE.primary },
            headerTintColor: PALETTE.textOnPrimary,
            headerTitleStyle: { fontWeight: "700" },
            headerTitleAlign: "center",
            contentStyle: { backgroundColor: PALETTE.background },
            headerLargeTitle: Platform.OS === "ios",
          }}
        >
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="FeedPage" component={FeedPage} options={{ title: "Feed" }} />
          <Stack.Screen name="MatchmakingPage" component={MatchmakingPage} options={{ title: "Matchmaking" }} />
          <Stack.Screen name="ChatPage" component={ChatPage} options={{ title: "Chat" }} />
          <Stack.Screen name="PerfilPage" component={PerfilPage} options={{ title: "Perfil" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.background },
});
