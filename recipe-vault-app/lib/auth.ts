import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const client = useQueryClient();
  const user = useQuery({
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/connection", {
        credentials: "include",
      });
      const data = await res.json();
      return data as { email: string; passeword: string, isAdmin: boolean };
    },
    queryKey: ["getUserConnected"],
  });

  const login = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/connection", {
        credentials: "include",
        method: "POST",
      });
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["getUserConnected"] });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/connection/logout", {
        credentials: "include",
        method: "POST",
      });
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["getUserConnected"] });
    },
  });
  return { user: user?.data, login: login.mutate, logout: logout.mutate };
}