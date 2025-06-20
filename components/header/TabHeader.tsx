import { Image } from "expo-image";
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { DiziLogoRound } from "@/constants/Assets";
import { CurrencyDisplay } from "@/components/header/CurrencyDisplay";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

export function TabHeader({
  options: { headerStyle },
}: Readonly<BottomTabHeaderProps>) {
  return (
    <View style={[styles.container, headerStyle as StyleProp<ViewStyle>]}>
      <View style={styles.logoContainer}>
        <Image
          source={DiziLogoRound}
          contentFit="contain"
          accessibilityLabel="Dizi's round Logo"
          style={{ height: 50, width: 50 }}
        />
        <Text style={styles.logoText}>Dizi</Text>
      </View>
      <CurrencyDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    minHeight: 50,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});
