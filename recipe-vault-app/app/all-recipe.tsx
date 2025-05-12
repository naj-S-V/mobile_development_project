import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function SecondScreen() {
  const [data, setData] = useState(null); // État pour stocker les données
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    // Remplacez l'URL par celle de votre API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        const json = await response.json();
        setData(json); // Stocke les données dans l'état
      } catch (err) {
        setError(err); // Gère les erreurs
      } finally {
        setLoading(false); // Arrête le chargement
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center p-4">
      {loading && <Text className="text-lg">Loading...</Text>}
      {error && <Text className="text-red-500">Error: {error.message}</Text>}
      {data && (
        <ScrollView>
          <Text className="text-sm text-gray-800">
            {JSON.stringify(data, null, 2)}
          </Text>
        </ScrollView>
      )}
    </View>
  );
}