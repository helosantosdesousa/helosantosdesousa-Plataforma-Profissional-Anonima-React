import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MatchmakingPage from "./MatchmakingPage";

const Tab = createBottomTabNavigator();

function FeedMain({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Feed</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Notícias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Vagas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MatchmakingPage")}
        >
          <Text style={styles.buttonText}>Matchmaking</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedContent}>
        <Text style={styles.feedText}>conteúdo do Feed...</Text>
      </View>
    </ScrollView>
  );
}

export default function FeedPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="FeedMain" component={FeedMain} options={{ title: "Feed" }} />
      <Tab.Screen name="MatchmakingPage" component={MatchmakingPage} options={{ title: "Match" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  feedContent: {
    marginTop: 20,
    width: "100%",
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
  },
  feedText: {
    fontSize: 16,
    color: "#333",
  },
});
