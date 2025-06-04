import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getRecipes } from "../api/recipe";

export default function SecondScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await getRecipes();
        setData(recipes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {loading && <Text className="text-lg">Loading...</Text>}
      {error && <Text className="text-red-500">Error: {error.message}</Text>}
      {data && (
        <ScrollView>
          {data.map((recipe) => (
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