import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";

import styles from "./styles.module.css";

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
    <nav aria-label="Autenticación de usuario" className={styles["header-actions"]}>
      <ul className={styles["header-actions__list"]}>
        {user ? (
          <>
            <li className={styles["header-actions__item"]}>
              Bienvenido {user.email}
            </li>
            <li className={styles["header-actions__item"]}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
              >
                Cerrar sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            <li className={styles["header-actions__item"]}>
              <Link to="/login" className={styles["header-actions__link"]}>
                Iniciar sesión
              </Link>
            </li>
            <li className={styles["header-actions__item"]}>
              <Link to="/signup" className={styles["header-actions__link"]}>
                Crear una cuenta
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
