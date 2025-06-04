import { useAuth } from "@/lib/auth"; // Assurez-vous que le chemin est correct
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Vérifie si le composant racine est monté avant de rediriger
    const timeout = setTimeout(() => {
      logout(); // Appelle la fonction logout
      router.replace("/login"); // Redirige l'utilisateur vers la page de connexion
    }, 0); // Exécute après le montage complet

    return () => clearTimeout(timeout); // Nettoie le timeout si le composant est démonté
  }, [logout, router]);

  return null; // Pas besoin d'afficher quoi que ce soit
}
