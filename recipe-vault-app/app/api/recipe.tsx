export async function getRecipes() {
    try {
        const response = await fetch("http://localhost:3000/api/recipes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Retourne les données JSON des recettes
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error; // Relance l'erreur pour la gérer dans l'appelant
    }

}

export async function getRecipesByIngredients(ingredients: string[]) {
  try {
    const formData = new FormData();
    formData.append("ingredients", ingredients.join(", ")); // Ajoute les ingrédients séparés par des virgules

    const response = await fetch("http://localhost:3000/api/recipes/recipes-ingredients", {
      method: "POST",
      headers: {
        // Note : Pas besoin de "Content-Type" pour FormData, il est automatiquement défini
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Retourne les données JSON des recettes
  } catch (error) {
    console.error("Error fetching recipes by ingredients:", error);
    throw error; // Relance l'erreur pour la gérer dans l'appelant
  }
}