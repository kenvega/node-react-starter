import { Info, PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kudos-ui-sidebar-collapsed";

const navigation = [
  { to: "/", label: "User List", icon: Users, end: true },
  { to: "/about", label: "About", icon: Info, end: false },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const toggleLabel = collapsed ? "Expandir menú" : "Contraer menú";

  return (
    <aside
      className={cn(
        "shrink-0 border-r border-border transition-[width] duration-200",
        collapsed ? "w-14" : "w-56"
      )}
    >
      {/* Sticks below the h-12 header instead of scrolling away with the page. */}
      <div className="sticky top-12 flex max-h-[calc(100dvh-3rem)] flex-col gap-2 overflow-y-auto p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((value) => !value)}
          aria-expanded={!collapsed}
          aria-label={toggleLabel}
          title={toggleLabel}
          className={cn("shrink-0", collapsed ? "self-center" : "self-end")}
        >
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </Button>
        <nav aria-label="Navegación principal">
          <ul className="flex flex-col gap-1">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex h-9 items-center gap-3 rounded-lg px-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent-background",
                      collapsed && "justify-center",
                      isActive
                        ? "bg-accent-background text-accent-foreground"
                        : "text-muted-foreground"
                    )
                  }
                >
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                  <span className={cn(collapsed && "sr-only")}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
