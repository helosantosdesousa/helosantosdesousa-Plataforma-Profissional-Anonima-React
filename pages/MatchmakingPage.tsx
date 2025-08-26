import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import BottomBar from "../components/BottomBar";

type MatchmakingPageRouteProp = RouteProp<RootStackParamList, "MatchmakingPage">;
type MatchmakingPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "MatchmakingPage">;

type Perfil = {
  nome: string;
  bio: string;
  habilidades: string[];
};

const perfis: Perfil[] = [
  { nome: "TechNomadX", bio: "Desenvolvedora Frontend", habilidades: ["React", "TypeScript", "CSS"] },
  { nome: "ShadowDesigner", bio: "Designer UX", habilidades: ["Figma", "Adobe XD"] },
  { nome: "LostAPI", bio: "Backend", habilidades: ["Node.js", "MongoDB"] },
];

export default function MatchmakingPage() {
  const route = useRoute<MatchmakingPageRouteProp>();
  const nomeUsuario = route.params?.nomeUsuario || "Usuário Exemplo";

  const [index, setIndex] = useState(0);

  const perfilAtual = perfis[index];

  const proximoPerfil = () => {
    if (index + 1 < perfis.length) {
      setIndex(index + 1);
    } else {
      setIndex(perfis.length);
    }
  };

  if (!perfilAtual) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.fimText}>🚀 Você já viu todos os perfis disponíveis no momento.</Text>
        </View>
        <BottomBar nomeUsuario={nomeUsuario} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.nome}>{perfilAtual.nome}</Text>
          <Text style={styles.label}>Bio:</Text>
          <Text>{perfilAtual.bio}</Text>
          <Text style={styles.label}>Habilidades:</Text>
          <Text>{perfilAtual.habilidades.join(", ")}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={proximoPerfil}>
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]} onPress={proximoPerfil}>
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomBar nomeUsuario={nomeUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    width: 360,
    padding: 24,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  nome: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  label: { fontWeight: "bold", marginTop: 8 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: 360 },
  button: { flex: 1, padding: 14, borderRadius: 8, alignItems: "center", marginHorizontal: 6 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  fimText: { fontSize: 20, textAlign: "center", color: "gray", fontWeight: "bold", marginTop: 20 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
