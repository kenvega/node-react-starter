import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes so that a `className` passed by a caller always wins
 * over a component's own defaults (e.g. `max-w-4xl` overriding `max-w-7xl`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
