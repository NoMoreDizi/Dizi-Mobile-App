import type { ImageProps } from "expo-image";

export function DiziLogoRound() {
  return requireImageSource("../assets/images/app/logo/DiziLogoRound.png");
}

function requireImageSource(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(path) as ImageProps["source"];
}
