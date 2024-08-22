import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ImageQuality, Quality } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageURL(image: Quality) {
  if (typeof image === "string") {
    return image;
  } else {
    return image[2].link;
  }
}

export function getCurrentYear() {
  const currectYear: number = new Date().getFullYear();
  return currectYear;
}
