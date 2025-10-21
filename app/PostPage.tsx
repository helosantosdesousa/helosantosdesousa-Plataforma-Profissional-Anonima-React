import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

export default function PostPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const post: Post = params.post ? JSON.parse(params.post as string) : {
    id: 0,
    title: "Post não encontrado",
    content: "",
    author: "Desconhecido",
  };

  const [likes, setLikes] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText.trim()]);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F7FA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.author}>Por {post.author}</Text>
          <Text style={styles.content}>{post.content}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setLikes(likes + 1)}>
              <Text style={styles.likeText}>❤️ {likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowCommentInput(!showCommentInput)}>
              <Text style={styles.commentIcon}>💬 Comentar</Text>
            </TouchableOpacity>
          </View>

          {showCommentInput && (
            <View style={styles.commentBox}>
              <TextInput
                style={styles.input}
                placeholder="Escreva um comentário..."
                value={commentText}
                onChangeText={setCommentText}
                onSubmitEditing={handleAddComment}
                blurOnSubmit={false}
                returnKeyType="send"
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}

          {comments.length > 0 && (
            <View style={styles.commentThread}>
              {comments.map((c, i) => (
                <View key={i} style={styles.commentItem}>
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentTextThread}>{c}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Voltar para Feed</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1, alignItems: "center" },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#1F2937", marginBottom: 8 },
  author: { fontSize: 14, fontWeight: "500", color: "#6B7280", marginBottom: 16 },
  content: { fontSize: 16, color: "#374151", lineHeight: 22, marginBottom: 20 },
  actions: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  actionButton: { marginHorizontal: 16 },
  likeText: { fontSize: 18, fontWeight: "600", color: "#EF4444" },
  commentIcon: { fontSize: 18, fontWeight: "600", color: "#3B82F6" },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
    marginTop: 8,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 6 },
  sendButton: { marginLeft: 12 },
  sendButtonText: { color: "#3B82F6", fontWeight: "600", fontSize: 16 },
  commentThread: { marginTop: 12 },
  commentItem: { flexDirection: "row", marginBottom: 8 },
  commentBubble: { backgroundColor: "#E5E7EB", borderRadius: 16, padding: 12, maxWidth: "80%" },
  commentTextThread: { color: "#1F2937", fontSize: 15 },
  backButton: { marginTop: 16, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  backButtonText: { color: "#3B82F6", fontWeight: "600", fontSize: 16 },
});
