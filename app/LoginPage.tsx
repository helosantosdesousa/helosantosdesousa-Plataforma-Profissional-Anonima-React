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
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import { useEffect } from "react";


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

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isDisabled = !usuario.trim() || !senha.trim();

  const navigation = useNavigation();

useEffect(() => {
  navigation.setOptions({ headerShown: false });
}, [navigation]);


 const handleLogin = async () => {
  if (isDisabled) return;
  setLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (usuario === "admin" && senha === "123") {
    setLoading(false);
    router.replace(`/FeedPage?nome=${encodeURIComponent(usuario)}`);
  } else {
    setLoading(false);
    const msg = "Erro no login: Usuário ou senha inválidos.";
    if (Platform.OS === "web") {
      window.alert(msg);
    } else {
      Alert.alert("Erro no login", msg);
    }
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: PALETTE.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={Keyboard.dismiss}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
  source={require("../assets/images/ppa_logo.png")}
  style={{ width: 80, height: 80, borderRadius: 16, marginBottom: 12 }}
  resizeMode="contain"
/>
          </View>
          <Text style={styles.title}>Plataforma Profissional Anônima</Text>
          <Text style={styles.subtitle}>Autenticação segura</Text>
        </View>

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
              autoCorrect={false}
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
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.showBtn}
              >
                <Text style={styles.showBtnText}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <View style={styles.loginBtnDisabled}>
              <ActivityIndicator size="small" color={PALETTE.white} />
              <Text style={styles.loginBtnText}>Entrando...</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isDisabled}
              style={[styles.loginBtn, isDisabled && styles.loginBtnOff]}
            >
              <Text style={styles.loginBtnText}>Entrar</Text>
            </TouchableOpacity>
          )}

          <View style={styles.footerLinks}>
  <TouchableOpacity>
    <Text style={styles.linkText}>Esqueci minha senha</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push("/SignupPage")}>
    <Text style={styles.linkText}>Criar conta</Text>
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
  header: { alignItems: "center", marginBottom: 16 },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: PALETTE.primary,
  },
  title: { fontSize: 20, fontWeight: "bold", color: PALETTE.text, textAlign: "center" },
  subtitle: { fontSize: 14, color: PALETTE.subtext, textAlign: "center", marginTop: 4 },
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
