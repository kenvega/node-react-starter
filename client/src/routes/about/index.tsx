import { Container } from "@/components/ui";

import styles from "./styles.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <Container className={styles.about__container}>
        <h2 className={styles.about__title}>About</h2>
        <p className={styles.about__text}>
          This is the about page.
        </p>
      </Container>
    </section>
  );
}
