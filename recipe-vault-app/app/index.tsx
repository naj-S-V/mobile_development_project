import React, { useState } from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRecipesByIngredients } from "./api/recipe"; // Import de la fonction getRecipesByIngredients

export default function Index() {
  const [ingredient, setIngredient] = useState(""); // État pour l'ingrédient en cours de saisie
  const [ingredients, setIngredients] = useState<string[]>([]); // État pour la liste des ingrédients
  const [recipes, setRecipes] = useState(null); // État pour stocker les recettes
  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]); // Ajoute l'ingrédient à la liste
      setIngredient(""); // Réinitialise le champ de saisie
    }
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipesByIngredients(ingredients); // Appel de la fonction getRecipesByIngredients
      setRecipes(data); // Stocke les données des recettes
    } catch (err) {
      setError(err.message); // Gère les erreurs
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {/* Champ de saisie */}
      <TextInput
        value={ingredient}
        onChangeText={setIngredient}
        placeholder="Enter an ingredient"
        className="border border-gray-300 rounded-lg p-2 mb-4 bg-white"
      />

      {/* Bouton pour ajouter l'ingrédient */}
      <TouchableOpacity
        onPress={addIngredient}
        className="bg-blue-500 rounded-lg p-3 mb-4"
      >
        <Text className="text-white text-center font-bold">Add Ingredient</Text>
      </TouchableOpacity>

      {/* Liste des ingrédients */}
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text className="text-gray-800 text-lg mb-2">• {item}</Text>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center">No ingredients added yet.</Text>
        }
      />

      {/* Bouton pour rechercher les recettes */}
      <TouchableOpacity
        onPress={fetchRecipes}
        className="bg-green-500 rounded-lg p-3 mt-4"
      >
        <Text className="text-white text-center font-bold">Search Recipes</Text>
      </TouchableOpacity>

      {/* Affichage des résultats */}
      {loading && <Text className="text-lg text-center mt-4">Loading...</Text>}
      {error && <Text className="text-red-500 text-center mt-4">Error: {error}</Text>}
      {recipes && (
        <ScrollView className="mt-4">
          <Text className="text-sm text-gray-800">
            {JSON.stringify(recipes, null, 2)}
          </Text>
        </ScrollView>
      )}
    </View>
  );
}