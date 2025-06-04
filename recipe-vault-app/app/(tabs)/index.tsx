import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRecipesByIngredients } from "../api/recipe"; // Import de la fonction getRecipesByIngredients

export default function Index() {
  const [ingredient, setIngredient] = useState(""); // État pour l'ingrédient en cours de saisie
  const [ingredients, setIngredients] = useState<string[]>([]); // État pour la liste des ingrédients
  const [recipes, setRecipes] = useState(null); // État pour stocker les recettes
  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  const addIngredientAndFetchRecipes = async () => {
    if (ingredient.trim() !== "") {
      const updatedIngredients = [...ingredients, ingredient.trim()]; // Ajoute l'ingrédient à la liste
      setIngredients(updatedIngredients); // Met à jour la liste des ingrédients
      setIngredient(""); // Réinitialise le champ de saisie

      // Recherche des recettes avec les ingrédients mis à jour
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipesByIngredients(updatedIngredients); // Appel de la fonction getRecipesByIngredients
        setRecipes(data); // Stocke les données des recettes
      } catch (err) {
        setError(err.message || String(err)); // Gère les erreurs
      } finally {
        setLoading(false); // Arrête le chargement
      }
    }
  };

  const clearIngredients = () => {
    setIngredients([]); // Vide la liste des ingrédients
    setRecipes(null); // Réinitialise les recettes affichées
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

      {/* Bouton pour ajouter l'ingrédient et rechercher les recettes */}
      <TouchableOpacity
        onPress={addIngredientAndFetchRecipes}
        className="bg-blue-500 rounded-lg p-3 mb-4"
      >
        <Text className="text-white text-center font-bold">Add Ingredient & Search Recipes</Text>
      </TouchableOpacity>

      {/* Liste des ingrédients */}
      <View className="mb-4">
        {ingredients.length === 0 ? (
          <Text className="text-gray-500 text-center">No ingredients added yet.</Text>
        ) : (
          <>
            {ingredients.map((item, index) => (
              <Text key={index} className="text-gray-800 text-lg mb-2">• {item}</Text>
            ))}
            {/* Bouton pour supprimer tous les ingrédients */}
            <TouchableOpacity
              onPress={clearIngredients}
              className="bg-red-500 rounded-lg p-3 mt-4"
            >
              <Text className="text-white text-center font-bold">Clear All Ingredients</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Affichage des résultats */}
      {loading && <Text className="text-lg text-center mt-4">Loading...</Text>}
      {error && <Text className="text-red-500 text-center mt-4">Error: {error}</Text>}
      {recipes && (
        <ScrollView className="mt-4">
          {recipes.map((recipe) => (
            <View
              key={recipe.id}
              className="bg-white rounded-xl shadow-md p-4 mb-4"
            >
              <Text className="text-xl font-bold mb-1">{recipe.title}</Text>
              <Text className="text-gray-500 mb-2">
                ⏱️ {recipe.duration} min
              </Text>
              <Text className="font-semibold mb-1">Ingrédients :</Text>
              <View className="mb-2">
                {recipe.ingredients.map((ingredient) => (
                  <Text key={ingredient.id} className="text-gray-700 ml-2">
                    • {ingredient.name} : {ingredient.quantity} {ingredient.unit}
                  </Text>
                ))}
              </View>
              <Text className="font-semibold mb-1">Étapes :</Text>
              <View>
                {recipe.steps.map((step, idx) => (
                  <Text key={idx} className="text-gray-700 ml-2">
                    {idx + 1}. {step}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}