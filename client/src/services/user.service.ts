import { API_URL } from "@/constants/index";
import { User } from "@/models/user.model";

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Error al obtener los usuarios");
  }

  return data.data as User[];
}

export async function updateUserRole(id: number, role: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/${id}/role`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Error al actualizar el rol");
  }

  return data.data as User;
}
