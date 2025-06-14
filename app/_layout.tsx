import { Stack } from "expo-router";
import { MockedProvider } from "@apollo/client/testing";
import GraphQlMocks from "@/mocks/graphql/index";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MockedProvider mocks={GraphQlMocks}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </MockedProvider>
    </SafeAreaProvider>
  );
}
