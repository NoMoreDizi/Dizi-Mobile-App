import { UserDetailsMock } from "@/mocks/graphql/UserDetails.mock";
import { ApolloMockType } from "@/mocks/graphql/constants";

const mockType = ApolloMockType.UI;

export default [...new UserDetailsMock(mockType).asArray];
