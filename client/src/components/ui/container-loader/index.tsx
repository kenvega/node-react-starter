import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

interface ContainerLoaderProps {
  className?: string;
}

export function ContainerLoader({ className }: ContainerLoaderProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-1 items-center justify-center",
        className
      )}
    >
      <Loader className="size-8 animate-spin" aria-label="Cargando" />
    </div>
  );
}
