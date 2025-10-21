import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";

import { useEffect } from "react";
import { useNavigation } from "expo-router";


const PALETTE = {
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  accent: "#8B5CF6",
  bg: "#F8FAFF",
  text: "#0F172A",
  subtext: "#64748B",
  inputBg: "#EEF2FF",
  inputBorder: "#CBD5E1",
  white: "#FFFFFF",
};

export default function SignUpPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const isDisabled = !usuario.trim() || !email.trim() || !senha.trim() || !confSenha.trim();

  const navigation = useNavigation();

useEffect(() => {
  navigation.setOptions({ title: "Criar uma conta" });
}, [navigation]);


  const handleSignUp = async () => {
    if (isDisabled) return;

    if (senha !== confSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    Alert.alert("Sucesso", "Conta criada com sucesso!");
    router.replace("/FeedPage");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: PALETTE.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFill} onPress={Keyboard.dismiss} />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="seu_usuário"
              placeholderTextColor={PALETTE.subtext}
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@exemplo.com"
              placeholderTextColor={PALETTE.subtext}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="•••••••"
                placeholderTextColor={PALETTE.subtext}
                secureTextEntry={!showPassword}
                value={senha}
                onChangeText={setSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.showBtn}
              >
                <Text style={styles.showBtnText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Confirmar Senha</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="•••••••"
                placeholderTextColor={PALETTE.subtext}
                secureTextEntry={!showConfPassword}
                value={confSenha}
                onChangeText={setConfSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfPassword((s) => !s)}
                style={styles.showBtn}
              >
                <Text style={styles.showBtnText}>{showConfPassword ? "Ocultar" : "Mostrar"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <View style={styles.loginBtnDisabled}>
              <ActivityIndicator size="small" color={PALETTE.white} />
              <Text style={styles.loginBtnText}>Criando conta...</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isDisabled}
              style={[styles.loginBtn, isDisabled && styles.loginBtnOff]}
            >
              <Text style={styles.loginBtnText}>Criar Conta</Text>
            </TouchableOpacity>
          )}

          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Voltar ao login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footnote}>© {new Date().getFullYear()} PPA</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, alignItems: "center", justifyContent: "center" },
  card: {
    width: "100%",
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: PALETTE.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E2E8F0",
  },
  inputWrapper: { marginBottom: 14 },
  inputLabel: { marginBottom: 6, color: PALETTE.subtext, fontSize: 13 },
  input: {
    borderWidth: 1,
    borderColor: PALETTE.inputBorder,
    backgroundColor: PALETTE.inputBg,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    color: PALETTE.text,
    marginBottom: 8,
  },
  passwordRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  showBtn: { marginLeft: 8, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#E9D5FF" },
  showBtnText: { color: PALETTE.accent, fontWeight: "600" },
  loginBtn: { marginTop: 8, paddingVertical: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: PALETTE.primary },
  loginBtnOff: { backgroundColor: "#93C5FD" },
  loginBtnDisabled: { marginTop: 8, paddingVertical: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, backgroundColor: PALETTE.primary },
  loginBtnText: { color: PALETTE.white, fontWeight: "bold", fontSize: 16, marginLeft: 6 },
  footerLinks: { marginTop: 14, flexDirection: "row", justifyContent: "space-between" },
  linkText: { color: PALETTE.primary, fontWeight: "600" },
  footnote: { marginTop: 16, color: PALETTE.subtext, fontSize: 12 },
});
