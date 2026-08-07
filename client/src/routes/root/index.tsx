import { Outlet, ScrollRestoration } from "react-router";

import { Container, Separator } from "@/components/ui";

import HeaderMain from "./components/header-main";

export default function Root() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <HeaderMain />
      </header>
      <main className="flex flex-col [&>*]:flex [&>*]:flex-1 [&>*]:flex-col">
        <Outlet />
      </main>
      <footer className="border-t border-border">
        <Container>
          <Separator orientation="horizontal" decorative={true} />
          <small className="block py-6 text-center text-sm text-muted-foreground">
            Todos los derechos reservados © Kudos
          </small>
        </Container>
      </footer>
      <ScrollRestoration />
    </div>
  );
}
