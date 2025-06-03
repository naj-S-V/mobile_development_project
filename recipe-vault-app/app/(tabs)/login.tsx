import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const [loginValue, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async () => {
      const body = new FormData();
      body.append("email", loginValue);
      body.append("password", password);
      const response = await fetch("http://localhost:3000/api/connexion", {
        method: "POST",
        credentials: "include",
        body,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la connexion");
      }
    },
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Se connecter</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre login"
            value={loginValue}
            onChangeText={setLogin}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          title="Se connecter"
          onPress={() => login.mutate()}
          color="#3b82f6"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  form: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
});
