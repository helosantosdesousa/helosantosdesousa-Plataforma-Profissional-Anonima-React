import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import BottomBar from "../components/BottomBar";
import { PanGestureHandler } from "react-native-gesture-handler";

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

  const backgroundColor = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["#ccffcc", "#fff", "#ffcccc"],
  });

  const perfilAtual = perfis[index];

  const proximoPerfil = () => {
    if (index + 1 < perfis.length) setIndex(index + 1);
    else setAcabou(true);
    translateX.setValue(0);
  };

  const swipePerfil = (toRight: boolean) => {
    const value = toRight ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(translateX, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start(proximoPerfil);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    if (state === 5) { // END
      if (translationX > SCREEN_WIDTH * 0.25) swipePerfil(true); 
      else if (translationX < -SCREEN_WIDTH * 0.25) swipePerfil(false);
      else Animated.spring(translateX, { toValue: 0, useNativeDriver: false }).start();
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
          <Animated.View
            style={[styles.card, { transform: [{ translateX }, { rotate }], backgroundColor }]}
          >
            <Text style={styles.nome}>{perfilAtual.nome}</Text>
            <Text style={styles.label}>Bio:</Text>
            <Text>{perfilAtual.bio}</Text>
            <Text style={styles.label}>Habilidades:</Text>
            <Text>{perfilAtual.habilidades.join(", ")}</Text>
          </Animated.View>
        </PanGestureHandler>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => swipePerfil(false)} 
          >
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => swipePerfil(true)} 
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
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    width: SCREEN_WIDTH - 40,
    padding: 24,
    borderRadius: 16,
    elevation: 5,
    marginBottom: 16,
  },
  nome: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  label: { fontWeight: "bold", marginTop: 8 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: SCREEN_WIDTH - 40 },
  button: { flex: 1, padding: 14, borderRadius: 8, alignItems: "center", marginHorizontal: 6 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  fimText: { fontSize: 20, textAlign: "center", color: "gray", fontWeight: "bold", marginTop: 20 },
});
