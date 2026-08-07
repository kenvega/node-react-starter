import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Button, Container, InputField, Section } from "@/components/ui";
import { useAuth } from "@/contexts/auth.context";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <Container className="mx-auto max-w-sm">
        <h1 className="mb-10 text-center text-2xl leading-7 font-bold">
          Inicia sesión en tu cuenta
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            label="Correo electrónico"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
          <InputField
            label="Contraseña"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
          <Button size="lg" className="w-full" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </Button>
          {error && (
            <p className="mt-2 text-center text-sm text-destructive">{error}</p>
          )}
        </form>
        <div className="mt-10 flex justify-center gap-2 text-sm leading-6">
          <span className="text-muted-foreground">¿Aún no tienes cuenta?</span>
          <Link to="/signup" className="text-accent-foreground hover:underline">
            Crea una cuenta
          </Link>
        </div>
      </Container>
    </Section>
  );
}
