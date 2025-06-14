import { Stack } from "expo-router";
import { MockedProvider } from "@apollo/client/testing";
import GraphQlMocks from "@/mocks/graphql/index";

export default function RootLayout() {
  return (
    <MockedProvider mocks={GraphQlMocks}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      </Stack>
    </MockedProvider>
  );
}
