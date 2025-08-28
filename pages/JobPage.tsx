import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Job = {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  url: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [errorJobs, setErrorJobs] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    setErrorJobs(null);
    try {
      const response = await fetch("https://www.themuse.com/api/public/jobs?page=1", {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

      const data = await response.json();
      if (!data.results) throw new Error("Dados inválidos recebidos da API");

      const jobsMapped: Job[] = data.results.map((job: any, index: number) => ({
        id: index,
        title: job.name,
        company_name: job.company?.name || "Não informado",
        candidate_required_location: job.locations?.map((loc: any) => loc.name).join(", ") || "Remoto",
        url: job.refs?.landing_page || "",
      }));

      setJobs(jobsMapped);
    } catch (error: any) {
      console.error("Erro ao buscar vagas:", error);
      setErrorJobs("Não foi possível carregar vagas de emprego.");
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 80 }]}>
        {errorJobs && <Text style={styles.errorText}>{errorJobs}</Text>}
        {loadingJobs && <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 12 }} />}

        {jobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => job.url && Linking.openURL(job.url)}
          >
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.company_name}</Text>
            <Text style={styles.jobLocation}>{job.candidate_required_location}</Text>
            {job.url ? <Text style={styles.jobLink}>{job.url}</Text> : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { alignItems: "center", flexGrow: 1, padding: 16 },
  jobCard: {
    width: "100%",
    backgroundColor: "#e0f7f1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  jobTitle: { fontSize: 16, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  jobCompany: { fontSize: 14, color: "#1f2937", marginBottom: 2 },
  jobLocation: { fontSize: 14, color: "#475569", marginBottom: 2 },
  jobLink: { fontSize: 12, color: "#2563eb", textDecorationLine: "underline" },
  errorText: { color: "#EF4444", fontSize: 14, marginTop: 8, marginBottom: 8, textAlign: "center" },
});
