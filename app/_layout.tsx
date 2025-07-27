import GraphQlMocks from "@/mocks/graphql/index";
import { ApolloMockProvider } from "@/components/provider/ApolloProvider/ApolloMockProvider";
import RootStack from "@/components/stacks/RootStack";
import { UserDetailsMock } from "../mocks/graphql/UserDetails.mock";
import { ApolloMockType } from "../mocks/graphql/constants";
import { DILEMMA_QUERY } from "../components/DilemmaContainer/DilemmaContainer";

const createDilemmaMock = () => ({
  request: {
    query: DILEMMA_QUERY,
  },

  result: {
    data: {
      dilemma: {
        title: "Should I visit this place?",
        votes: Math.floor(Math.random() * 200),
        postedBefore: {
          timestamp: new Date().toISOString(),
        },
        assets: [
          {
            id: `asset-${Math.random().toString(36).substring(2, 9)}`,
            url: "https://example.com/images/dilemma.jpg",
            accessibilityLabel: "Image for dilemma",
            blurhash: "",
          },
        ],
      },
    },
  },
});


const userDetailsMockInstance = new UserDetailsMock(ApolloMockType.TEST);

const mocks = [
  ...Array.from({ length: 10 }, () => createDilemmaMock()),
  ...userDetailsMockInstance.toArray(),
];

export default function RootLayout() {
  return (
    <ApolloMockProvider mocks={GraphQlMocks}>
      <RootStack />
    </ApolloMockProvider>
  );
}