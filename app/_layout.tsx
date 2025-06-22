import { Stack } from "expo-router";
import GraphQlMocks from "@/mocks/graphql/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloMockProvider } from "@/components/Provider/ApolloProvider/ApolloMockProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ApolloMockProvider mocks={GraphQlMocks}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ApolloMockProvider>
    </SafeAreaProvider>
  );
}
