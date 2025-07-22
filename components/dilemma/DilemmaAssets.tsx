import { gql } from "@/graphql/__generated__";

export const DILEMMA_ASSETS_FRAGMENT = gql(`
  fragment DilemmaAssets on Dilemma {
    assets {
      id
      url
      blurhash
      accessibilityLabel
    }
  }
`);
