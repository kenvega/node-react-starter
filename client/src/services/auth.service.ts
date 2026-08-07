import { API_URL } from "@/constants/index";
import { User } from "@/models/user.model";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/api/me`, {
      method: "GET",
      credentials: "include",
    });

    // if fetch response is not ok, return null (user is not authenticated or there was an error)
    // if fetch fails (status code not 200) res.ok will be false, and we can handle it by returning null, which indicates that there is no authenticated user
    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data) {
      throw new Error(data.error);
    }

    return data.data as User;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function login(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //allows to send cookies automatically
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.error) {
      throw new Error(data.error);
    }
  }

  const user: User = data.data;
  return user;
}

export async function signup(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password, confirmPassword: password }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.error) {
      throw new Error(data.error);
    }
  }

  const user: User = data.user;
  return user;
}

export async function logout(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include", // sends automatically sessionid on the header
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error when logging out:", error);
    throw error;
  }
}
