import { HapticTab } from "@/src/components/HapticTab";
import { useAuth } from "@/src/context/AuthProvider";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { user, loading, userData, signOut } = useAuth();
  const currentPath = usePathname();

  useEffect(() => {
    // // TODO: apply authentication
    console.log("🛠 TabLayout useAuth() Update → User:", user);
    if (user === undefined) return; // Prevent early unnecessary execution
    if (!user) {
      if (!currentPath.startsWith("/(auth)")) {
        console.log("🚪 Redirecting to login...");
        setTimeout(() => {
          router.replace("/(auth)/login");
        }, 1);
      }
    } else {
      if (!currentPath.startsWith("/(tabs)")) {
        console.log("🏠 Redirecting to home...");
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 1);
      }
    }
  }, [user]);

  if (loading || !user || !userData || !userData) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
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
          href: userData?.role === "client" ? "/client-sessions" : null,
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
          href: userData?.role === "counselor" ? "/counselor-sessions" : null,
        }}
      />
      <Tabs.Screen
        name="client-learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-page-variant" size={size} color={color} />
          ),
          href: "/client-learn",
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
          href: userData?.role === "admin" ? "/(tabs)/admin-dashboard" : null,
        }}
      />
      <Tabs.Screen
        name="admin-management"
        options={{
          title: "Management",
          tabBarIcon: ({ color, size }) => (
            <Icon name="folder-cog" size={size} color={color} />
          ),
          href: userData?.role === "admin" ? "/admin-management" : null,
        }}
      />
      <Tabs.Screen
        name="admin-approvals"
        options={{
          title: "Approvals",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-multiple-check" size={size} color={color} />
          ),
          href: userData?.role === "admin" ? "/admin-approvals" : null,
        }}
      />

      <Tabs.Screen
        name="user-profile"
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
