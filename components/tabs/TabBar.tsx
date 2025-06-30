import { Tabs } from "expo-router";
import {
  HomeIcon,
  ProfileIcon,
  SearchIcon,
  ShopIcon,
  UploadIcon,
} from "../icons/tab/TabIcons";
import type { TabHeader } from "@/components/header/TabHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function TabBar({ header }: Readonly<{ header?: typeof TabHeader }>) {
  const { top } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: { fontSize: 24 },
        header,
        headerStyle: { paddingTop: top },
      }}
    >
      {/* NOTE: Using JSX.Components is not allowed here:*/}
      {HomeTab}
      {SearchTab}
      {UploadTab}
      {ShopTab}
      {ProfileTab}
    </Tabs>
  );
}

const HomeTab = (
  <Tabs.Screen
    name="index"
    options={{
      title: "Home",
      tabBarIcon: HomeIcon,
      tabBarLabel: "Home",
    }}
  />
);

export const SearchTab = (
  <Tabs.Screen
    name="search"
    options={{
      title: "Search",
      tabBarIcon: SearchIcon,
      tabBarLabel: "Search",
    }}
  />
);

export const UploadTab = (
  <Tabs.Screen
    name="upload"
    options={{
      tabBarIcon: UploadIcon,
      tabBarLabel: "Upload",
      title: "Upload",
    }}
  />
);

export const ShopTab = (
  <Tabs.Screen
    name="shop"
    options={{
      title: "Shop",
      tabBarIcon: ShopIcon,
      tabBarLabel: "Shop",
    }}
  />
);

export const ProfileTab = (
  <Tabs.Screen
    name="profile"
    options={{
      title: "You",
      tabBarIcon: ProfileIcon,
      tabBarLabel: "You",
    }}
  />
);
