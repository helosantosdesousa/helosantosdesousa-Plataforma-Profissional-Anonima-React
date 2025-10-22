 import React, { useState, useEffect } from "react";

import {

  View,

  Text,

  StyleSheet,

  ScrollView,

  TouchableOpacity,

  Animated,

  Pressable,

} from "react-native";

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



const initialPosts: Post[] = [

  { id: 1, title: "Experiência com Flutter após 6 meses", content: "Relato completo de um desenvolvedor sobre os prós e contras do Flutter após meio ano de uso prático em diversos projetos, incluindo apps para Android e iOS, além de Flutter Web. Aprendizados, desafios e dicas importantes para quem está começando.", author: "Nexus_47" },

  { id: 2, title: "Como eu estudei para o Github Foundations", content: "Compartilho minha estratégia de estudos e recursos que usei para me preparar para o exame Github Foundations, incluindo cursos online, práticas de Git, e exemplos reais de uso em projetos colaborativos.", author: "EchoVoid" },

  { id: 3, title: "Dica para melhorar produtividade no VSCode", content: "Uma das dicas mais valiosas que encontrei foi usar extensões como o Live Share e o CodeSnap, além de atalhos personalizados para acelerar o desenvolvimento e depuração de código.", author: "PixelGhost" },

  { id: 4, title: "Debate: React vs Angular em 2025", content: "Análise profunda sobre as vantagens, desvantagens e tendências de uso das frameworks React e Angular em 2025, com opiniões de especialistas e dados recentes do mercado.", author: "Quantum_Zero" },

  { id: 5, title: "Problemas comuns em deploy de apps Flutter web", content: "Discussão sobre os principais desafios que os desenvolvedores enfrentam ao fazer deploy de apps Flutter na web, incluindo configuração de servidores, problemas de cache e performance.", author: "SilentRoot" },

];



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

      <ScrollView contentContainerStyle={[styles.feedContent, { paddingBottom: 100 }]}>

        <View style={styles.topButtons}>

  <TouchableOpacity

    style={[styles.topButton, styles.vagasButton]}

    onPress={() => router.push("/JobPage")}

    activeOpacity={0.8}

  >

    <Text style={styles.vagasText}>💼 Vagas</Text>

  </TouchableOpacity>



  <TouchableOpacity

    style={[styles.topButton, styles.novoPostButton]}

    onPress={() => router.push(`/CreatePostPage?nomeUsuario=${nomeUsuario}`)}

    activeOpacity={0.8}

  >

    <Text style={styles.novoPostText}>📝 Novo Post</Text>

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



      <BottomBar

        nomeUsuario={nomeUsuario}

        onReloadFeed={() => router.replace(`/FeedPage?nome=${nomeUsuario}`)}

      />

    </SafeAreaView>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#F8FAFF"

  },

  feedContent: {

    alignItems: "center",

    flexGrow: 1,

    padding: 16

  },

  topButtons: {

    flexDirection: "row",

    justifyContent: "space-between",

    width: "100%",

    marginBottom: 16

  },

  topButton: {

    flex: 1,

    paddingVertical: 14,

    borderRadius: 20,

    alignItems: "center",

    marginHorizontal: 6,

    shadowColor: "#000",

    shadowOpacity: 0.1,

    shadowOffset: { width: 0, height: 2 },

    shadowRadius: 4

  },

  vagasButton: {

    backgroundColor: "#4F46E5"

  },

  novoPostButton: {

    backgroundColor: "#374151"

  },

  vagasText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "700"

  },

  novoPostText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "700"

  },

  postCard: {

    width: "100%",

    backgroundColor: "#fff",

    borderRadius: 16,

    padding: 18,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowOffset: { width: 0, height: 3 },

    shadowRadius: 6,

    borderWidth: 1,

    borderColor: "#E5E7EB"

  },

  postTitle: {

    fontSize: 18,

    fontWeight: "700",

    marginBottom: 8,

    color: "#0F172A"

  },

  postContent: {

    fontSize: 15,

    marginBottom: 10,

    color: "#334155",

    lineHeight: 22

  },

  postAuthor: {

    fontSize: 13,

    color: "#64748B",

    textAlign: "right"

  }

});