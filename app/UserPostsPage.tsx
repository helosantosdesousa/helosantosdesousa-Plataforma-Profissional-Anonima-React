import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

const mockUserPosts: Post[] = [
  { id: 101, title: "Refatorando o Design de Apps Mobile", content: "Apliquei os princípios de clean design e acessibilidade para modernizar nossa interface, focando em contraste e tipografia.", author: "Usuário Exemplo" },
  { id: 102, title: "Dicas de Produtividade com TypeScript", content: "Como configurar seu ambiente para tipagem estrita e evitar bugs comuns no desenvolvimento React.", author: "Usuário Exemplo" },
  { id: 103, title: "Minha Jornada com Expo Router", content: "Um guia prático sobre como gerenciar rotas e estados complexos em projetos Expo, evitando o prop drilling.", author: "Usuário Exemplo" },
  { id: 104, title: "Revisão de Frameworks CSS em 2025", content: "Uma análise comparativa entre Tailwind, Bootstrap e Styled Components e qual escolher para o seu próximo projeto.", author: "Usuário Exemplo" },
];

export default function UserPostsPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nomeUsuario?: string }>();
  const navigation = useNavigation();

  const nomeUsuario = params.nomeUsuario || "Usuário Exemplo";

  useEffect(() => {
    navigation.setOptions({ title: `Posts de ${nomeUsuario}` });
  }, [navigation]);

  const openPost = (post: Post) => {
    const encodedPost = encodeURIComponent(JSON.stringify(post));
    router.push(`/PostPage?post=${encodedPost}` as any);
  };

  const renderPostCard = ({ item }: { item: Post }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.postCard}
      activeOpacity={0.8}
      onPress={() => openPost(item)}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text numberOfLines={3} style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postAuthor}>Postado por: Você</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockUserPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostCard}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
            <View style={styles.header}>
                <Text style={styles.headerText}>Meus Posts ({mockUserPosts.length})</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F3F7",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  postCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2081C4',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
    color: "#1F2937",
  },
  postContent: {
    fontSize: 15,
    marginBottom: 10,
    color: "#4B5563",
    lineHeight: 22,
  },
  postAuthor: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "right",
    fontWeight: '600',
  },
});
