import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";

type Perfil = {
  nome: string;
  bio: string;
  habilidades: string[];
};

const perfis: Perfil[] = [
  { nome: "Alice", bio: "Desenvolvedora Frontend", habilidades: ["React", "TypeScript", "CSS"] },
  { nome: "Bob", bio: "Designer UX", habilidades: ["Figma", "Adobe XD"] },
  { nome: "Carol", bio: "Backend", habilidades: ["Node.js", "MongoDB"] },
];

export default function MatchmakingPage() {
  const [index, setIndex] = useState(0);

  const perfilAtual = perfis[index];

  const recusar = () => {
    if (index + 1 >= perfis.length) {
      Alert.alert("Fim dos perfis", "Você já visualizou todos os perfis.");
    } else {
      setIndex(index + 1);
    }
  };

  const aceitar = () => {
    if (index + 1 >= perfis.length) {
      Alert.alert("Fim dos perfis", "Você já visualizou todos os perfis.");
    } else {
      setIndex(index + 1);
    }
  };

  if (!perfilAtual) {
    return (
      <View style={styles.container}>
        <Text style={styles.fimText}>Você já viu todos os perfis.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nome}>{perfilAtual.nome}</Text>
        <Text style={styles.label}>Bio:</Text>
        <Text>{perfilAtual.bio}</Text>
        <Text style={styles.label}>Habilidades:</Text>
        <Text>{perfilAtual.habilidades.join(", ")}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={recusar}>
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]} onPress={aceitar}>
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
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
  fimText: { fontSize: 20, textAlign: "center" },
});
