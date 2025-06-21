import { renderRouter } from "expo-router/testing-library";
import { screen } from "@testing-library/react-native";
import { setup } from "@testing-library/react-native/build/user-event/setup";
import RootLayout from "@/app/_layout";
import HomeScreen from "@/app/(tabs)";
import SearchScreen from "@/app/(tabs)/search";
import ShopScreen from "@/app/(tabs)/shop";
import UploadScreen from "@/app/(tabs)/upload";
import ProfileScreen from "@/app/(tabs)/profile";
import { TabBar } from "@/components/tabs/TabBar";

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
          _layout: RootLayout,
          "(tabs)/_layout": () => <TabBar />,
          "(tabs)/index": HomeScreen,
          "(tabs)/search": SearchScreen,
          "(tabs)/upload": UploadScreen,
          "(tabs)/shop": ShopScreen,
          "(tabs)/profile": ProfileScreen,
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
