import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, Platform } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginPage"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginPage({ navigation }: Props) {
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (usuario === "admin" && senha === "123") {
      setLoading(false);

      if (Platform.OS === "web") {
        window.alert("Login bem-sucedido!");
      } else {
        Alert.alert("Login bem-sucedido!", "Você entrou com sucesso!");
      }

      navigation.replace("FeedPage");
    } else {
      setLoading(false);

      if (Platform.OS === "web") {
        window.alert("Erro no login: Usuário ou senha inválidos.");
      } else {
        Alert.alert("Erro no login", "Usuário ou senha inválidos.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plataforma Profissional Anônima</Text>
      <Text style={styles.subtitle}>Autenticação segura</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});
