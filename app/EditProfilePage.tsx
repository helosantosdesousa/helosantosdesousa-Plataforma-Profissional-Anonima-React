import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

const MockInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  height = 50,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  height?: number;
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && { height, paddingTop: 12 }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
    />
  </View>
);

export default function EditProfilePage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nome?: string }>();
  const navigation = useNavigation();

  const initialName = params.nome || "Usuário Exemplo";

  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(
    initialName === "Usuário Exemplo"
      ? "Desenvolvedor curioso focado em React Native e novas tecnologias."
      : `Olá, sou ${initialName} e estou focado em inovação e desenvolvimento.`
  );
  const [email, setEmail] = useState(
    initialName === "Usuário Exemplo"
      ? "usuario.exemplo@dev.com"
      : `${initialName.toLowerCase().replace(/\s/g, ".")}@dev.com`
  );
  const [company, setCompany] = useState("Tech Solutions Inc.");
  const [skills, setSkills] = useState<string[]>([
    "React Native",
    "TypeScript",
    "UI/UX",
  ]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: "Editar Perfil" });
  }, [navigation]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSave = () => {
    const profileData = {
      name,
      email,
      company,
      bio,
      skills,
    };

    console.log("Salvando perfil:", profileData);
    // Substituindo Alert.alert por console.log
    console.log("Sucesso: Perfil salvo com sucesso!"); 
    // Alert.alert("Sucesso", "Perfil salvo com sucesso!");
    
    // Simula a volta para a página de perfil com o nome atualizado
    router.replace(`/PerfilPage?nome=${encodeURIComponent(name)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{getInitials(name)}</Text>
          </View>
          <TouchableOpacity style={styles.changeAvatarButton} activeOpacity={0.7}>
            <Text style={styles.changeAvatarText}>Mudar Foto</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.formSection}>
          <MockInput
            label="Nome Completo"
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
          />
          <MockInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu.email@exemplo.com"
          />
          <MockInput
            label="Empresa Atual"
            value={company}
            onChangeText={setCompany}
            placeholder="Nome da sua empresa"
          />
          <MockInput
            label="Bio (Resumo Pessoal)"
            value={bio}
            onChangeText={setBio}
            placeholder="Fale um pouco sobre você..."
            multiline
            height={100}
          />
        </View>

        
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.habilidadesContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.habilidadeBadge}>
                <Text style={styles.habilidadeText}>{skill}</Text>
                <TouchableOpacity
                  onPress={() => removeSkill(skill)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Nova habilidade"
              placeholderTextColor="#9CA3AF"
              value={newSkill}
              onChangeText={setNewSkill}
            />
            <TouchableOpacity style={styles.addSkillButton} onPress={addSkill} activeOpacity={0.7}>
              <Text style={styles.addSkillText}>+ Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F3F7",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2081C4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#E0F3FF",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  changeAvatarButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#E0F3FF",
  },
  changeAvatarText: {
    color: "#2081C4",
    fontWeight: "700",
    fontSize: 14,
  },

  formSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#F9FAFB",
    height: 50,
  },

  skillsSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4B5563",
    marginBottom: 15,
  },
  habilidadesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  habilidadeBadge: {
    flexDirection: "row",
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  habilidadeText: {
    fontSize: 14,
    color: "#004D40",
    fontWeight: "600",
    marginRight: 5,
  },
  removeButton: {
    marginLeft: 5,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  removeText: {
    color: "#004D40",
    fontWeight: "bold",
    fontSize: 12,
  },
  addSkillButton: {
    borderWidth: 1,
    borderColor: "#2081C4",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderStyle: "dashed",
    paddingHorizontal: 10,
  },
  addSkillText: {
    color: "#2081C4",
    fontWeight: "700",
    fontSize: 15,
  },

  saveButton: {
    backgroundColor: "#2081C4",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2081C4",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
});