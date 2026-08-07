import { Container } from "@/components/ui";

import UsersList from "./components/users-list";

export default function Home() {
  return (
    <section className="flex-1 text-center">
      <Container className="max-w-4xl py-12">
        <h2 className="mb-4 text-4xl font-bold md:text-6xl">
          Lista de usuarios
        </h2>
        <p className="mb-8 text-xl text-muted-foreground">
          Lista de usuarios registrados.
        </p>
        <UsersList />
      </Container>
    </section>
  );
}
