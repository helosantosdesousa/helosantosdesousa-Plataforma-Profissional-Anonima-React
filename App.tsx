import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="FeedPage" component={FeedPage} options={{ title: "Feed" }} />
          <Stack.Screen name="MatchmakingPage" component={MatchmakingPage} options={{ title: "Matchmaking" }} />
          <Stack.Screen name="ChatPage" component={ChatPage} options={{ title: "Chat"}}/>
          <Stack.Screen name="PerfilPage" component={PerfilPage} options={{ title: "Perfil" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
