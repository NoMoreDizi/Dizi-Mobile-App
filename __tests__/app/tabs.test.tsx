import { renderRouter } from "expo-router/testing-library";
import { screen } from "@testing-library/react-native";
import { setup } from "@testing-library/react-native/build/user-event/setup";
import { TabBar } from "@/components/tabs/TabBar";
import { ignoreZeroPaddingWarning } from "@/helpers/jest";
import RootStack from "@/components/stacks/RootStack";

ignoreZeroPaddingWarning();

describe("Bottom Navigation Bar", () => {
  it.each<[RegExp, string]>([
    [/Home/, "/"],
    [/Search/, "/search"],
    [/Upload/, "/upload"],
    [/Shop/, "/shop"],
    [/You/, "/profile"],
  ])(
    "when tab matching %s is pressed, navigates to the path %s",
    async (labelRegex, pathName) => {
      //GIVEN
      const { findByLabelText } = renderRouter(
        {
          _layout: RootStack,
          "(tabs)/_layout": () => <TabBar />,
          "(tabs)/index": () => null,
          "(tabs)/search": () => null,
          "(tabs)/upload": () => null,
          "(tabs)/shop": () => null,
          "(tabs)/profile": () => null,
        },
        { initialUrl: "(tabs)/" },
      );
      const user = setup();

      //WHEN
      await user.press(await findByLabelText(labelRegex));

      //THEN
      expect(screen).toHavePathname(pathName);
    },
  );
});
