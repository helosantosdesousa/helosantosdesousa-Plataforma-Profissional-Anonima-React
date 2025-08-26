import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type BottomBarProps = {
  nomeUsuario: string;
  onReloadFeed?: () => void;
};

export default function BottomBar({ nomeUsuario, onReloadFeed }: BottomBarProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[styles.bottomButton, { backgroundColor: "blue" }]}
        onPress={onReloadFeed || (() => navigation.navigate("FeedPage", { nome: nomeUsuario }))}
      >
        <Text style={styles.bottomButtonText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bottomButton, { backgroundColor: "green" }]}
        onPress={() => navigation.navigate("MatchmakingPage", { nomeUsuario })}
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
        onPress={() => navigation.navigate("PerfilPage", { nome: nomeUsuario })}
      >
        <Text style={styles.bottomButtonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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