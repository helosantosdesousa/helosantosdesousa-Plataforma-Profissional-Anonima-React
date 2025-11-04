import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import BottomBar from "./components/BottomBar";

type Message = { text: string; isUser: boolean; isSimulated?: boolean };

const mockAlert = (title: string, message: string) => {
  console.log(`ALERTA: ${title} - ${message}`);
};

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const API_KEY = "AIzaSyAOiAMmdfZfvGuBPU45DCM6Mvo5rYaJOjE";
const SYSTEM_PROMPT = `Você é o Orion, o Agente de Suporte e Orientação da Plataforma Profissional Anônima (PPA). Seu objetivo é dar suporte técnico e aconselhamento profissional aos usuários. Suas respostas devem ser profissionais, concisas e encorajadoras. Mantenha o tom de um assistente de carreira experiente. Lembre-se que você já se apresentou.`;

const convertToGeminiHistory = (messages: Message[]) => {
  return messages.map(msg => ({
    role: msg.isUser ? "user" : "model",
    parts: [{ text: msg.text }],
  }));
};

const fetchGeminiResponse = async (history: Message[]): Promise<string> => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;
  const contents = convertToGeminiHistory(history);
  const payload = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`API retornou status ${response.status}`);

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Desculpe, não consegui gerar uma resposta. Tente reformular sua pergunta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Falha ao conectar com o serviço de IA. Verifique sua conexão ou a API Key.");
  }
};

const parseMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text key={index} style={{ fontWeight: "bold" }}>
          {part.substring(2, part.length - 2)}
        </Text>
      );
    }
    return <Text key={index}>{part}</Text>;
  });
};

export default function AIPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nomeUsuario?: string }>();
  const nomeUsuario = params.nomeUsuario || "Usuário Exemplo";

  const initialMessages: Message[] = [
    { text: `Olá ${nomeUsuario}! Eu sou **Orion**, seu Assistente de IA. Estou aqui para oferecer suporte e orientação profissional de forma anônima.`, isUser: false, isSimulated: true },
    { text: "**No que posso te ajudar hoje?** (Ex: Como funciona o anonimato? Sugestões para o meu próximo post. O que são conexões?)", isUser: false, isSimulated: true },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Assistente PPA: Orion" });
  }, [navigation]);

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userPrompt = inputText.trim();
    const newMsg: Message = { text: userPrompt, isUser: true };
    const historyToSend = [...messages, newMsg];

    setMessages(historyToSend);
    setInputText("");
    setLoading(true);
    scrollToBottom();

    try {
      const aiResponseText = await fetchGeminiResponse(historyToSend);
      const aiResponse: Message = { text: aiResponseText, isUser: false };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error: any) {
      const errorMsg: Message = { text: `Erro: ${error.message || "Não foi possível processar sua solicitação."}`, isUser: false };
      setMessages(prev => [...prev, errorMsg]);
      mockAlert("Erro de IA", `Falha ao chamar Gemini: ${error.message}`);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.message, item.isUser ? styles.userMessage : styles.otherMessage]}>
      <Text style={[styles.messageText, item.isUser && { color: "#FFFFFF" }]}>
        {parseMarkdown(item.text)}
      </Text>
    </View>
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
          contentContainerStyle={{ padding: 16, paddingBottom: 180 }}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        />

<View style={[styles.inputContainer, { paddingBottom: insets.bottom + 70, marginBottom: 20 }]}>
          <TextInput
            style={styles.input}
            placeholder={loading ? "Aguardando resposta..." : "Pergunte ao Orion..."}
            placeholderTextColor="#6B7280"
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            onPress={sendMessage}
            activeOpacity={0.8}
            disabled={loading || !inputText.trim()}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.sendText}>➤</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <BottomBar onReloadFeed={() => router.replace(`/FeedPage?nome=${nomeUsuario}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginVertical: 6,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  userMessage: {
    backgroundColor: "#2081C4",
    alignSelf: "flex-end",
    borderBottomRightRadius: 8,
  },
  otherMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 8,
  },
  messageText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#1F2937",
    marginRight: 10,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: "#2081C4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    shadowColor: "#2081C4",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  sendButtonDisabled: {
    backgroundColor: "#93C5FD",
    shadowOpacity: 0,
    elevation: 0,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    transform: [{ rotate: "-45deg" }, { translateY: 2 }],
    marginLeft: 4,
  },
});
