import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import BottomBar from "./components/BottomBar";

import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

export default function PerfilPage() {
  const navigation = useNavigation<any>();
  useEffect(() => {
          navigation.setOptions({ title: "Perfil" });
        }, [navigation]);


  const route = useRoute<any>();

  const { nome, bio, habilidades, email, empresa } = route.params || {};
  const nomeUsuario = nome;

  const [userBio, setUserBio] = useState(bio || "");
  const [userEmail, setUserEmail] = useState(email || "");
  const [userEmpresa, setUserEmpresa] = useState(empresa || "");
  const [userHabilidades, setUserHabilidades] = useState(habilidades || []);
  const [newHabilidade, setNewHabilidade] = useState("");
  const [editMode, setEditMode] = useState(false);

  const totalConexoes = 3;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginPage" }],
    });
  };

  const handleSave = () => {
    alert("Dados salvos com sucesso!");
    setEditMode(false);
    Keyboard.dismiss();
  };

  const addHabilidade = () => {
    if (newHabilidade.trim() !== "") {
      setUserHabilidades([...userHabilidades, newHabilidade.trim()]);
      setNewHabilidade("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
  contentContainerStyle={[
    styles.scrollContainer,
    editMode && { backgroundColor: "#f0f0f0" },
  ]}
>

          <View style={styles.settingsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SettingsPage")}
              style={styles.settingsButton}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editIconButton}
              onPress={() => setEditMode(!editMode)}
            >
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>

          <Text style={styles.nome}>{nomeUsuario}</Text>


          <TouchableOpacity
            style={styles.conexoesCard}
            onPress={() => navigation.navigate("NetworkPage")}
          >
            <Text style={styles.conexoesText}> {totalConexoes} conexões</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Bio:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua bio"
            value={userBio}
            onChangeText={setUserBio}
            multiline
            editable={editMode}
          />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
            editable={editMode}
          />

          <Text style={styles.label}>Empresa/Universidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua empresa ou universidade"
            value={userEmpresa}
            onChangeText={setUserEmpresa}
            editable={editMode}
          />

          <Text style={styles.label}>Habilidades:</Text>
          <View style={styles.habilidadesContainer}>
            {userHabilidades.map((h: string, i: number) => (
              <View key={i} style={styles.habilidadeItem}>
                <Text>{h}</Text>
              </View>
            ))}
          </View>

          {editMode && (
            <TextInput
              style={styles.input}
              placeholder="Digite uma habilidade e pressione Enter"
              value={newHabilidade}
              onChangeText={setNewHabilidade}
              onSubmitEditing={addHabilidade}
              blurOnSubmit={false}
            />
          )}

          {editMode && (
            <View style={styles.saveContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar alterações</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomBar nomeUsuario={nomeUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  settingsButton: { padding: 8 },
  settingsIcon: { fontSize: 32, color: "gray" },
  editIconButton: { marginTop: 8, padding: 8 },
  editIcon: { fontSize: 28, color: "gray" },
  scrollContainer: {
  flexGrow: 1,
  paddingTop: 24,
  paddingHorizontal: 24,
  alignItems: "center",
  paddingBottom: 180,
  backgroundColor: "#fff",
},

  avatarContainer: { marginBottom: 24, alignItems: "center" },
  avatar: { fontSize: 100, color: "blue" },
  nome: { fontSize: 28, fontWeight: "bold", marginBottom: 10, textAlign: "center" },

  conexoesCard: {
    backgroundColor: "#f5f8ffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  conexoesText: {
    color: "#00124fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  label: { fontSize: 16, fontWeight: "bold", marginTop: 12, alignSelf: "flex-start" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12, marginTop: 6, fontSize: 16, backgroundColor: "#f9f9f9" },
  habilidadesContainer: { flexDirection: "row", flexWrap: "wrap", marginVertical: 6 },
  habilidadeItem: { backgroundColor: "#e0e0e0", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginRight: 6, marginBottom: 6 },
  saveContainer: { width: "80%", alignItems: "center", marginVertical: 12 },
  saveButton: { backgroundColor: "#4A90E2", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10, alignSelf: "center" },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
  logoutContainer: { width: "100%", alignItems: "center", marginVertical: 12 },
  logoutButton: { backgroundColor: "#F05454", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10, alignSelf: "center" },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
