import { Outlet, ScrollRestoration } from "react-router";

import { Container, Separator } from "@/components/ui";

import HeaderMain from "./components/header-main";
import styles from "./styles.module.css";

export default function Root() {
  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <HeaderMain />
      </header>
      <main className={styles.root__main}>
        <Outlet />
      </main>
      <footer className={styles.root__footer}>
        <Container>
          <Separator orientation="horizontal" decorative={true} />
          <small className={styles["root__footer-copyright"]}>
            Todos los derechos reservados © Kudos
          </small>
        </Container>
      </footer>
      <ScrollRestoration />
    </div>
  );
}
