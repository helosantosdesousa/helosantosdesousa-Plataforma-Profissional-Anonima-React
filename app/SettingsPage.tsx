import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SettingsPage() {
  const navigation = useNavigation<any>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: "Configurações" });
  }, [navigation]);

  const handleDeleteAccount = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Deseja mesmo apagar sua conta? Essa ação não pode ser desfeita."
      );
      if (confirmed) {
        navigation.replace("LoginPage");
      }
    } else {
      Alert.alert(
        "Apagar Conta",
        "Deseja mesmo apagar sua conta? Essa ação não pode ser desfeita.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Apagar",
            style: "destructive",
            onPress: () => navigation.replace("LoginPage"),
          },
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações Gerais</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Atualizações Automáticas</Text>
        <Switch value={true} disabled />
      </View>

      <View style={[styles.settingRow, { justifyContent: "center" }]}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Apagar Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  settingText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
