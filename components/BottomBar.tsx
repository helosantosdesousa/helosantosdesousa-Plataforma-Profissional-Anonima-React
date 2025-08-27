import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type BottomBarProps = {
  nomeUsuario: string;
  onReloadFeed?: () => void;
};

export default function BottomBar({ nomeUsuario, onReloadFeed }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.bottomButton, styles.btnBlue]}
          onPress={onReloadFeed || (() => navigation.navigate("FeedPage", { nome: nomeUsuario }))}
        >
          <Text style={styles.bottomButtonText}>Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.bottomButton, styles.btnGreen]}
          onPress={() => navigation.navigate("MatchmakingPage", { nomeUsuario })}
        >
          <Text style={styles.bottomButtonText}>Match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.bottomButton, styles.btnPurple]}
          onPress={() => navigation.navigate("ChatPage")}
        >
          <Text style={styles.bottomButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.bottomButton, styles.btnPink]}
          onPress={() => navigation.navigate("PerfilPage", { nome: nomeUsuario })}
        >
          <Text style={styles.bottomButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  btnBlue: { backgroundColor: "#3B82F6" },   
  btnGreen: { backgroundColor: "#10B981" }, 
  btnPurple: { backgroundColor: "#8B5CF6" }, 
  btnPink: { backgroundColor: "#EC4899" },   
  bottomButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
