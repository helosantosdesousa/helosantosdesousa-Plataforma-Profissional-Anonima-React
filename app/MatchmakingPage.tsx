import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import BottomBar from "./components/BottomBar";

type Perfil = {
  nome: string;
  bio: string;
  habilidades: string[];
};

const perfis: Perfil[] = [
  { nome: "TechNomadX", bio: "Desenvolvedora Frontend apaixonada por performance e acessibilidade em grande escala.", habilidades: ["React", "TypeScript", "CSS", "Next.js", "Acessibilidade"] },
  { nome: "ShadowDesigner", bio: "Designer UX/UI focado em jornadas intuitivas e pesquisa com usuários. Adoro a metodologia Design Sprint.", habilidades: ["Figma", "Adobe XD", "Pesquisa UX", "Design System", "Prototipagem"] },
  { nome: "LostAPI", bio: "Engenheiro de Backend construindo APIs escaláveis para serviços de alta demanda.", habilidades: ["Node.js", "MongoDB", "Express", "AWS Lambda", "Docker"] },
  { nome: "QuantumCoder", bio: "Cientista de Dados e machine learning. Buscando problemas complexos para resolver.", habilidades: ["Python", "Pandas", "TensorFlow", "NLP"] },
  { nome: "CodeWizard", bio: "Full-Stack Developer com 10 anos de experiência, especialista em arquitetura de software.", habilidades: ["Java", "Spring Boot", "Angular", "GCP"] },
];

const SCREEN_WIDTH = Dimensions.get("window").width;

const PALETTE = {
  bg: "#F0F3F7",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1F2937",
  sub: "#6B7280",
  accept: "#059669",
  reject: "#EF4444",
  warning: "#F59E0B",
};

const SkillTag = ({ skill }: { skill: string }) => (
  <View style={tagStyles.tag}>
    <Text style={tagStyles.tagText}>{skill}</Text>
  </View>
);

export default function MatchmakingPage() {
  const params = useLocalSearchParams<{ nomeUsuario?: string }>();
  const nomeUsuario = params.nomeUsuario || "Usuário Exemplo";

  const [index, setIndex] = useState(0);
  const [acabou, setAcabou] = useState(false);

  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Matchmaking" });
  }, [navigation]);

  // 1. Interpolação para a ROTAÇÃO (sem alteração)
  const rotate = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp",
  });
  
  // 2. Interpolação para a COR DE FUNDO
  const animatedBackgroundColor = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [PALETTE.reject, PALETTE.bg, PALETTE.accept],
    extrapolate: 'clamp',
  });
  
  // As opacidades dos retângulos de overlay (acceptOpacity, rejectOpacity) foram removidas
  // pois os overlays também foram removidos.

  const perfilAtual = perfis[index];

  const proximoPerfil = () => {
    if (index + 1 < perfis.length) {
      setIndex(i => i + 1);
    } else {
      setAcabou(true);
    }
    translateX.setValue(0);
  };

  const swipePerfil = (toRight: boolean) => {
    const valor = toRight ? SCREEN_WIDTH + 50 : -(SCREEN_WIDTH + 50);
    Animated.timing(translateX, {
      toValue: valor,
      duration: 300,
      useNativeDriver: true,
    }).start(proximoPerfil);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationX > SCREEN_WIDTH * 0.3) swipePerfil(true);
      else if (translationX < -SCREEN_WIDTH * 0.3) swipePerfil(false);
      else Animated.spring(translateX, { toValue: 0, useNativeDriver: false, bounciness: 8 }).start();
    }
  };

  if (acabou) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.fimText}>🚀 Você já viu todos os perfis disponíveis no momento.</Text>
          <Text style={styles.fimSubText}>Volte mais tarde para novas conexões.</Text>
        </View>
        <BottomBar onReloadFeed={() => {}} />
      </View>
    );
  }

  // 3. O Container principal agora é um Animated.View com a cor de fundo animada
  return (
    <Animated.View style={[styles.container, { backgroundColor: animatedBackgroundColor }]}>
      <View style={styles.content}>
        <PanGestureHandler 
          onGestureEvent={onGestureEvent} 
          onHandlerStateChange={onHandlerStateChange}
          minDist={5}
        >
          <Animated.View style={[styles.card, { transform: [{ translateX }, { rotate }] }]}>
            
            {/* 4. As views de overlay foram REMOVIDAS daqui */}

            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{perfilAtual.nome.charAt(0)}</Text>
              </View>
              <Text style={styles.nome}>{perfilAtual.nome}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.label}>Bio</Text>
              <Text style={styles.text}>{perfilAtual.bio}</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={[styles.label, { marginTop: 12 }]}>Habilidades</Text>
              <View style={tagStyles.container}>
                {perfilAtual.habilidades.map((skill, i) => (
                  <SkillTag key={i} skill={skill} />
                ))}
              </View>
            </View>
            
          </Animated.View>
        </PanGestureHandler>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            activeOpacity={0.7}
            onPress={() => swipePerfil(false)}
          >
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            activeOpacity={0.7}
            onPress={() => swipePerfil(true)}
          >
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomBar onReloadFeed={() => {}} />
    </Animated.View>
  );
}

// 5. O estilo 'container' deve ser compatível com Animated.View, e os estilos de overlay não são mais necessários.
const styles = StyleSheet.create({
  container: { flex: 1, /* A cor de fundo original (PALETTE.bg) foi movida para a interpolação */ },
  content: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 16,
    paddingBottom: 100,
  },
  
  card: {
    width: SCREEN_WIDTH - 40,
    minHeight: SCREEN_WIDTH * 1.2,
    padding: 24,
    borderRadius: 20,
    backgroundColor: PALETTE.card,
    borderWidth: 1,
    borderColor: PALETTE.border,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: PALETTE.text,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
      },
      android: { elevation: 8 },
    }),
  },
  
  // Estilos de overlay (overlay, overlayAccept, overlayReject, overlayText) foram REMOVIDOS
  // para remover os retângulos "ACEITAR/RECUSAR" flutuantes.

  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: PALETTE.border,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: PALETTE.warning,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: PALETTE.card,
    elevation: 2,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PALETTE.card,
  },
  nome: { 
    fontSize: 26, 
    fontWeight: "800", 
    color: PALETTE.text, 
    textAlign: 'center' 
  },
  infoSection: {
    marginBottom: 15,
  },
  label: { 
    fontSize: 14, 
    fontWeight: "600", 
    color: PALETTE.sub, 
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  text: { 
    fontSize: 16, 
    color: PALETTE.text, 
    lineHeight: 24 
  },
  
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: SCREEN_WIDTH - 40, 
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: PALETTE.text,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  acceptButton: {
    backgroundColor: PALETTE.accept,
  },
  rejectButton: {
    backgroundColor: PALETTE.reject,
  },
  buttonText: { 
    color: PALETTE.card, 
    fontSize: 17, 
    fontWeight: "800" 
  },

  fimText: { 
    fontSize: 22, 
    textAlign: "center", 
    color: PALETTE.text, 
    fontWeight: "800", 
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 24 
  },
  fimSubText: {
    fontSize: 16, 
    textAlign: "center", 
    color: PALETTE.sub, 
    paddingHorizontal: 24 
  }
});

const tagStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: PALETTE.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: PALETTE.text,
    fontSize: 13,
    fontWeight: '600',
  },
});