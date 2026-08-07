import { Container } from "@/components/ui";

import UsersList from "./components/users-list";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <section className={styles.home}>
      <Container className={styles.home__container}>
        <h2 className={styles.home__title}>Lista de usuarios</h2>
        <p className={styles.home__text}>
          Lista de usuarios registrados.
        </p>
        <UsersList />
      </Container>
    </section>
  );
}
