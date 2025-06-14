import { gql } from "@/graphql/__generated__";

export const GET_USER_DETAILS = gql(`
  query UserDetails {
    userDetails {
      inAppCurrency
    }
  }
`);
