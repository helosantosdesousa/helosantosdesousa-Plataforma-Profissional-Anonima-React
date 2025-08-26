import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import MatchmakingPage from "./pages/MatchmakingPage";
import ChatPage from "./pages/ChatPage";
import PerfilPage from "./pages/PerfilPage";



export type RootStackParamList = {
  LoginPage: undefined;
  FeedPage: undefined;
  MatchmakingPage: undefined;
  ChatPage: undefined;
  PerfilPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="FeedPage" component={FeedPage} options={{ title: "Feed" }} />
        <Stack.Screen name="MatchmakingPage" component={MatchmakingPage} options={{ title: "Matchmaking" }} />
        <Stack.Screen name="ChatPage" component={ChatPage}/>
        <Stack.Screen name="PerfilPage" component={PerfilPage} options={{ title: "Perfil" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
