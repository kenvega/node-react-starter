import { useEffect, useState } from "react";

import { ContainerLoader, Option, Select } from "@/components/ui";
import { User } from "@/models/user.model";
import * as userService from "@/services/user.service";

const dateFormatter = new Intl.DateTimeFormat("es", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const roles = ["user", "admin"];

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [roleError, setRoleError] = useState<{
    id: number;
    message: string;
  } | null>(null);

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

  async function onRoleChange(id: number, role: string) {
    setPendingId(id);
    setRoleError(null);
    try {
      const updated = await userService.updateUserRole(id, role);
      setUsers((users) =>
        users.map((user) => (user.id === id ? updated : user))
      );
    } catch (error) {
      /*
        `users` is left untouched, so the controlled <select> re-renders back to
        the role the server still has.
      */
      setRoleError({
        id,
        message:
          error instanceof Error ? error.message : "Error al actualizar el rol",
      });
    } finally {
      setPendingId(null);
    }
  }

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
          className="flex flex-col gap-2 rounded-lg border border-border bg-background px-4 py-3"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-col">
              <span className="font-medium [overflow-wrap:anywhere]">
                {user.email}
              </span>
              <span className="text-sm text-muted-foreground">
                Registrado el {dateFormatter.format(new Date(user.createdAt))}
              </span>
            </div>
            <Select
              className="w-auto shrink-0 capitalize"
              aria-label={`Rol de ${user.email}`}
              value={user.role}
              disabled={pendingId === user.id}
              onChange={(event) => onRoleChange(user.id, event.target.value)}
            >
              {roles.map((role) => (
                <Option key={role} value={role} className="capitalize">
                  {role}
                </Option>
              ))}
            </Select>
          </div>
          {roleError?.id === user.id && (
            <p role="alert" className="text-sm text-destructive">
              {roleError.message}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
