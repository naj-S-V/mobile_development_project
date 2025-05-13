import React, { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [ingredient, setIngredient] = useState(""); // État pour l'ingrédient en cours de saisie
  const [ingredients, setIngredients] = useState<string[]>([]); // État pour la liste des ingrédients

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]); // Ajoute l'ingrédient à la liste
      setIngredient(""); // Réinitialise le champ de saisie
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
    </View>
  );
}