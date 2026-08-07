import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

interface MainNavProps {
  items: {
    to: string;
    label: string;
  }[];
}

export default function MainNav({ items }: MainNavProps) {
  return (
    <nav
      aria-label="Navegación principal"
      className="static sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
    >
      <ul className="flex h-12 justify-center" role="menubar">
        {items.map((item) => (
          <li key={item.to} className="flex justify-center" role="none">
            <NavLink
              to={item.to}
              role="menuitem"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center justify-center p-3 text-sm font-medium transition-colors hover:bg-accent-background",
                  isActive ? "text-accent-foreground" : "text-muted-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
