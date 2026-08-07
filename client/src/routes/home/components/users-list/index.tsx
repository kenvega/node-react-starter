import { useEffect, useState } from "react";

import { ContainerLoader } from "@/components/ui";
import { User } from "@/models/user.model";
import * as userService from "@/services/user.service";

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
    return <p className="text-destructive">{error}</p>;
  }

  if (users.length === 0) {
    return <p className="text-muted-foreground">No hay usuarios registrados.</p>;
  }

  return (
    <ul className="flex flex-col gap-2 text-left">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3"
        >
          <div className="flex min-w-0 flex-col">
            <span className="font-medium [overflow-wrap:anywhere]">
              {user.email}
            </span>
            <span className="text-sm text-muted-foreground">
              Registrado el {dateFormatter.format(new Date(user.createdAt))}
            </span>
          </div>
          <span className="shrink-0 rounded-full bg-secondary-background px-3 py-1 text-xs leading-4 font-medium text-secondary-foreground capitalize">
            {user.role}
          </span>
        </li>
      ))}
    </ul>
  );
}
