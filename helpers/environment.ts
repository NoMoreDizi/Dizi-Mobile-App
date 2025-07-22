import type { ProcessEnv } from "npm-run-path";

export function requireEnvVariable(v: string | undefined) {
  if (v === undefined) throw Error("Expo env variable required");
  return v;
}

export const ENVIRONMENT = {
  unsplashKey: requireEnvVariable(
    // NOTE: The following is required to prevent a EsLint Error in CI when `.env`-files are missing.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    process.env.EXPO_PUBLIC_UNSPLASH_KEY as ProcessEnv[keyof ProcessEnv],
  ),
} as const;
