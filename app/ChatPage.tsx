import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";



type Message = { text: string; isUser: boolean };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();

  const nomeContato = route.params?.nomeContato || "Contato";

  const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({ title: "Chat" });
    }, [navigation]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    setInputText("");

    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Olá! Esta resposta é automática`, isUser: false }]);
    }, 1000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ padding: 12, paddingBottom: 80 + insets.bottom }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.isUser ? styles.userMessage : styles.otherMessage,
              ]}
            >
              <Text style={{ color: "#0F172A" }}>{item.text}</Text>
            </View>
          )}
        />

        <View style={[styles.inputRow, { paddingBottom: insets.bottom || 12 }]}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem..."
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  userMessage: {
    backgroundColor: "#D1E8FF",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
  },
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFF",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
