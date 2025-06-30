import { UserDetailsMock } from "@/mocks/graphql/UserDetails.mock";
import { DilemmaMock } from "@/mocks/graphql/Dilemma.mock";
import { ApolloMockType } from "@/mocks/graphql/constants";

const mockType = ApolloMockType.UI;

export default [
  ...new UserDetailsMock(mockType).toArray(),
  ...(await new DilemmaMock(mockType).toArray()),
];
