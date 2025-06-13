import { fireEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

describe("Bottom Navigation Bar", () => {
  it.each([/Home/, /Search/, /Upload/, /Shop/, /You/])(
    "renders navigation option matching %s",
    async (labelRegex: RegExp) => {
      //GIVEN
      const { findByLabelText } = renderRouter();

      //THEN
      expect(await findByLabelText(labelRegex)).toBeTruthy();
    },
  );

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
      const { findByLabelText } = renderRouter();

      //WHEN
      fireEvent.press(await findByLabelText(labelRegex));
      //THEN
      expect(screen).toHavePathname(pathName);
    },
  );
});
