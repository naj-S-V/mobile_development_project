import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ThirdNestedScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRemoveUser = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch("http://localhost:3000/api/user/remove-user", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to remove user");
      }
      setSuccess("User removed successfully!");
      setEmail("");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, backgroundColor: "#f3f4f6" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>Admin - Remove User</Text>
      <View style={{ width: "100%", maxWidth: 400 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="User Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: "#d1d5db", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}
        />
        <TouchableOpacity
          onPress={handleRemoveUser}
          disabled={loading}
          style={{
            backgroundColor: "#dc2626",
            borderRadius: 8,
            padding: 14,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Remove User</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator color="#2563eb" style={{ marginTop: 16 }} />}
        {error ? <Text style={{ color: "#dc2626", marginTop: 16 }}>{error}</Text> : null}
        {success ? <Text style={{ color: "#16a34a", marginTop: 16 }}>{success}</Text> : null}
      </View>
    </View>
  );
}
