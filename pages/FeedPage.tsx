import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import BottomBar from "../components/BottomBar";

type FeedPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "FeedPage">;
type FeedPageRouteProp = RouteProp<RootStackParamList, "FeedPage">;

type Props = { route: FeedPageRouteProp };

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Experiência com Flutter após 6 meses",
    content:
      "Relato completo de um desenvolvedor sobre os prós e contras do Flutter após meio ano de uso prático em diversos projetos, incluindo apps para Android e iOS, além de Flutter Web. Aprendizados, desafios e dicas importantes para quem está começando.",
    author: "Nexus_47",
  },
  {
    id: 2,
    title: "Como eu estudei para o Github Foundations",
    content:
      "Compartilho minha estratégia de estudos e recursos que usei para me preparar para o exame Github Foundations, incluindo cursos online, práticas de Git, e exemplos reais de uso em projetos colaborativos.",
    author: "EchoVoid",
  },
  {
    id: 3,
    title: "Dica para melhorar produtividade no VSCode",
    content:
      "Uma das dicas mais valiosas que encontrei foi usar extensões como o Live Share e o CodeSnap, além de atalhos personalizados para acelerar o desenvolvimento e depuração de código.",
    author: "PixelGhost",
  },
  {
    id: 4,
    title: "Debate: React vs Angular em 2025",
    content:
      "Análise profunda sobre as vantagens, desvantagens e tendências de uso das frameworks React e Angular em 2025, com opiniões de especialistas e dados recentes do mercado.",
    author: "Quantum_Zero",
  },
  {
    id: 5,
    title: "Problemas comuns em deploy de apps Flutter web",
    content:
      "Discussão sobre os principais desafios que os desenvolvedores enfrentam ao fazer deploy de apps Flutter na web, incluindo configuração de servidores, problemas de cache e performance.",
    author: "SilentRoot",
  },
  {
    id: 6,
    title: "Melhor linguagem para backend em 2025",
    content:
      "Comparativo das linguagens mais promissoras para desenvolvimento backend, incluindo Node.js, Go, Rust e Kotlin, com base em performance, comunidade e facilidade de aprendizado.",
    author: "ShadowLink",
  },
  {
    id: 7,
    title: "Indicação de livro: Clean Code",
    content:
      "Resenha do livro Clean Code, explicando por que é leitura essencial para todo desenvolvedor que quer escrever código limpo, legível e sustentável.",
    author: "CipherWave",
  },
  {
    id: 8,
    title: "Curso de segurança cibernética para devs",
    content:
      "Recomendações de cursos online para desenvolvedores que querem aprofundar seus conhecimentos em segurança cibernética, incluindo tópicos como criptografia, ataques comuns e melhores práticas.",
    author: "NebulaNet",
  },
  {
    id: 9,
    title: "Experiência com Docker em projetos pequenos",
    content:
      "Como usar Docker para facilitar o desenvolvimento e deployment de projetos pequenos, com exemplos práticos de configuração e dicas para evitar erros comuns.",
    author: "DeltaNode",
  },
  {
    id: 10,
    title: "Melhores sites para aprender programação grátis",
    content:
      "Lista atualizada dos melhores sites para aprender programação sem custo, incluindo plataformas com cursos, tutoriais e exercícios práticos para diferentes níveis.",
    author: "GhostRelay",
  },
];


export default function FeedPage({ route }: Props) {
  const navigation = useNavigation<FeedPageNavigationProp>();
  const nomeUsuario = route.params?.nome || "Usuário Exemplo";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.feedContent, { paddingBottom: 80 }]}>
        <TouchableOpacity
          style={styles.jobButton}
          onPress={() => navigation.navigate("JobPage")}
        >
          <Text style={styles.jobButtonText}>Vagas de Emprego</Text>
        </TouchableOpacity>

        {initialPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postAuthor}>Autor: {post.author}</Text>
          </View>
        ))}
      </ScrollView>

      <BottomBar
        nomeUsuario={nomeUsuario}
        onReloadFeed={() => navigation.replace("FeedPage", { nome: nomeUsuario })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  feedContent: { alignItems: "center", flexGrow: 1, padding: 16 },
  postCard: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6, color: "#333" },
  postContent: { fontSize: 16, marginBottom: 6, color: "#555" },
  postAuthor: { fontSize: 14, color: "#888", textAlign: "right" },
  jobButton: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginVertical: 12,
  },
  jobButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
