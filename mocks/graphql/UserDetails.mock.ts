import { GET_USER_DETAILS } from "@/components/dilemma/DilemmaContainer";
import { randomNumber } from "@/mocks/graphql/helpers/numberHelper";
import type { MockedResponse } from "@apollo/client/testing";
import type { UserDetailsQuery } from "@/graphql/__generated__/types";

export const UserDetailsMocks: MockedResponse<UserDetailsQuery>[] = [
  {
    request: {
      query: GET_USER_DETAILS,
    },
    result: {
      data: {
        userDetails: {
          __typename: "UserDetails",
          inAppCurrency: randomNumber(10_000),
        },
      },
    },
  },
];
