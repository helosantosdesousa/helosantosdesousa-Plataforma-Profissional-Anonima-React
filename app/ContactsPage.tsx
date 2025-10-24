import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomBar from "./components/BottomBar";

const PALETTE = {
  bg: "#F0F3F7",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1F2937",
  sub: "#6B7280",
  primary: "#2081C4", 
};

type Connection = {
  id: string;
  nome: string;
  bio: string;
};

const conexoesComuns: Connection[] = [
  { id: "1", nome: "Maria Souza", bio: "Desenvolvedora front-end com 5 anos de experiência em React e React Native." },
  { id: "2", nome: "Pedro Lima", bio: "Analista de dados focado em otimização de consultas e Machine Learning para varejo." },
  { id: "3", nome: "Ana Martins", bio: "Designer UX/UI apaixonada por interfaces acessíveis e user-centric design." },
  { id: "4", nome: "Carlos Oliveira", bio: "Especialista em segurança de rede e testes de penetração." },
  { id: "5", nome: "Juliana Santos", bio: "Gerente de projetos ágeis, focada em Scrum e otimização de equipes distribuídas." },
];


export default function ContatosPage() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ title: "Mensagens Diretas (DMs)" });
  }, [navigation]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const handleChatPress = (contactName: string) => {
    router.push({ 
      pathname: "/ChatPage", 
      params: { nomeContato: contactName } 
    });
  };

  const renderConnection = ({ item }: { item: Connection }) => (
    <TouchableOpacity
      style={styles.connectionCard}
      activeOpacity={0.7}
      onPress={() => handleChatPress(item.nome)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(item.nome)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.connectionName}>{item.nome}</Text>
        <Text style={styles.connectionBio} numberOfLines={1}>O que você acha?</Text>
      </View>
      <Text style={styles.chatIcon}></Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={conexoesComuns.slice(0, 5)} 
        keyExtractor={(item) => item.id}
        renderItem={renderConnection}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>Seus chats mais recentes</Text>
        )}
      />
      <BottomBar onReloadFeed={() => router.replace("/FeedPage")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: PALETTE.bg 
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: PALETTE.text,
    marginBottom: 10,
    paddingHorizontal: 5
  },
  listContent: { 
    paddingHorizontal: 16, 
    paddingTop: 16,
    paddingBottom: 100,
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PALETTE.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PALETTE.card,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  connectionName: {
    fontSize: 17,
    fontWeight: '700',
    color: PALETTE.text,
    marginBottom: 2,
  },
  connectionBio: {
    fontSize: 14,
    color: PALETTE.sub,
  },
  chatIcon: {
    fontSize: 20,
    marginLeft: 15,
    color: PALETTE.sub,
    opacity: 0.7,
  }
});
