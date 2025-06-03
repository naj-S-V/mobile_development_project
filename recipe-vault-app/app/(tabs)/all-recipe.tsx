import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getRecipes } from "../api/recipe"; // Import de la fonction getRecipes

export default function SecondScreen() {
  const [data, setData] = useState(null); // État pour stocker les données
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await getRecipes(); // Appel de la fonction getRecipes
        setData(recipes); // Stocke les données dans l'état
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