import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, usePathname } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

type BottomBarProps = {
  nomeUsuario: string;
  onReloadFeed?: () => void;
};

export default function BottomBar({ nomeUsuario, onReloadFeed }: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currentPath = usePathname(); // pega o caminho atual da rota
  const [hovered, setHovered] = useState<string | null>(null);

  const buttons = [
    {
      name: "home",
      color: "#3B82F6",
      route: `/FeedPage?nome=${nomeUsuario}`,
      isActive: currentPath.includes("FeedPage"),
      action: onReloadFeed || (() => router.replace(`/FeedPage?nome=${nomeUsuario}`)),
    },
    {
      name: "favorite",
      color: "#EF4444",
      route: `/MatchmakingPage?nomeUsuario=${nomeUsuario}`,
      isActive: currentPath.includes("MatchmakingPage"),
      action: () => router.push(`/MatchmakingPage?nomeUsuario=${nomeUsuario}`),
    },
    {
      name: "chat",
      color: "#8B5CF6",
      route: "/ChatPage",
      isActive: currentPath.includes("ChatPage"),
      action: () => router.push("/ChatPage"),
    },
    {
      name: "person",
      color: "#10B981",
      route: `/PerfilPage?nome=${nomeUsuario}`,
      isActive: currentPath.includes("PerfilPage"),
      action: () => router.push(`/PerfilPage?nome=${nomeUsuario}`),
    },
  ];

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.bottomBar}>
        {buttons.map((btn, i) => {
          const isHovered = hovered === btn.name;
          const backgroundColor = btn.isActive
            ? "rgba(0,0,0,0.06)"
            : isHovered
            ? "rgba(0,0,0,0.04)"
            : "transparent";

          return (
            <Pressable
              key={i}
              onPress={btn.action}
              onHoverIn={() => setHovered(btn.name)}
              onHoverOut={() => setHovered(null)}
              style={[styles.bottomButton, { backgroundColor }]}
            >
              <MaterialIcons name={btn.name as any} size={30} color={btn.color} />
            </Pressable>
          );
        })}
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
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 8,
      },
      android: { elevation: 10 },
    }),
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    transitionDuration: "150ms",
  },
});
