import React, { useState } from "react";
import { ActivityIndicator, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ThirdNestedScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAddUser = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("isAdmin", isAdmin ? "true" : "false");

      const response = await fetch("http://localhost:3000/api/user/add-user", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to add user");
      }
      setSuccess("User added successfully!");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, backgroundColor: "#f3f4f6" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>Admin - Add User</Text>
      <View style={{ width: "100%", maxWidth: 400 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="User Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: "#d1d5db", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password (min. 8 characters)"
          secureTextEntry
          style={{ borderWidth: 1, borderColor: "#d1d5db", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Switch value={isAdmin} onValueChange={setIsAdmin} />
          <Text style={{ marginLeft: 8 }}>Is Admin</Text>
        </View>
        <TouchableOpacity
          onPress={handleAddUser}
          disabled={loading}
          style={{
            backgroundColor: "#16a34a",
            borderRadius: 8,
            padding: 14,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Add User</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator color="#2563eb" style={{ marginTop: 16 }} />}
        {error ? <Text style={{ color: "#dc2626", marginTop: 16 }}>{error}</Text> : null}
        {success ? <Text style={{ color: "#16a34a", marginTop: 16 }}>{success}</Text> : null}
      </View>
    </View>
  );
}
