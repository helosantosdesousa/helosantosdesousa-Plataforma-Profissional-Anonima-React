import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";


const MockInput = ({ label, value, placeholder, secureTextEntry = false, multiline = false, height = 50 }: {
  label: string,
  value: string,
  placeholder: string,
  secureTextEntry?: boolean,
  multiline?: boolean,
  height?: number
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && { height, paddingTop: 12 }]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
);

export default function EditProfilePage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ nome?: string }>();
  const navigation = useNavigation();

  const initialName = params.nome || "Usuário Exemplo";
  const mockHandle = `@${initialName.toLowerCase().replace(/\s/g, '_')}`;

  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState("Desenvolvedor curioso focado em React Native e novas tecnologias.");
  const [email, setEmail] = useState("usuario.exemplo@dev.com");
  const [company, setCompany] = useState("Tech Solutions Inc.");
  const [skills, setSkills] = useState(["React Native", "TypeScript", "UI/UX"]);

  useEffect(() => {
    navigation.setOptions({ title: "Editar Perfil" });
  }, [navigation]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Seção de Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{getInitials(name)}</Text>
          </View>
          <TouchableOpacity style={styles.changeAvatarButton} activeOpacity={0.7}>
            <Text style={styles.changeAvatarText}>Mudar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário Principal */}
        <View style={styles.formSection}>
          <MockInput 
            label="Nome Completo" 
            value={name} 
            placeholder="Seu nome completo" 
          />
          <MockInput 
            label="E-mail" 
            value={email} 
            placeholder="seu.email@exemplo.com" 
          />
          <MockInput 
            label="Empresa Atual" 
            value={company} 
            placeholder="Nome da sua empresa" 
          />
          <MockInput 
            label="Bio (Resumo Pessoal)" 
            value={bio} 
            placeholder="Fale um pouco sobre você..." 
            multiline={true} 
            height={100}
          />
        </View>

        {/* Seção de Habilidades */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.habilidadesContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.habilidadeBadge}>
                <Text style={styles.habilidadeText}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(skill)} style={styles.removeButton}>
                  <Text style={styles.removeText}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.addSkillButton} activeOpacity={0.7}>
            <Text style={styles.addSkillText}>+ Adicionar Nova Habilidade</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}activeOpacity={0.8}>
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
    backgroundColor: '#2081C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#E0F3FF',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  changeAvatarButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#E0F3FF',
  },
  changeAvatarText: {
    color: '#2081C4',
    fontWeight: '700',
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
    backgroundColor: '#F9FAFB',
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
    flexDirection: 'row',
    backgroundColor: "#E0F2F1", 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 15, 
    marginRight: 8, 
    marginBottom: 8, 
    alignItems: 'center',
  },
  habilidadeText: {
    fontSize: 14, 
    color: '#004D40',
    fontWeight: '600',
    marginRight: 5,
  },
  removeButton: {
    marginLeft: 5,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  removeText: {
    color: '#004D40',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addSkillButton: {
    borderWidth: 1,
    borderColor: '#2081C4',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    marginTop: 10,
  },
  addSkillText: {
    color: '#2081C4',
    fontWeight: '700',
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
