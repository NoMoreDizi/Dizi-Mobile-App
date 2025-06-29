import GraphQlMocks from "@/mocks/graphql/index";
import { ApolloMockProvider } from "@/components/provider/ApolloProvider/ApolloMockProvider";
import RootStack from "@/components/stacks/RootStack";

export default function RootLayout() {
  return (
    <ApolloMockProvider mocks={GraphQlMocks}>
      <RootStack />
    </ApolloMockProvider>
  );
}
