import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";

export default function HeaderActions() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function onLogout() {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/login");
    }
  }

  return (
    <nav aria-label="Autenticación de usuario" className="flex items-center">
      <ul className="flex items-center gap-4 text-sm font-medium">
        {user ? (
          <>
            <li>Bienvenido {user.email}</li>
            <li>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Cerrar sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:underline hover:underline-offset-2">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline hover:underline-offset-2">
                Crear una cuenta
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
