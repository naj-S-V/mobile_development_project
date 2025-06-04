import React, { useState } from "react";
import { ActivityIndicator, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ThirdNestedScreen() {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdateUser = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("newEmail", newEmail);
      formData.append("password", password);
      // ENVOI "on" ou "off" pour isAdmin
      formData.append("isAdmin", isAdmin ? "on" : "off");

      const response = await fetch("http://localhost:3000/api/user/update-user", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update user");
      }
      setSuccess("User updated successfully!");
      setEmail("");
      setNewEmail("");
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
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>Admin - Update User</Text>
      <View style={{ width: "100%", maxWidth: 400 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Current User Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: "#d1d5db", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}
        />
        <TextInput
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="New Email (optional)"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: "#d1d5db", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="New Password (optional)"
          secureTextEntry
          style={{ borderWidth: 1, borderColor: "#d1d5db", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Switch value={isAdmin} onValueChange={setIsAdmin} />
          <Text style={{ marginLeft: 8 }}>Is Admin</Text>
        </View>
        <TouchableOpacity
          onPress={handleUpdateUser}
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            borderRadius: 8,
            padding: 14,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Update User</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator color="#2563eb" style={{ marginTop: 16 }} />}
        {error ? <Text style={{ color: "#dc2626", marginTop: 16 }}>{error}</Text> : null}
        {success ? <Text style={{ color: "#16a34a", marginTop: 16 }}>{success}</Text> : null}
      </View>
    </View>
  );
}