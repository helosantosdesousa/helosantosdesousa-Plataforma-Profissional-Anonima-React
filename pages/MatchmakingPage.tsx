import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import BottomBar from "../components/BottomBar";
import { PanGestureHandler, State } from "react-native-gesture-handler";

type MatchmakingPageRouteProp = RouteProp<RootStackParamList, "MatchmakingPage">;

type Perfil = {
  nome: string;
  bio: string;
  habilidades: string[];
};

const perfis: Perfil[] = [
  { nome: "TechNomadX", bio: "Desenvolvedora Frontend", habilidades: ["React", "TypeScript", "CSS"] },
  { nome: "ShadowDesigner", bio: "Designer UX", habilidades: ["Figma", "Adobe XD"] },
  { nome: "LostAPI", bio: "Backend", habilidades: ["Node.js", "MongoDB"] },
];

const SCREEN_WIDTH = Dimensions.get("window").width;

const PALETTE = {
  bg: "#F8FAFF",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  sub: "#475569",
  accept: "#10B981",
  reject: "#EF4444",
};

export default function MatchmakingPage() {
  const route = useRoute<MatchmakingPageRouteProp>();
  const nomeUsuario = route.params?.nomeUsuario || "Usuário Exemplo";

  const [index, setIndex] = useState(0);
  const [acabou, setAcabou] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  const perfilAtual = perfis[index];

  const proximoPerfil = () => {
    if (index + 1 < perfis.length) setIndex((i) => i + 1);
    else setAcabou(true);
    translateX.setValue(0);
  };

  const swipePerfil = (toRight: boolean) => {
    const value = toRight ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(translateX, {
      toValue: value,
      duration: 220,
      useNativeDriver: false,
    }).start(proximoPerfil);
  };

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], {
    useNativeDriver: false,
  });

  const onHandlerStateChange = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationX > SCREEN_WIDTH * 0.25) swipePerfil(true);
      else if (translationX < -SCREEN_WIDTH * 0.25) swipePerfil(false);
      else Animated.spring(translateX, { toValue: 0, useNativeDriver: false, bounciness: 8 }).start();
    }
  };

  if (acabou) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.fimText}>🚀 Você já viu todos os perfis disponíveis no momento.</Text>
        </View>
        <BottomBar nomeUsuario={nomeUsuario} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
          <Animated.View style={[styles.card, { transform: [{ translateX }, { rotate }] }]}>
            <Text style={styles.nome}>{perfilAtual.nome}</Text>
            <Text style={styles.label}>Bio</Text>
            <Text style={styles.text}>{perfilAtual.bio}</Text>
            <Text style={[styles.label, { marginTop: 12 }]}>Habilidades</Text>
            <Text style={styles.text}>{perfilAtual.habilidades.join(", ")}</Text>
          </Animated.View>
        </PanGestureHandler>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: PALETTE.accept }]}
            activeOpacity={0.9}
            onPress={() => swipePerfil(true)}
          >
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: PALETTE.reject }]}
            activeOpacity={0.9}
            onPress={() => swipePerfil(false)}
          >
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomBar nomeUsuario={nomeUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bg },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    width: SCREEN_WIDTH - 40,
    padding: 24,
    borderRadius: 20,
    backgroundColor: PALETTE.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PALETTE.border,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  nome: { fontSize: 24, fontWeight: "700", color: PALETTE.text, marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "600", color: PALETTE.sub, marginBottom: 4 },
  text: { fontSize: 16, color: PALETTE.text, lineHeight: 22 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: SCREEN_WIDTH - 40, marginTop: 8 },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  fimText: { fontSize: 18, textAlign: "center", color: PALETTE.sub, fontWeight: "700", marginTop: 20, paddingHorizontal: 24 },
});
