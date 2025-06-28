import { Stack } from "expo-router";
import { MockedProvider } from "@apollo/client/testing";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { gql } from "@apollo/client";
import { UserDetailsMock } from "../mocks/graphql/UserDetails.mock";
import { ApolloMockType } from "../mocks/graphql/constants";

const DILEMMA_QUERY = gql`
  query GetDilemma($id: ID!) {
    dilemma(id: $id) {
      id
      question
      postedAt
      voteCount
      imageUrl
      comments
    }
  }
`;

interface GetDilemmaVariables {
  id: string;
}

const createDilemmaMock = (id: string) => ({
  request: {
    query: DILEMMA_QUERY,
    variables: { id },
  },
  result: {
    data: {
      dilemma: {
        id,
        question: `Dilemma #${id}: Should I visit this place?`,
        postedAt: new Date().toISOString(),
        voteCount: Math.floor(Math.random() * 200),
        imageUrl: "Switzerland",
        comments: [
          "Interesting question!",
          "I would choose Y.",
          "Hard to decide...",
        ],
      },
    },
  },
});

const userDetailsMockInstance = new UserDetailsMock(ApolloMockType.TEST);

const fallbackDilemmaMock = {
  request: {
    query: DILEMMA_QUERY,
  },
  variableMatcher: () => true,
  result: ({ variables }: { variables: GetDilemmaVariables }) => ({
    data: {
      dilemma: {
        id: variables.id,
        question: `Generic dilemma (ID: ${variables.id})`,
        postedAt: new Date().toISOString(),
        voteCount: Math.floor(Math.random() * 200),
        imageUrl: "Switzerland",
        comments: ["Nice!", "Needs more options."],
      },
    },
  }),
};

const mocks = [
  ...Array.from({ length: 10 }, (_, i) =>
    createDilemmaMock((i + 1).toString()),
  ),
  fallbackDilemmaMock,
  ...userDetailsMockInstance.asArray,
];

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MockedProvider
        mocks={mocks}
        defaultOptions={{
          watchQuery: { fetchPolicy: "cache-and-network" },
          query: { fetchPolicy: "cache-first" },
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </MockedProvider>
    </SafeAreaProvider>
  );
}
