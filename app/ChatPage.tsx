import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "expo-router";

type Message = { text: string; isUser: boolean };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const nomeContato = route.params?.nomeContato || "Contato";

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: nomeContato });
  }, [navigation]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = { text: inputText, isUser: true };
    setMessages(prev => [...prev, newMsg]);
    setInputText("");

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);

    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Olá! Esta resposta é automática`, isUser: false }]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animated.View
      style={[
        styles.message,
        item.isUser ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={[styles.messageText, item.isUser && { color: "#0F172A" }]}>{item.text}</Text>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ padding: 12, paddingBottom: 90 + insets.bottom }}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
        />

        <View style={[styles.inputRow, { paddingBottom: insets.bottom || 12 }]}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            activeOpacity={0.8}
          >
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
    borderRadius: 20,
    marginVertical: 6,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#D1E8FF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFF",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
