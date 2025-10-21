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
            <Text style={{ fontSize: 80, marginBottom: 20 }}>👤</Text>
            <Text style={styles.perfilNome}>{perfilAberto.nome}</Text>
            <Text style={styles.perfilSub}>🔓 Informações disponíveis para você</Text>

            <Text style={styles.perfilLabel}>Bio:</Text>
            <Text style={styles.perfilText}>{perfilAberto.bio}</Text>

            <Text style={styles.perfilLabel}>E-mail:</Text>
            <Text style={styles.perfilText}>{perfilAberto.email}</Text>

            <Text style={styles.perfilLabel}>Empresa/Universidade:</Text>
            <Text style={styles.perfilText}>{perfilAberto.empresa}</Text>

            <Text style={styles.perfilLabel}>Habilidades:</Text>
            {perfilAberto.habilidades.map((h, i) => (
              <Text key={i} style={styles.perfilText}>• {h}</Text>
            ))}

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
      <Text style={styles.title}>👥 Minhas Conexões</Text>

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
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 20, color: "#1E3A8A" },
  tabs: { flexDirection: "row", justifyContent: "center", marginBottom: 16 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabActive: { borderBottomColor: "#1E3A8A" },
  tabText: { fontSize: 16, fontWeight: "bold", color: "#555" },
  tabTextActive: { color: "#1E3A8A" },
  listContainer: { paddingVertical: 16, paddingHorizontal: 0 }, 

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    width: "96%",        
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", 
    elevation: 3,
  },
  cardFull: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    width: "98%",       
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    elevation: 3,
  },
  cardText: { fontSize: 17, color: "#111", textAlign: "center" },

  perfilContainer: {
    width: "100%",
    alignItems: "center",  
  },
  perfilNome: { fontSize: 24, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  perfilSub: { fontSize: 16, color: "#555", marginBottom: 10, textAlign: "center" },
  perfilLabel: { fontWeight: "bold", fontSize: 16, marginTop: 10, textAlign: "center" },
  perfilText: { fontSize: 16, color: "#111", marginBottom: 6, textAlign: "center" },

  voltarButton: { marginTop: 30, backgroundColor: "#1E3A8A", padding: 12, borderRadius: 8 },
  voltarText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});