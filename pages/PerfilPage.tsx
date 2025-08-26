import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type PerfilPageNavigationProp = NativeStackNavigationProp<RootStackParamList, "PerfilPage">;

type Props = {
  nome?: string;
  bio?: string;
  habilidades?: string[];
  email?: string;
  empresa?: string;
};

export default function PerfilPage({
  nome = "Usuário Exemplo",
  bio = "Bio do usuário",
  habilidades = ["React", "TypeScript"],
  email = "usuario@email.com",
  empresa = "Empresa/Universidade",
}: Props) {
  const navigation = useNavigation<PerfilPageNavigationProp>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginPage" }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>👤</Text>
      </View>

      <Text style={styles.nome}>Nome: {nome}</Text>
      <Text style={styles.bio}>{bio}</Text>
      <Text style={styles.habilidades}>Habilidades: {habilidades.join(", ")}</Text>
      <Text style={styles.infoSecundaria}>(dados disponíveis apenas para você)</Text>
      <Text style={styles.infoSecundaria}>E-mail: {email}</Text>
      <Text style={styles.infoSecundaria}>Empresa/Universidade: {empresa}</Text>

      <View style={styles.logoutButton}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  iconContainer: { marginBottom: 20 },
  icon: { fontSize: 100, color: "blue" },
  nome: { fontSize: 28, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  bio: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  habilidades: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  infoSecundaria: { fontSize: 14, color: "gray", textAlign: "center", marginBottom: 6 },
  logoutButton: { marginTop: 30, width: "100%" },
});
