import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export default function FeedPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.appBarTitle}>Feed</Text>

      <View style={styles.contentContainer}>
        {/* Botões principais */}
        <View style={styles.topButtonRow}>
          <Button title="Notícias" onPress={() => {}} color="blue" />
          <Button title="Vagas" onPress={() => {}} color="blue" />
          <Button title="Eventos" onPress={() => {}} color="blue" />
        </View>

        <ScrollView contentContainerStyle={styles.feedContent}>
          <Text style={styles.feedTitle}>FEED</Text>
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: "green" }]}
            onPress={() => navigation.navigate("MatchmakingPage")}
          >
            <Text style={styles.buttonText}>Matchmaking</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "blue" }]}
          onPress={() => {}}
        >
          <Text style={styles.bottomButtonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "green" }]}
          onPress={() => navigation.navigate("MatchmakingPage")}
        >
          <Text style={styles.bottomButtonText}>Match</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "purple" }]}
          onPress={() => navigation.navigate("ChatPage")}
        >
          <Text style={styles.bottomButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "orange" }]}
          onPress={() => navigation.navigate("PerfilPage")}
        >
          <Text style={styles.bottomButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  appBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contentContainer: { flex: 1, padding: 16 },
  topButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  feedContent: { alignItems: "center", justifyContent: "center", flexGrow: 1 },
  feedTitle: { fontSize: 40, fontWeight: "bold", color: "blue", marginBottom: 20 },
  mainButton: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bottomButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
