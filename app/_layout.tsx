import GraphQlMocks from "@/mocks/graphql/index";
import { ApolloMockProvider } from "@/components/provider/ApolloProvider/ApolloMockProvider";
import RootStack from "@/components/stacks/RootStack";
import { gql } from "@apollo/client";

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

const USER_DETAILS_QUERY = gql`
  query UserDetails {
    userDetails {
      inAppCurrency
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

const userDetailsMock = {
  request: {
    query: USER_DETAILS_QUERY,
    variables: {},
  },
  result: {
    data: {
      userDetails: {
        inAppCurrency: 1000,
      },
    },
  },
  maxUsageCount: Number.POSITIVE_INFINITY,
};

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
        comments: [
          "Nice!",
          "Needs more options.",
        ],
      },
    },
  }),
};

const mocks = [
  ...Array.from({ length: 10 }, (_, i) => createDilemmaMock((i + 1).toString())),
  userDetailsMock,
  fallbackDilemmaMock,
];

export default function RootLayout() {
  return (
    <ApolloMockProvider mocks={GraphQlMocks}>
      <RootStack />
    </ApolloMockProvider>
  );
}
