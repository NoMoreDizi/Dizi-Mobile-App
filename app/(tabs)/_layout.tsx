import { Tabs } from "expo-router";
import {
  HomeIcon,
  ProfileIcon,
  SearchIcon,
  ShopIcon,
  UploadIcon,
} from "@/components/icons/tab/TabIcons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarIconStyle: { fontSize: 24 } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
          tabBarButtonTestID: "HomeTabButton",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: SearchIcon,
          tabBarLabel: "Search",
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
          tabBarIcon: UploadIcon,
          tabBarLabel: "Upload",
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ShopIcon,
          tabBarLabel: "Shop",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "You",
          tabBarIcon: ProfileIcon,
          tabBarLabel: "You",
        }}
      />
    </Tabs>
  );
}
