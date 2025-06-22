import {
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { TabHeader } from "@/components/header/TabHeader";
import { UserDetailsMock } from "@/mocks/graphql/UserDetails.mock";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { ignoreFalseActWarning } from "@/helpers/jest";
import { ApolloMockType } from "@/mocks/graphql/constants";
import { ApolloMockProvider } from "@/components/Provider/ApolloProvider/ApolloMockProvider";

ignoreFalseActWarning();

describe("TabHeader", () => {
  const currencyAmount = 5000;
  const mock = new UserDetailsMock(ApolloMockType.TEST).createUserDetailsMock(
    currencyAmount,
  );

  it("renders the Dizi logo, name and swaps Loading indicator with Currency after Suspension", async () => {
    //GIVEN, WHEN
    const { findByLabelText, findByText, getByText } = render(
      <ApolloMockProvider mocks={[mock]}>
        <TabHeader
          {...({
            options: {
              headerStyle: { paddingTop: 10 },
            },
          } as unknown as BottomTabHeaderProps)}
        />
      </ApolloMockProvider>,
    );

    //THEN
    await waitForElementToBeRemoved(() => getByText("Loading..."));

    expect(await findByText("Dizi")).toBeVisible();
    expect(await findByLabelText("Dizi's round Logo")).toBeVisible();

    expect(await findByText("5000")).toBeVisible();
  });
});
