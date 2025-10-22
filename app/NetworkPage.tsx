import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

type Newsletter = { id: string; nome: string };
type Conexao = {
  id: string;
  nome: string;
  bio: string;
  email: string;
  empresa: string;
  habilidades: string[];
};

const newsletters: Newsletter[] = [
  { id: "1", nome: "Tech Daily" },
  { id: "2", nome: "Mindset & Sucesso" },
  { id: "3", nome: "Café com Código" },
];

const conexoesComuns: Conexao[] = [
  { id: "1", nome: "Maria Souza", bio: "Desenvolvedora front-end", email: "maria@email.com", empresa: "TechCorp", habilidades: ["React", "JavaScript"] },
  { id: "2", nome: "Pedro Lima", bio: "Analista de dados", email: "pedro@email.com", empresa: "Data Inc", habilidades: ["Python", "SQL"] },
  { id: "3", nome: "Ana Martins", bio: "Designer UX/UI", email: "ana@email.com", empresa: "DesignLab", habilidades: ["Figma", "Photoshop"] },
];

export default function ConexoesPage() {
  const [abaAtiva, setAbaAtiva] = useState<"newsletters" | "conexoes">("newsletters");
  const [perfilAberto, setPerfilAberto] = useState<Conexao | null>(null);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "Minha rede" });
  }, [navigation]);

  const renderNewsletters = () => (
    <FlatList
      data={newsletters}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardText}>🗞️ {item.nome}</Text>
        </View>
      )}
    />
  );

  const renderConexoes = () => {
    if (perfilAberto) {
      return (
        <ScrollView contentContainerStyle={[styles.listContainer, { paddingTop: 40 }]}>
          <View style={styles.perfilContainer}>
            <Text style={styles.avatar}>👤</Text>
            <Text style={styles.perfilNome}>{perfilAberto.nome}</Text>
            <Text style={styles.perfilSub}>{perfilAberto.empresa}</Text>

            <Text style={styles.perfilLabel}>Bio:</Text>
            <Text style={[styles.perfilText, { textAlign: "center" }]}>{perfilAberto.bio}</Text>

            <Text style={styles.perfilLabel}>E-mail:</Text>
            <Text style={[styles.perfilText, { textAlign: "center" }]}>{perfilAberto.email}</Text>

            <Text style={styles.perfilLabel}>Habilidades:</Text>
            <View style={styles.habilidadesContainer}>
              {perfilAberto.habilidades.map((h, i) => (
                <Text key={i} style={styles.habilidadeBadge}>{h}</Text>
              ))}
            </View>

            <Pressable onPress={() => setPerfilAberto(null)} style={styles.voltarButton}>
              <Text style={styles.voltarText}>Voltar</Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    }

    return (
      <FlatList
        data={conexoesComuns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable style={styles.cardFull} onPress={() => setPerfilAberto(item)}>
            <Text style={styles.cardText}>👥 {item.nome}</Text>
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Minha Rede</Text>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tabButton, abaAtiva === "newsletters" && styles.tabActive]}
          onPress={() => setAbaAtiva("newsletters")}
        >
          <Text style={[styles.tabText, abaAtiva === "newsletters" && styles.tabTextActive]}>Newsletters</Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, abaAtiva === "conexoes" && styles.tabActive]}
          onPress={() => setAbaAtiva("conexoes")}
        >
          <Text style={[styles.tabText, abaAtiva === "conexoes" && styles.tabTextActive]}>Em Comum</Text>
        </Pressable>
      </View>

      {abaAtiva === "newsletters" ? renderNewsletters() : renderConexoes()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 20, color: "#1E3A8A" },

  tabs: { flexDirection: "row", justifyContent: "center", marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  tabButton: { flex: 1, paddingVertical: 12 },
  tabActive: { borderBottomColor: "#1E3A8A", borderBottomWidth: 3 },
  tabText: { fontSize: 16, fontWeight: "500", color: "#888", textAlign: "center" },
  tabTextActive: { color: "#1E3A8A", fontWeight: "700" },

  listContainer: { paddingVertical: 16, paddingHorizontal: 16 },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardFull: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 16,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardText: { fontSize: 18, color: "#111", textAlign: "center" },

  perfilContainer: { width: "100%", alignItems: "center", paddingHorizontal: 16 },
  avatar: { fontSize: 90, marginBottom: 16 },
  perfilNome: { fontSize: 26, fontWeight: "bold", marginBottom: 4, textAlign: "center" },
  perfilSub: { fontSize: 18, color: "#555", marginBottom: 16, textAlign: "center" },
  perfilLabel: { fontWeight: "bold", fontSize: 16, marginTop: 12, textAlign: "center" },
  perfilText: { fontSize: 16, color: "#111", marginBottom: 6, textAlign: "center" },
  habilidadesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 8 },
  habilidadeBadge: { backgroundColor: "#D1E8FF", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, margin: 4, fontSize: 14, textAlign: "center" },

  voltarButton: { marginTop: 30, backgroundColor: "#1E3A8A", paddingVertical: 14, paddingHorizontal: 50, borderRadius: 12 },
  voltarText: { color: "#fff", fontWeight: "bold", fontSize: 16, textAlign: "center" },
});
