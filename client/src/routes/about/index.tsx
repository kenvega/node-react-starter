import { Container } from "@/components/ui";

export default function About() {
  return (
    <section className="flex-1 text-center">
      <Container className="max-w-4xl py-12">
        <h2 className="mb-4 text-4xl font-bold md:text-6xl">Acerca de</h2>
        <p className="mb-8 text-xl text-muted-foreground">
          Proyecto de inicio para aplicaciones web que combina Node.js y React
        </p>
      </Container>
    </section>
  );
}
