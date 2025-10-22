import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

type Newsletter = { id: string; nome: string };
type Conexao = {
  id: string;
  nome: string;
  bio: string;
  email: string;
  empresa: string;
  habilidades: string[];
};

const newsletters: Newsletter[] = [
  { id: "1", nome: "Tech Daily" },
  { id: "2", nome: "Mindset & Sucesso" },
  { id: "3", nome: "Café com Código" },
];

const conexoesComuns: Conexao[] = [
  { id: "1", nome: "Maria Souza", bio: "Desenvolvedora front-end com 5 anos de experiência em React e React Native.", email: "maria@email.com", empresa: "TechCorp", habilidades: ["React", "JavaScript", "TypeScript", "Redux"] },
  { id: "2", nome: "Pedro Lima", bio: "Analista de dados focado em otimização de consultas e Machine Learning para varejo.", email: "pedro@email.com", empresa: "Data Inc", habilidades: ["Python", "SQL", "Pandas", "Machine Learning"] },
  { id: "3", nome: "Ana Martins", bio: "Designer UX/UI apaixonada por interfaces acessíveis e user-centric design.", email: "ana@email.com", empresa: "DesignLab", habilidades: ["Figma", "Photoshop", "UX Research", "Prototyping"] },
  { id: "4", nome: "Carlos Oliveira", bio: "Especialista em segurança de rede e testes de penetração.", email: "carlos@email.com", empresa: "CyberGuard", habilidades: ["Pentesting", "Cibersegurança", "Linux", "Shell Script"] },
  { id: "5", nome: "Juliana Santos", bio: "Gerente de projetos ágeis, focada em Scrum e otimização de equipes distribuídas.", email: "juliana@email.com", empresa: "AgileHub", habilidades: ["Scrum", "Kanban", "Liderança", "Jira"] },
  { id: "6", nome: "Rafael Costa", bio: "Engenheiro de DevOps e Cloud Computing, automatizando infraestrutura como código (IaC).", email: "rafael@email.com", empresa: "CloudOps", habilidades: ["AWS", "Terraform", "Docker", "Kubernetes"] },
  { id: "7", nome: "Fernanda Melo", bio: "Especialista em Marketing Digital e SEO, focada em estratégias de conteúdo.", email: "fernanda@email.com", empresa: "ContentMax", habilidades: ["SEO", "Inbound Marketing", "Google Analytics", "Content Strategy"] },
  { id: "8", nome: "Gustavo Rocha", bio: "Desenvolvedor Backend (Node.js) com experiência em arquiteturas de microsserviços.", email: "gustavo@email.com", empresa: "ServerFlow", habilidades: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { id: "9", nome: "Helena Alves", bio: "Recrutadora tech, especializada em encontrar talentos de engenharia de software.", email: "helena@email.com", empresa: "TalentHub", habilidades: ["Recrutamento", "Hunting", "LinkedIn Recruiter", "Comunicação"] },
  { id: "10", nome: "Lucas Ferreira", bio: "Cientista de Dados e Pesquisador, com foco em NLP e grandes volumes de dados.", email: "lucas@email.com", empresa: "DataMind", habilidades: ["NLP", "R", "Spark", "Estatística"] },
  { id: "11", nome: "Mônica Castro", bio: "Consultora de ERP, implementando sistemas SAP em grandes corporações.", email: "monica@email.com", empresa: "SystemSol", habilidades: ["SAP S/4HANA", "Consultoria", "Gestão de Mudança", "Processos"] },
  { id: "12", nome: "Thiago Mendes", bio: "Desenvolvedor Full Stack (Java/Angular) e entusiasta de código limpo.", email: "thiago@email.com", empresa: "CodeFlow", habilidades: ["Java", "Angular", "Spring Boot", "Clean Code"] },
  { id: "13", nome: "Patrícia Nunes", bio: "Analista de QA e Automação de Testes, garantindo a qualidade do software.", email: "patricia@email.com", empresa: "QualitySoft", habilidades: ["Selenium", "Cypress", "Teste de Software", "JMeter"] },
  { id: "14", nome: "Alexandre Pires", bio: "Especialista em Blockchain e Finanças Descentralizadas (DeFi).", email: "alexandre@email.com", empresa: "CryptoDev", habilidades: ["Solidity", "Ethereum", "Blockchain", "DeFi"] },
  { id: "15", nome: "Viviane Gomes", bio: "Arquiteta de Soluções em Cloud, desenhando infraestruturas escaláveis na GCP.", email: "viviane@email.com", empresa: "GCP Experts", habilidades: ["GCP", "Arquitetura Cloud", "Segurança", "Escalabilidade"] },
];

export default function ConexoesPage() {
  const [abaAtiva, setAbaAtiva] = useState<"newsletters" | "conexoes">("newsletters");
  const [perfilAberto, setPerfilAberto] = useState<Conexao | null>(null);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "Minha Rede" });
  }, [navigation]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const renderNewsletters = () => (
    <FlatList
      data={newsletters}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🗞️</Text>
          <Text style={styles.cardText}>{item.nome}</Text>
          <Text style={styles.cardSubText}>Assinado</Text>
        </View>
      )}
    />
  );

  const renderConexoes = () => {
    if (perfilAberto) {
      return (
        <ScrollView contentContainerStyle={[styles.perfilScrollContent]}>
          <View style={styles.perfilContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{getInitials(perfilAberto.nome)}</Text>
            </View>
            
            <Text style={styles.perfilNome}>{perfilAberto.nome}</Text>
            <Text style={styles.perfilSub}>{perfilAberto.empresa}</Text>

            <View style={styles.bioCard}>
              <Text style={styles.perfilLabel}>Resumo:</Text>
              <Text style={styles.perfilText}>{perfilAberto.bio}</Text>
            </View>

            <View style={styles.detailsCard}>
              <Text style={styles.perfilLabel}>E-mail de Contato:</Text>
              <Text style={styles.perfilText}>{perfilAberto.email}</Text>
            </View>
            
            <View style={styles.detailsCard}>
              <Text style={styles.perfilLabel}>Habilidades Principais:</Text>
              <View style={styles.habilidadesContainer}>
                {perfilAberto.habilidades.map((h, i) => (
                  <Text key={i} style={styles.habilidadeBadge}>{h}</Text>
                ))}
              </View>
            </View>

            <Pressable onPress={() => setPerfilAberto(null)} style={styles.voltarButton}>
              <Text style={styles.voltarText}>← Voltar para a Lista</Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    }

    return (
      <FlatList
        data={conexoesComuns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable style={styles.cardFull} onPress={() => setPerfilAberto(item)}>
            <View style={styles.cardContentRow}>
              <View style={styles.cardAvatarPlaceholder}>
                <Text style={styles.cardAvatarText}>{getInitials(item.nome)}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardSubtitle}>{item.empresa} - {item.bio.substring(0, 30)}...</Text>
              </View>
              <Text style={styles.cardArrow}>→</Text>
            </View>
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tabButton, abaAtiva === "newsletters" && styles.tabActive]}
          onPress={() => setAbaAtiva("newsletters")}
        >
          <Text style={[styles.tabText, abaAtiva === "newsletters" && styles.tabTextActive]}>Newsletters</Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, abaAtiva === "conexoes" && styles.tabActive]}
          onPress={() => setAbaAtiva("conexoes")}
        >
          <Text style={[styles.tabText, abaAtiva === "conexoes" && styles.tabTextActive]}>Conexões ({conexoesComuns.length})</Text>
        </Pressable>
      </View>

      {abaAtiva === "newsletters" ? renderNewsletters() : renderConexoes()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F3F7" },
  
  tabs: { 
    flexDirection: "row", 
    justifyContent: "center", 
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderBottomWidth: 1, 
    borderBottomColor: "#E5E7EB", 
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  tabButton: { 
    flex: 1, 
    paddingVertical: 12,
  },
  tabActive: { 
    borderBottomColor: "#2081C4", 
    borderBottomWidth: 3, 
  },
  tabText: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: "#6B7280", 
    textAlign: "center" 
  },
  tabTextActive: { 
    color: "#2081C4", 
    fontWeight: "800" 
  },

  listContainer: { paddingVertical: 10, paddingHorizontal: 16 },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  cardText: { 
    fontSize: 17, 
    color: "#1F2937", 
    fontWeight: '700',
    flex: 1, 
  },
  cardSubText: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: '600',
  },
  
  cardFull: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2081C4',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 20,
    color: '#6B7280',
  },

  perfilScrollContent: { 
    paddingHorizontal: 16, 
    paddingVertical: 30,
    alignItems: 'center',
  },
  perfilContainer: { 
    width: "100%", 
    alignItems: "center",
    maxWidth: 600
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2081C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  perfilNome: { 
    fontSize: 28, 
    fontWeight: "800", 
    marginBottom: 4, 
    textAlign: "center",
    color: '#1F2937' 
  },
  perfilSub: { 
    fontSize: 16, 
    color: "#6B7280", 
    marginBottom: 20, 
    textAlign: "center" 
  },

  bioCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  perfilLabel: { 
    fontWeight: "700", 
    fontSize: 14, 
    marginBottom: 8,
    color: '#4B5563'
  },
  perfilText: { 
    fontSize: 16, 
    color: "#1F2937",
    lineHeight: 24,
  },
  
  habilidadesContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginTop: 5,
  },
  habilidadeBadge: { 
    backgroundColor: "#E0F2F1", 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 10, 
    marginRight: 8, 
    marginBottom: 8, 
    fontSize: 13, 
    color: '#004D40',
    fontWeight: '600'
  },

  voltarButton: { 
    marginTop: 30, 
    backgroundColor: "#2081C4", 
    paddingVertical: 14, 
    paddingHorizontal: 50, 
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  voltarText: { 
    color: "#fff", 
    fontWeight: "800", 
    fontSize: 16, 
    textAlign: "center" 
  },
});
