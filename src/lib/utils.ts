import { ImageQuality, Quality } from "@/types";

export function getImageURL(image: Quality) {
  if (typeof image === "string") {
    return image;
  } else {
    return image[2].link;
  }
}
