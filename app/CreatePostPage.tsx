import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025"; 
const API_KEY = "AIzaSyAOiAMmdfZfvGuBPU45DCM6Mvo5rYaJOjE";

const mockAlert = (title: string, message: string) => {
    console.log(`ALERTA: ${title} - ${message}`);
};

const fetchGeminiSuggestion = async (postTitle: string, postContent: string): Promise<string> => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

    const optimizationPrompt = `
        Você é um editor de conteúdo experiente na Plataforma Profissional Anônima (PPA).
        A PPA é uma rede onde os perfis e postagens são anônimos para todos, 
        exceto suas conexões — apenas elas veem seu nome, e você vê o delas. 
        Reforce sempre esse valor de anonimato e confiança, se for relevante.

        Analise o título e o conteúdo a seguir e forneça uma ÚNICA sugestão clara e acionável para otimizar o post.
        Foque em clareza, impacto e engajamento, em até 3 frases. 
        Não use formatação Markdown como **negrito** ou _itálico_.

        Título: ${postTitle}
        Conteúdo: ${postContent}

        SUGESTÃO:
    `;

    const payload = {
        contents: [{ role: "user", parts: [{ text: optimizationPrompt }] }],
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erro da API: ${response.status}`);
        }

        const result = await response.json();
        let text = result.candidates?.[0]?.content?.parts?.[0]?.text || 
            "A IA não conseguiu gerar uma sugestão. Tente novamente.";

        text = text.replace(/\*\*/g, "");

        return text;
    } catch (error) {
        console.error("Erro na API Gemini:", error);
        return "Falha ao conectar. Verifique sua chave da API ou conexão.";
    }
};

export default function CreatePostPage() {
    const router = useRouter();
    const params = useLocalSearchParams<{ nomeUsuario?: string }>();
    const nomeUsuario = params.nomeUsuario || "Usuário Exemplo";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestion, setSuggestion] = useState("");
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: "Criar Novo Post" });
    }, [navigation]);

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

    const handleOptimizePost = async () => {
        if (!title.trim() && !content.trim()) {
            setSuggestion("Preencha o título e o conteúdo antes de pedir uma sugestão.");
            setShowSuggestionModal(true);
            return;
        }

        setIsSuggesting(true);
        setSuggestion("Aguarde, a IA está analisando seu post...");
        setShowSuggestionModal(true);

        try {
            const result = await fetchGeminiSuggestion(title, content);
            setSuggestion(result);
        } catch {
            setSuggestion("Erro ao buscar sugestão. Tente novamente.");
        } finally {
            setIsSuggesting(false);
        }
    };

    const glowAnim = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1.3,
                    duration: 900,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 900,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#F0F3F7" }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            {showSuggestionModal && (
                <View style={styles.suggestionModalOverlay}>
                    <View style={styles.suggestionModal}>
                        <Text style={styles.modalTitle}>✨ Sugestão da PPA</Text>
                        <ScrollView style={styles.modalScroll}>
                            <Text style={styles.modalText}>{suggestion}</Text>
                        </ScrollView>
                        <TouchableOpacity
                            style={[styles.modalButton, isSuggesting && { opacity: 0.5 }]}
                            onPress={() => setShowSuggestionModal(false)}
                            disabled={isSuggesting}
                        >
                            <Text style={styles.modalButtonText}>Entendi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Compartilhe seu conhecimento</Text>
                <Text style={styles.subheader}>
                    Seu post será publicado por @{nomeUsuario.toLowerCase().replace(/\s/g, "_")}
                </Text>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Ex: Minha experiência com Java"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput
                        style={[styles.input, styles.contentInput]}
                        value={content}
                        onChangeText={setContent}
                        placeholder="Compartilhe sua experiência, dicas ou ideias..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
                    <Text style={styles.buttonText}>Postar!</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* ⚡ Raio com brilho animado */}
            <TouchableOpacity
                style={styles.geminiButton}
                onPress={handleOptimizePost}
                disabled={isSuggesting}
                activeOpacity={0.8}
            >
                {isSuggesting ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                    <Animated.View style={{ transform: [{ scale: glowAnim }] }}>
                        <MaterialCommunityIcons name="lightning-bolt" size={30} color="#FFFFFF" />
                    </Animated.View>
                )}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, paddingBottom: 60 },
    header: { fontSize: 22, fontWeight: "800", color: "#1F2937", marginBottom: 4 },
    subheader: { fontSize: 14, color: "#6B7280", marginBottom: 20 },
    formSection: { marginBottom: 20 },
    label: { fontSize: 15, fontWeight: "700", color: "#4B5563", marginBottom: 8 },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: "#1F2937",
    },
    contentInput: { height: 200, lineHeight: 22 },
    button: {
        backgroundColor: "#2081C4",
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "900" },
    geminiButton: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? 120 : 60,
        right: 24,
        backgroundColor: "#20C481",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#20C481",
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 12,
    },
    suggestionModalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    suggestionModal: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#20C481",
        marginBottom: 10,
        textAlign: "center",
    },
    modalScroll: { maxHeight: 250, marginBottom: 15 },
    modalText: { fontSize: 16, color: "#1F2937", textAlign: "justify" },
    modalButton: {
        backgroundColor: "#2081C4",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
    },
    modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
