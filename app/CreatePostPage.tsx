import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";

// Substituindo Alert.alert por console.log para evitar problemas em ambientes de iframe
const mockAlert = (title: string, message: string) => {
  console.log(`ALERTA: ${title} - ${message}`);
};

export default function CreatePostPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nomeUsuario?: string }>();
  const nomeUsuario = params.nomeUsuario || "Usuário Exemplo";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ title: "Criar Novo Post" });
  },[navigation]);


  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) {
      mockAlert("Erro", "Preencha título e conteúdo!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: nomeUsuario,
    };

    router.push(`/FeedPage?novoPost=${encodeURIComponent(JSON.stringify(newPost))}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F0F3F7" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Compartilhe seu conhecimento</Text>
        <Text style={styles.subheader}>Seu post será publicado por @{nomeUsuario.toLowerCase().replace(/\s/g, '_')}</Text>

        <View style={styles.formSection}>
          <Text style={styles.label}>Título (Obrigatório)</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Minha experiência com TypeScript em 2025"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Conteúdo (Obrigatório)</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={content}
            onChangeText={setContent}
            placeholder="Digite o conteúdo detalhado, dicas, tutoriais ou debates (Lembre-se de respeitar as Regras da Comunidade)"
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreatePost} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Postar!</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 24, 
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  label: { 
    fontSize: 15, 
    fontWeight: "700", 
    color: "#4B5563", 
    marginBottom: 8,
  },
  input: { 
    backgroundColor: "#fff", 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 16,
    color: "#1F2937",
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  contentInput: {
    height: 200, 
    lineHeight: 24,
  },
  button: { 
    backgroundColor: "#2081C4", 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: "center", 
    marginTop: 10, 
    shadowColor: "#2081C4", 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 6 }, 
    shadowRadius: 10, 
    elevation: 8,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "900" 
  },
});
