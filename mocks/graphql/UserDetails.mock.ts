import { randomNumber } from "@/mocks/graphql/helpers/numberHelper";
import type { MockedResponse } from "@apollo/client/testing";
import type { UserDetailsQuery } from "@/graphql/__generated__/types";
import { GET_USER_DETAILS } from "@/components/header/CurrencyDisplay";
import type { ApolloMockType } from "@/mocks/graphql/constants";
import type { GraphQlMock } from "@/mocks/graphql/GraphqlMock";

export class UserDetailsMock implements GraphQlMock {
  constructor(private readonly mockType: ApolloMockType) {}

  toArray() {
    return [this.createUserDetailsMock(randomNumber(10_000))];
  }

  createUserDetailsMock(currency: number): MockedResponse<UserDetailsQuery> {
    return {
      request: {
        query: GET_USER_DETAILS,
      },
      result: {
        data: {
          userDetails: {
            __typename: "UserDetails",
            inAppCurrency: currency,
          },
        },
      },
      delay: this.mockType,
      maxUsageCount: Number.POSITIVE_INFINITY,
    };
  }
}
