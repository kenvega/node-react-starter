import { useEffect, useState } from "react";

import { ContainerLoader } from "@/components/ui";
import { User } from "@/models/user.model";
import * as userService from "@/services/user.service";

import styles from "./styles.module.css";

const dateFormatter = new Intl.DateTimeFormat("es", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((users) => setUsers(users))
      .catch((error) =>
        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener los usuarios"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ContainerLoader />;
  }

  if (error) {
    return <p className={styles["users-list__error"]}>{error}</p>;
  }

  if (users.length === 0) {
    return (
      <p className={styles["users-list__empty"]}>No hay usuarios registrados.</p>
    );
  }

  return (
    <ul className={styles["users-list"]}>
      {users.map((user) => (
        <li key={user.id} className={styles["users-list__item"]}>
          <div className={styles["users-list__info"]}>
            <span className={styles["users-list__email"]}>{user.email}</span>
            <span className={styles["users-list__date"]}>
              Registrado el {dateFormatter.format(new Date(user.createdAt))}
            </span>
          </div>
          <span className={styles["users-list__role"]}>{user.role}</span>
        </li>
      ))}
    </ul>
  );
}
