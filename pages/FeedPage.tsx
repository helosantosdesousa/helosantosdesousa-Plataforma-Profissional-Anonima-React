import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export default function FeedPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.appBarTitle}>Feed</Text>

      <View style={styles.contentContainer}>
        <View style={styles.buttonRow}>
          <Button title="Notícias" onPress={() => {}} color="blue" />
          <Button title="Vagas" onPress={() => {}} color="blue" />
          <Button title="Eventos" onPress={() => {}} color="blue" />
        </View>

        <ScrollView contentContainerStyle={styles.feedContent}>
          <Text style={styles.feedTitle}>FEED</Text>
          <Button
            title="Matchmaking"
            onPress={() => navigation.navigate("MatchmakingPage")}
            color="green"
          />
        </ScrollView>
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
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  feedContent: { alignItems: "center" },
  feedTitle: { fontSize: 40, fontWeight: "bold", color: "blue", marginBottom: 20 },
});
