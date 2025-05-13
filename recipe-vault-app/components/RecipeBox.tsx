import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type RecipeProps = {
  id: number;
  title: string;
  duration: number;
  ingredients: string[];
};

export default function RecipeBox({ id, title, duration, ingredients }: RecipeProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="border rounded-lg p-4 bg-white shadow-md"
    //   onPress={() => navigation.navigate("RecipeDetails", { id })} // Navigue vers la page des détails de la recette
    >
      <Text className="text-xl font-bold text-gray-800">{title}</Text>
      <Text className="text-gray-600">Duration: {duration} minutes</Text>
      <Text className="mt-2 font-semibold text-gray-700">Ingredients:</Text>
      <View className="list-disc list-inside text-gray-600">
        {ingredients.map((ingredient, index) => (
          <Text key={index} className="text-gray-600">
            • {ingredient}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}