import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import BottomBar from "./components/BottomBar";

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

const initialPosts: Post[] = [
  { id: 1, title: "Experiência com Flutter após 6 meses", content: "Relato completo de um desenvolvedor sobre os prós e contras do Flutter após meio ano de uso prático em diversos projetos, incluindo apps para Android e iOS, além de Flutter Web. Aprendizados, desafios e dicas importantes para quem está começando.", author: "Nexus_47" },
  { id: 2, title: "Como eu estudei para o Github Foundations", content: "Compartilho minha estratégia de estudos e recursos que usei para me preparar para o exame Github Foundations, incluindo cursos online, práticas de Git, e exemplos reais de uso em projetos colaborativos.", author: "EchoVoid" },
  { id: 3, title: "Dica para melhorar produtividade no VSCode", content: "Uma das dicas mais valiosas que encontrei foi usar extensões como o Live Share e o CodeSnap, além de atalhos personalizados para acelerar o desenvolvimento e depuração de código.", author: "PixelGhost" },
  { id: 4, title: "Debate: React vs Angular em 2025", content: "Análise profunda sobre as vantagens, desvantagens e tendências de uso das frameworks React e Angular em 2025, com opiniões de especialistas e dados recentes do mercado.", author: "Quantum_Zero" },
  { id: 5, title: "Problemas comuns em deploy de apps Flutter web", content: "Discussão sobre os principais desafios que os desenvolvedores enfrentam ao fazer deploy de apps Flutter na web, incluindo configuração de servidores, problemas de cache e performance.", author: "SilentRoot" },
];

export default function FeedPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ novoPost?: string }>();

  const { usuarioSelecionado } = useUser();
  const nomeUsuario = usuarioSelecionado?.nome || "Usuário Exemplo";

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
  if (params.novoPost) {
    try {
      const newPost: Post = JSON.parse(decodeURIComponent(params.novoPost));
      
      setPosts(prevPosts => {
        // Verifica se o post já existe para evitar duplicatas em certas situações
        if (prevPosts.some(post => post.id === newPost.id)) {
            return prevPosts; 
        }
        return [newPost, ...prevPosts];
      });
      

    } catch (error) {
      console.error("Erro ao adicionar novo post:", error);
    }
  }
}, [params.novoPost]);

  useEffect(() => {
    navigation.setOptions({ title: "Feed" });
  }, [navigation]);

  const openPost = (post: Post) => {
    const encodedPost = encodeURIComponent(JSON.stringify(post));
    router.push(`/PostPage?post=${encodedPost}`);
  };

  const handleCreatePost = () => {
    router.push(`/CreatePostPage?nomeUsuario=${nomeUsuario}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.feedContent, { paddingBottom: 100 }]}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={[styles.topButton, styles.vagasButton]}
            onPress={() => router.push("/JobPage")}
            activeOpacity={0.8}
          >
            <Text style={styles.vagasText}>💼 Vagas de Emprego</Text>
          </TouchableOpacity>
        </View>

        {posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            activeOpacity={0.8}
            onPress={() => openPost(post)}
          >
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text numberOfLines={3} style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postAuthor}>Autor: {post.author}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreatePost}
        activeOpacity={0.9}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <BottomBar
        onReloadFeed={() => router.replace("/FeedPage")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F3F7"
  },
  feedContent: {
    alignItems: "center",
    flexGrow: 1,
    padding: 16
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10
  },
  topButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  vagasButton: {
    backgroundColor: "#2081C4"
  },
  vagasText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800"
  },
  postCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2081C4',
  },
  postTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8,
    color: "#1F2937"
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: "#4B5563",
    lineHeight: 22
  },
  postAuthor: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "right"
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 120,
    backgroundColor: '#FF5733',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  fabIcon: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 30,
    marginTop: -5
  }
});
