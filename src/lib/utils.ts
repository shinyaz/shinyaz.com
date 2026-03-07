import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReadingTime(minutes: number, locale: "ja" | "en"): string {
  return locale === "ja" ? `約${minutes}分` : `${minutes} min read`;
}

export function formatDate(date: string, locale: "ja" | "en" = "ja"): string {
  return new Date(date).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
