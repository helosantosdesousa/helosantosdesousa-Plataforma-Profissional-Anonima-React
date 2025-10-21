import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";


export default function CreatePostPage({ params }: { params: { nomeUsuario?: string } }) {
  const router = useRouter();
  const nomeUsuario = params?.nomeUsuario || "Você";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

   const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({ title: "Fazer um post" });
    },[navigation]);


  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Erro", "Preencha título e conteúdo!");
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
      style={{ flex: 1, backgroundColor: "#F5F7FA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título do post"
        />
        <Text style={[styles.label, { marginTop: 12 }]}>Conteúdo</Text>
        <TextInput
          style={[styles.input, { height: 160 }]}
          value={content}
          onChangeText={setContent}
          placeholder="Digite o conteúdo do post"
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>Postar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 16, fontWeight: "600", color: "#0F172A", marginBottom: 6 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 12, padding: 14, fontSize: 16 },
  button: { backgroundColor: "#2563EB", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 24, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
