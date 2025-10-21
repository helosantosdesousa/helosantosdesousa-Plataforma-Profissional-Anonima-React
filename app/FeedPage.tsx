import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import BottomBar from "./components/BottomBar";
import { useNavigation } from "expo-router";


export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

const initialPosts: Post[] = [ { id: 1, title: "Experiência com Flutter após 6 meses", content: "Relato completo de um desenvolvedor sobre os prós e contras do Flutter após meio ano de uso prático em diversos projetos, incluindo apps para Android e iOS, além de Flutter Web. Aprendizados, desafios e dicas importantes para quem está começando.", author: "Nexus_47" }, { id: 2, title: "Como eu estudei para o Github Foundations", content: "Compartilho minha estratégia de estudos e recursos que usei para me preparar para o exame Github Foundations, incluindo cursos online, práticas de Git, e exemplos reais de uso em projetos colaborativos.", author: "EchoVoid" }, { id: 3, title: "Dica para melhorar produtividade no VSCode", content: "Uma das dicas mais valiosas que encontrei foi usar extensões como o Live Share e o CodeSnap, além de atalhos personalizados para acelerar o desenvolvimento e depuração de código.", author: "PixelGhost" }, { id: 4, title: "Debate: React vs Angular em 2025", content: "Análise profunda sobre as vantagens, desvantagens e tendências de uso das frameworks React e Angular em 2025, com opiniões de especialistas e dados recentes do mercado.", author: "Quantum_Zero" }, { id: 5, title: "Problemas comuns em deploy de apps Flutter web", content: "Discussão sobre os principais desafios que os desenvolvedores enfrentam ao fazer deploy de apps Flutter na web, incluindo configuração de servidores, problemas de cache e performance.", author: "SilentRoot" }, { id: 6, title: "Melhor linguagem para backend em 2025", content: "Comparativo das linguagens mais promissoras para desenvolvimento backend, incluindo Node.js, Go, Rust e Kotlin, com base em performance, comunidade e facilidade de aprendizado.", author: "ShadowLink" }, { id: 7, title: "Indicação de livro: Clean Code", content: "Resenha do livro Clean Code, explicando por que é leitura essencial para todo desenvolvedor que quer escrever código limpo, legível e sustentável.", author: "CipherWave" }, { id: 8, title: "Curso de segurança cibernética para devs", content: "Recomendações de cursos online para desenvolvedores que querem aprofundar seus conhecimentos em segurança cibernética, incluindo tópicos como criptografia, ataques comuns e melhores práticas.", author: "NebulaNet" }, { id: 9, title: "Experiência com Docker em projetos pequenos", content: "Como usar Docker para facilitar o desenvolvimento e deployment de projetos pequenos, com exemplos práticos de configuração e dicas para evitar erros comuns.", author: "DeltaNode" }, { id: 10, title: "Melhores sites para aprender programação grátis", content: "Lista atualizada dos melhores sites para aprender programação sem custo, incluindo plataformas com cursos, tutoriais e exercícios práticos para diferentes níveis.", author: "GhostRelay" }, ];


export default function FeedPage() {
  const router = useRouter();
const params = useLocalSearchParams<{ nome?: string; novoPost?: string }>();
const nomeUsuario = params.nome || "Usuário Exemplo";


  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const navigation = useNavigation();
    
      useEffect(() => {
        navigation.setOptions({ title: "Feed" });
      }, [navigation]);
  

  useEffect(() => {
    if (params.novoPost) {
      const novoPost: Post = JSON.parse(params.novoPost as string);
      setPosts(prev => [novoPost, ...prev]);
    }
  }, [params.novoPost]);

  const openPost = (post: Post) => {
    const encodedPost = encodeURIComponent(JSON.stringify(post));
    router.push(`/PostPage?post=${encodedPost}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.feedContent, { paddingBottom: 80 }]}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.createPostButton}
           onPress={() => router.push(`/CreatePostPage?nomeUsuario=${nomeUsuario}`)}
          >
            <Text style={styles.buttonText}>Novo Post 📝</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.jobButton}
            onPress={() => router.push("/JobPage")}
          >
            <Text style={styles.buttonText}>Vagas 💼</Text>
          </TouchableOpacity>
        </View>

        {posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            onPress={() => openPost(post)}
          >
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text numberOfLines={3} style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postAuthor}>Autor: {post.author}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomBar
        nomeUsuario={nomeUsuario}
        onReloadFeed={() => router.replace(`/FeedPage?nome=${nomeUsuario}`)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  feedContent: { alignItems: "center", flexGrow: 1, padding: 16 },
  topButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 12 },
  createPostButton: { backgroundColor: "#2563EB", paddingVertical: 14, borderRadius: 12, width: "48%", alignItems: "center" },
  jobButton: { backgroundColor: "#10B981", paddingVertical: 14, borderRadius: 12, width: "48%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  postCard: { width: "100%", backgroundColor: "#f8fafc", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#e6eef9" },
  postTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: "#0f172a" },
  postContent: { fontSize: 15, marginBottom: 8, color: "#334155" },
  postAuthor: { fontSize: 13, color: "#64748b", textAlign: "right" },
});
