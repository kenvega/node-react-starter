import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?:
    | "default"
    | "sm"
    | "lg"
    | "xl"
    | "sm-icon"
    | "icon"
    | "lg-icon"
    | "xl-icon";
  asChild?: boolean;
}

const variants = {
  default:
    "bg-primary-background text-primary-foreground hover:bg-primary-background-hover",
  secondary:
    "bg-secondary-background text-secondary-foreground hover:bg-secondary-background-hover",
  outline:
    "border border-border bg-background text-muted-foreground hover:bg-muted-background",
  ghost: "bg-transparent text-muted-foreground hover:bg-muted-background",
} as const;

const sizes = {
  default: "h-8 rounded-lg px-2.5 py-1.5 text-sm [&_svg]:size-4",
  sm: "h-6 rounded-md px-2 py-1 text-sm [&_svg]:size-4",
  lg: "h-10 rounded-lg px-3.5 py-2.5 text-sm [&_svg]:size-4",
  xl: "h-12 rounded-lg px-8 py-3 text-base [&_svg]:size-5",
  "sm-icon": "size-7 rounded-lg text-sm [&_svg]:size-5",
  icon: "size-8 rounded-lg text-sm [&_svg]:size-5",
  "lg-icon": "size-9 rounded-lg text-sm [&_svg]:size-5",
  "xl-icon": "size-10 rounded-lg text-sm [&_svg]:size-6",
} as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
