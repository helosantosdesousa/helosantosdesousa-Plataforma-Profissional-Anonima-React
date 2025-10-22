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
  const route = useRoute<any>();

  const { nome, bio, habilidades, email, empresa } = route.params || {};
  const nomeUsuario = nome || "Usuário";

  const [userBio, setUserBio] = useState(bio || "");
  const [userEmail, setUserEmail] = useState(email || "");
  const [userEmpresa, setUserEmpresa] = useState(empresa || "");
  const [userHabilidades, setUserHabilidades] = useState(habilidades || []);
  const [newHabilidade, setNewHabilidade] = useState("");
  const [editMode, setEditMode] = useState(false);

  const totalConexoes = 3;

  useEffect(() => {
    navigation.setOptions({ title: "Perfil" });
  }, [navigation]);

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
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            editMode && { backgroundColor: "#F2F6FA" },
          ]}
        >
          {/* Botões de configuração e edição */}
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

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>

          {/* Nome */}
          <Text style={styles.nome}>{nomeUsuario}</Text>

          <TouchableOpacity
            style={styles.conexoesCard}
            onPress={() => navigation.navigate("NetworkPage")}
            activeOpacity={0.8}
          >
            <Text style={styles.conexoesText}>{totalConexoes} Conexões</Text>
            <Text style={styles.conexoesSubText}>Clique para ver sua rede</Text>
          </TouchableOpacity>

          {/* Informações */}
          <Text style={styles.label}>Bio:</Text>
          <TextInput
            style={[styles.input, editMode && styles.inputEdit]}
            placeholder="Conte um pouco sobre você, sua trajetória..."
            value={userBio}
            onChangeText={setUserBio}
            multiline
            editable={editMode}
          />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={[styles.input, editMode && styles.inputEdit]}
            placeholder="Digite seu email profissional"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
            editable={editMode}
          />

          <Text style={styles.label}>Empresa/Universidade:</Text>
          <TextInput
            style={[styles.input, editMode && styles.inputEdit]}
            placeholder="Digite sua empresa ou universidade"
            value={userEmpresa}
            onChangeText={setUserEmpresa}
            editable={editMode}
          />

          <Text style={styles.label}>Habilidades:</Text>
          <View style={styles.habilidadesContainer}>
            {userHabilidades.map((h: string, i: number) => (
              <View key={i} style={styles.habilidadeBadge}>
                <Text style={styles.habilidadeText}>{h}</Text>
              </View>
            ))}
          </View>

          {editMode && (
            <TextInput
              style={[styles.input, styles.inputEdit]}
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

          {/* Logout */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
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
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  scrollContainer: { flexGrow: 1, paddingTop: 24, paddingHorizontal: 24, alignItems: "center", paddingBottom: 180 },

  settingsContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  settingsButton: { padding: 8 },
  settingsIcon: { fontSize: 32, color: "#6B7280" },
  editIconButton: { padding: 8 },
  editIcon: { fontSize: 28, color: "#6B7280" },

  avatarContainer: { marginBottom: 20, alignItems: "center" },
  avatar: { fontSize: 100, backgroundColor: "#D1E8FF", padding: 24, borderRadius: 100, textAlign: "center" },

  nome: { fontSize: 28, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
conexoesCard: {
  backgroundColor: "rgba(220, 220, 220, 0.5)",
  paddingVertical: 16,
  paddingHorizontal: 24,
  borderRadius: 16,
  marginBottom: 24,
  width: "100%",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
},
conexoesText: {
  color: "#2563EB",
  fontSize: 22,
  fontWeight: "700",
  textAlign: "center",
},
conexoesSubText: {
  color: "#1E3A8A",
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
  marginTop: 4,
},
  label: { fontSize: 16, fontWeight: "bold", marginTop: 12, alignSelf: "flex-start" },
  input: { width: "100%", borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 16, padding: 12, marginTop: 6, fontSize: 16, backgroundColor: "#F9FAFB" },
  inputEdit: { borderColor: "#2563EB", backgroundColor: "#EFF6FF" },

  habilidadesContainer: { flexDirection: "row", flexWrap: "wrap", marginVertical: 6 },
  habilidadeBadge: { backgroundColor: "#D1E8FF", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginRight: 6, marginBottom: 6 },
  habilidadeText: { fontSize: 14, color: "#2563EB", fontWeight: "600" },

  saveContainer: { width: "80%", alignItems: "center", marginVertical: 12 },
  saveButton: { backgroundColor: "#2563EB", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },

  logoutContainer: { width: "100%", alignItems: "center", marginVertical: 12 },
  logoutButton: { backgroundColor: "#FF4C4C", paddingVertical: 14, paddingHorizontal: 48, borderRadius: 30, shadowColor: "#FF4C4C", shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 5 },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center", letterSpacing: 0.5 },
});
