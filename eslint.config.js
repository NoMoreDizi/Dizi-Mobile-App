// https://docs.expo.dev/guides/using-eslint/
import { fileURLToPath } from "node:url";
import expoConfig from "eslint-config-expo/flat.js";
import tseslint from "typescript-eslint";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended"; // Use this for combined Prettier config
import graphqlPlugin from "@graphql-eslint/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";

export default tseslint.config(
  // Base configuration that applies to all files by default
  expoConfig,

  // General Prettier integration (disables conflicting ESLint rules and adds prettier/prettier rule)
  prettierPluginRecommended,

  // Configuration specific to TypeScript files (.ts, .tsx)
  // These rules require type information.
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.strictTypeChecked, // Apply strict type checking rules
      tseslint.configs.stylisticTypeChecked, // Apply stylistic type checking rules
    ],
    languageOptions: {
      parserOptions: {
        projectService: true, // Enable project service for type information
        tsconfigRootDir: import.meta.dirname, // Set the root directory for tsconfig.json resolution
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },

  // Configuration specific to GraphQL files (.graphql)
  // These files are parsed by @graphql-eslint/parser and should not inherit TypeScript type-checking rules.
  {
    files: ["**/*.graphql"],
    languageOptions: {
      parser: graphqlPlugin.parser,
      parserOptions: {
        graphQLConfig: {
          schema: "./graphql/schema/schema.graphql", // Path to your GraphQL schema

          // NOTE: This could become relevant if using Fragments in separate Files: `documents: "./compontents/**/*.tsx"`,
          // Source: https://the-guild.dev/graphql/eslint/docs/usage#providing-operations
        },
      },
    },
    plugins: {
      "@graphql-eslint": graphqlPlugin, // Register the GraphQL ESLint plugin
    },
    rules: {
      ...graphqlPlugin.configs["schema-recommended"].rules,
      // Apply prettier formatting directly to GraphQL files
      "prettier/prettier": "error",
    },
  },

  // Disable Rules for test files (placed after the main TypeScript config to ensure override)
  {
    files: ["**/__tests__/**/*"],
    rules: {
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  // Ignore patterns (should be at the end of the config array)
  includeIgnoreFile(
    fileURLToPath(new URL(".gitignore", import.meta.url)),
    "Imported .gitignore patterns",
  ),
  {
    ignores: [
      "dist/*",
      "coverage/**",
      "eslint.config.js",
      "**/__generated__/*",
    ],
  },
);
