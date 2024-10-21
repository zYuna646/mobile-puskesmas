import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="guide"
        options={{
          title: "Guide",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="toothbrush-paste"
              size={24}
              color={focused ? "#699BF7" : "#262162"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="classification"
        options={{
          title: "Classification",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="tooth-outline"
              size={24}
              color={focused ? "#699BF7" : "#262162"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "#699BF7" : "#262162"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="education"
        options={{
          title: "Education",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="book"
              size={24}
              color={focused ? "#699BF7" : "#262162"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={focused ? "#699BF7" : "#262162"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="quiz" 
        options={{
          title: "Quiz",
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={focused ? "#699BF7" : "#262162"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
