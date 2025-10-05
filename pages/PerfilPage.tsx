import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import BottomBar from "../components/BottomBar";

type PerfilPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "PerfilPage">;
type PerfilPageRouteProp = RouteProp<RootStackParamList, "PerfilPage">;

type Props = {
  route: PerfilPageRouteProp;
};

export default function PerfilPage({ route }: Props) {
  const navigation = useNavigation<PerfilPageNavigationProp>();
  const { nome, bio, habilidades, email, empresa } = route.params || {};
  const nomeUsuario = nome || "Usuário Exemplo";

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginPage" }],
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Ícone de configurações no canto superior direito */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("SettingsPage")}
      >
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar do usuário centralizado */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>

        <Text style={styles.nome}>Nome: {nome || "Usuário Exemplo"}</Text>
        <Text style={styles.bio}>{bio || "Bio do usuário"}</Text>
        <Text style={styles.habilidades}>
          Habilidades: {(habilidades && habilidades.join(", ")) || "React, TypeScript"}
        </Text>
        <Text style={styles.infoSecundaria}>(dados disponíveis apenas para você)</Text>
        <Text style={styles.infoSecundaria}>E-mail: {email || "admin@fiap.com"}</Text>
        <Text style={styles.infoSecundaria}>Empresa/Universidade: {empresa || "Faculdade X"}</Text>

        <View style={styles.logoutButton}>
          <Button title="Logout" color="red" onPress={handleLogout} />
        </View>
      </ScrollView>

      <BottomBar nomeUsuario={nomeUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  settingsIcon: {
    fontSize: 32,
    color: "gray",
  },
  container: {
    flexGrow: 1,
    paddingTop: 120, // espaço para avatar e ícone de settings
    paddingHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  avatar: {
    fontSize: 100,
    color: "blue",
  },
  nome: { fontSize: 28, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  bio: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  habilidades: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  infoSecundaria: { fontSize: 14, color: "gray", textAlign: "center", marginBottom: 6 },
  logoutButton: { marginTop: 30, width: "100%" },
});
