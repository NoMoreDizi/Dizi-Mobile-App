import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { gql } from "@/graphql/__generated__";

export function CurrencyDisplay() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <CurrencyAmount />
      </Suspense>
      <Ionicons name="cash-outline" size={20} color="purple" />
    </View>
  );
}

function CurrencyAmount() {
  const {
    data: {
      userDetails: { inAppCurrency },
    },
  } = useSuspenseQuery(GET_USER_DETAILS);
  return <Text style={styles.amount}>{inAppCurrency}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  amount: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const GET_USER_DETAILS = gql(`
  query UserDetails {
    userDetails {
      inAppCurrency
    }
  }
`);
