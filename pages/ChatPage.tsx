import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import BottomBar from "../components/BottomBar";
import { useRoute } from "@react-navigation/native";

type Message = {
  text: string;
  isUser: boolean;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const route = useRoute<any>();
  const nomeUsuario = route.params?.nomeUsuario || "Usuário";

  const sendMessage = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    setInputText("");

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Olá! (automático)", isUser: false }]);
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
  data={messages}
  keyExtractor={(_, index) => index.toString()}
  contentContainerStyle={{ 
    padding: 8, 
    paddingBottom: 80 + 16 // 80 é a altura da BottomBar, 16 é extra
  }}
  renderItem={({ item }) => (
    <View style={[styles.message, item.isUser ? styles.userMessage : styles.otherMessage]}>
      <Text>{item.text}</Text>
    </View>
  )}
/>

<View style={[styles.inputRow, { marginBottom: 80 }]}>
  <TextInput
    style={styles.input}
    placeholder="Digite uma mensagem..."
    value={inputText}
    onChangeText={setInputText}
  />
  <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
    <Text style={styles.sendText}>Enviar</Text>
  </TouchableOpacity>
</View>

      </KeyboardAvoidingView>

      <BottomBar
        nomeUsuario={nomeUsuario}
        onReloadFeed={() => console.log("Recarregar Feed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messagesContainer: { padding: 8 },
  message: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#cce5ff",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
  },
  inputRow: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
