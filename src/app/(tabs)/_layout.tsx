import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserRole } from "@/src/types/Role";

export default function TabLayout() {
  const [role, setRole] = useState<UserRole>("admin");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {/* Common Tabs for Clients & Counselors */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Cilent Tabs */}
      <Tabs.Screen
        name="client-sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color={color} />
          ),
          href: role === "client" ? "/client-sessions" : null,
        }}
      />
      <Tabs.Screen
        name="client-learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-page-variant" size={size} color={color} />
          ),
          href: role === "client" ? "/client-learn" : null,
        }}
      />

      {/* Counselor tabs */}
      <Tabs.Screen
        name="counselor-sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color={color} />
          ),
          href: role === "counselor" ? "/counselor-sessions" : null,
        }}
      />
      <Tabs.Screen
        name="counselor-clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-multiple" size={size} color={color} />
          ),
          href: role === "counselor" ? "/counselor-clients" : null,
        }}
      />

      {/* Admin tabs */}
      <Tabs.Screen
        name="admin-dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-analytics" size={size} color={color} />
          ),
          href: role === "admin" ? "/admin-dashboard" : null,
        }}
      />
      <Tabs.Screen
        name="admin-management"
        options={{
          title: "Management",
          tabBarIcon: ({ color, size }) => (
            <Icon name="folder-cog" size={size} color={color} />
          ),
          href: role === "admin" ? "/admin-management" : null,
        }}
      />
      <Tabs.Screen
        name="admin-approvals"
        options={{
          title: "Approvals",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-multiple-check" size={size} color={color} />
          ),
          href: role === "admin" ? "/admin-approvals" : null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
