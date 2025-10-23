import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext"; 
import BottomBar from "./components/BottomBar";

type AppRoutes =
  | "/EditProfilePage"
  | "/SettingsPage"
  | "/LoginPage"
  | "/NetworkPage"
  | "/UserPostsPage";

type ProfileAction = {
  id: string;
  label: string;
  icon: string;
  route: AppRoutes | null;
  isDestructive?: boolean;
};

const profileActions: ProfileAction[] = [
  { id: "edit", label: "Editar Perfil", icon: "✏️", route: "/EditProfilePage" },
  { id: "settings", label: "Configurações", icon: "⚙️", route: "/SettingsPage" },
  { id: "support", label: "Ajuda e Suporte", icon: "❓", route: null },
  { id: "logout", label: "Sair da Conta", icon: "🚪", route: "/LoginPage", isDestructive: true },
];

export default function ProfilePage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nome?: string }>(); // Mantido para possível uso futuro, mas não usado para nome
  const navigation = useNavigation();
  const { usuarioSelecionado, setUsuarioSelecionado } = useUser();

  // Simplificado para usar APENAS o contexto, já que o SignUpPage o define
  const nomeUsuario = usuarioSelecionado?.nome || "Usuário Exemplo";
  const mockHandle = `@${nomeUsuario.toLowerCase().replace(/\s/g, "_")}`;

  useEffect(() => {
    navigation.setOptions({ title: "Meu Perfil" });
  }, [navigation]);

  const handleAction = (route: AppRoutes | null, isDestructive?: boolean) => {
    if (!route) {
      return;
    }

    if (route === "/LoginPage" && isDestructive) {
      setUsuarioSelecionado(null);
      router.replace(route);
      return;
    }

    if (route === "/EditProfilePage") {
      router.push(`/EditProfilePage?nome=${encodeURIComponent(nomeUsuario)}`);
      return;
    }

    if (isDestructive) {
      router.replace(route);
    } else {
      router.push(route);
    }
  };

  const handleNetworkPress = () => {
    router.push(`/NetworkPage?nomeUsuario=${nomeUsuario}`);
  };

  const handleUserPostsPress = () => {
    router.push(`/UserPostsPage?nomeUsuario=${nomeUsuario}`);
  };

  const StatsCard = ({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) => (
    <View style={styles.statBox}>
      <TouchableOpacity 
        onPress={onPress} 
        disabled={!onPress}
        activeOpacity={onPress ? 0.6 : 1}
        style={{ alignItems: 'center' }}
      >
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: `https://placehold.co/100x100/2081C4/FFFFFF/png?text=${nomeUsuario.charAt(0)}`,
            }}
            style={styles.profileImage}
          />
          <Text style={styles.displayName}>{String(nomeUsuario)}</Text>
          <Text style={styles.handleText}>{String(mockHandle)}</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatsCard label="Posts" value="4" onPress={handleUserPostsPress} />
          <StatsCard label="Conexões" value="15" onPress={handleNetworkPress} />
          <StatsCard label="Likes Recebidos" value="1.8K" />
        </View>

        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Geral</Text>
          {profileActions.slice(0, 3).map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionItem}
              onPress={() => handleAction(action.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Sessão</Text>
          {profileActions.slice(3).map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionItem}
              onPress={() => handleAction(action.route, action.isDestructive)}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionIcon, styles.destructiveIcon]}>{action.icon}</Text>
              <Text style={[styles.actionLabel, styles.destructiveLabel]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomBar onReloadFeed={() => router.replace("/FeedPage")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F3F7" },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 },

  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, borderWidth: 3, borderColor: "#2081C4" },
  displayName: { fontSize: 24, fontWeight: "800", color: "#1F2937", marginBottom: 2 },
  handleText: { fontSize: 16, color: "#6B7280" },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 18, fontWeight: "800", color: "#2081C4" },
  statLabel: { fontSize: 13, color: "#6B7280", marginTop: 4 },

  actionSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#4B5563", marginBottom: 10, paddingLeft: 10 },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  actionIcon: { fontSize: 20, marginRight: 15 },
  actionLabel: { fontSize: 16, fontWeight: "500", color: "#1F2937", flex: 1 },
  destructiveIcon: { opacity: 0.8 },
  destructiveLabel: { color: "#EF4444", fontWeight: "600" },
});
