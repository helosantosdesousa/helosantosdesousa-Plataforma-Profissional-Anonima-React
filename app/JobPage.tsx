import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Job = {
  id: number;
  title: string;
  companyName: string;
  location: string;
  url: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

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
        companyName: job.company?.name || "Não informado",
        location: job.locations?.map((loc: any) => loc.name).join(", ") || "Remoto",
        url: job.refs?.landing_page || "",
      }));

      setJobs(jobsMapped);
    } catch (err: any) {
      console.error("Erro ao buscar vagas:", err);
      setError("Não foi possível carregar vagas de emprego.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openJobUrl = (url: string) => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error("Erro ao abrir link:", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 80 }]}>
        {loading && <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 16 }} />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {jobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => openJobUrl(job.url)}
            activeOpacity={0.8}
          >
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.companyName}</Text>
            <Text style={styles.jobLocation}>{job.location}</Text>
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
