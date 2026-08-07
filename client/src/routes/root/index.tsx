import { Outlet, ScrollRestoration } from "react-router";

import HeaderMain from "./components/header-main";

export default function Root() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <HeaderMain />
      </header>
      <main className="flex flex-col [&>*]:flex [&>*]:flex-1 [&>*]:flex-col">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
