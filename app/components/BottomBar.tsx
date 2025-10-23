import React, { useState } from "react";
import {
  View,
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
  const currentPath = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const buttons = [
    {
      name: "home",
      color: "#2081C4",
      isActive: currentPath.includes("FeedPage"),
      action:
        onReloadFeed ||
        (() =>
          router.replace({
            pathname: "/FeedPage",
            params: { nome: nomeUsuario },
          })),
    },
    {
      name: "favorite",
      color: "#FF5733",
      isActive: currentPath.includes("MatchmakingPage"),
      action: () =>
        router.push({
          pathname: "/MatchmakingPage",
          params: { nomeUsuario },
        }),
    },
    {
      name: "chat",
      color: "#8B5CF6",
      isActive: currentPath.includes("ChatPage"),
      action: () => router.push("/ChatPage"),
    },
    {
      name: "person",
      color: "#10B981",
      isActive: currentPath.includes("PerfilPage"),
      action: () =>
        router.push({
          pathname: "/PerfilPage",
          params: { nome: nomeUsuario },
        }),
    },
  ];

  const getBackgroundColor = (isActive: boolean, isHovered: boolean) => {
    if (isActive) return "rgba(32, 129, 196, 0.1)";
    if (isHovered) return "rgba(0,0,0,0.04)";
    return "transparent";
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
  <View style={styles.bottomBar}>
    {buttons.map((btn, i) => {
      const isHovered = hovered === btn.name;
      const backgroundColor = getBackgroundColor(btn.isActive, isHovered);

      return (
        <Pressable
          key={i}
          onPress={btn.action}
          onHoverIn={() => setHovered(btn.name)}
          onHoverOut={() => setHovered(null)}
          style={[styles.bottomButton, { backgroundColor }]}
        >
          <MaterialIcons name={btn.name as any} size={28} color={btn.color} />
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
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        shadowRadius: 10,
      },
      android: { elevation: 15 },
    }),
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 15,
  },
});