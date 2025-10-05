import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Post } from "../App";

type CreatePostPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "CreatePostPage">;

export default function CreatePostPage() {
  const navigation = useNavigation<CreatePostPageNavigationProp>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = () => {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha título e conteúdo!");
      return;
    }

    const newPost: Post = {
      id: Date.now(), 
      title,
      content,
      author: "Você",
    };

    navigation.navigate("FeedPage", { novoPost: newPost });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do post"
      />
      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, { height: 150 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Digite o conteúdo do post"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
        <Text style={styles.buttonText}>Postar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
