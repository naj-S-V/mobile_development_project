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