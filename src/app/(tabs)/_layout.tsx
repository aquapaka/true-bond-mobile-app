import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { useAuth } from "@/src/context/AuthProvider";
import { UserRole } from "@/src/types/User";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { user, loading, userData, signOut } = useAuth();
  const [role, setRole] = useState<UserRole>("admin");
  const [firstTime, setFirstTime] = useState<boolean | null>(null); // used for onboarding showing
  const pathname = usePathname();
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    console.log("🛠 TabLayout useAuth() Update → User:", user?.email);

    setTrigger((prev) => prev + 1);

    if (!loading) {
      if (!user) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
