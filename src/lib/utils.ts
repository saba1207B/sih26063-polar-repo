import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind classes with clsx.
 * Lightweight alternative to tailwind-merge for this project scope.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
