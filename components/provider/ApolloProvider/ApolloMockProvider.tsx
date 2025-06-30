import type { PropsWithChildren } from "react";
import type GraphQlMocks from "@/mocks/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { InMemoryCache } from "@apollo/client";
import TypePolicies from "@/constants/graphql/typePolicy";

export function ApolloMockProvider({
  mocks,
  children,
}: Readonly<PropsWithChildren<{ mocks: typeof GraphQlMocks }>>) {
  return (
    <MockedProvider
      mocks={mocks}
      cache={
        new InMemoryCache({
          typePolicies: TypePolicies,
        })
      }
    >
      {children}
    </MockedProvider>
  );
}
