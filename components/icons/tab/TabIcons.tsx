import { Ionicons } from "@expo/vector-icons";
import { type ComponentProps } from "react";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export function HomeIcon({ size, color }: TabBarIconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

export function SearchIcon({ size, color }: TabBarIconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

export function UploadIcon({ size, color }: TabBarIconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

export function ShopIcon({ size, color }: TabBarIconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

export function ProfileIcon({ size, color }: TabBarIconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

type TabBarIconProps = Readonly<
  ComponentProps<Exclude<BottomTabNavigationOptions["tabBarIcon"], undefined>>
>;
