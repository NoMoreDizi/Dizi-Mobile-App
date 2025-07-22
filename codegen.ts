import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // NOTE: This should be a URL once the Server is serving the schema
  schema: [
    "./graphql/schema/schema.graphql",
    "./graphql/schema/localSchema.graphql",
  ],
  documents: ["./**/*.ts?(x)"],
  // ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        useTypeImports: true,
      },
    },
    "./graphql/__generated__/apollo-helpers.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
};

export default config;
