import manifest from "./activity-images.json";

/** A downloaded cover photo plus the credit its license requires. */
export type ActivityImage = {
  src: string;
  width: number;
  height: number;
  author: string;
  license: string;
  licenseUrl: string | null;
  sourceUrl: string;
};

const IMAGES: Record<string, ActivityImage> = manifest;

export function getActivityImage(id: string): ActivityImage | undefined {
  return IMAGES[id];
}
