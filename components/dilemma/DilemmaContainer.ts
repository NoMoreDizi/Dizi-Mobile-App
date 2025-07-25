import { gql } from "@/graphql/__generated__";

export const GET_DILEMMA = gql(`
  query Dilemma {
    dilemma {
      title
      ...DilemmaAssets
      votes
      postedBefore {
        timestamp
        duration @client {
            type
            amount
        }
      }
    }
  }
`);
