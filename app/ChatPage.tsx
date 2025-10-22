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
import { useNavigation, useRouter } from "expo-router";

type Message = { text: string; isUser: boolean };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const nomeContato = route.params?.nomeContato || "Contato";

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ 
      title: nomeContato,
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 28, color: '#2081C4' }}>←</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, nomeContato, router]);

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
      <Text style={[styles.messageText, item.isUser && styles.userMessageText]}>{item.text}</Text>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F3F7" }}>
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
            activeOpacity={0.7}
          >
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginVertical: 4,
    maxWidth: "80%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  userMessage: {
    backgroundColor: "#2081C4",
    alignSelf: "flex-end",
    borderBottomRightRadius: 6,
  },
  otherMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  messageText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
  },
  userMessageText: {
    color: "#FFFFFF",
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
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#2081C4",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 20,
    transform: [{ rotate: '-10deg' }], 
  },
});
