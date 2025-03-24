import { HapticTab } from "@/src/components/HapticTab";
import { useAuth } from "@/src/context/AuthProvider";
import { UserRole } from "@/src/types/User";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { user, loading, userData, signOut } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [firstTime, setFirstTime] = useState<boolean | null>(null); // used for onboarding showing
  const currentPath = usePathname();

  // Change this while development to show tab based on role, will be replaced by user.role after;
  const testRole: UserRole = "admin";

  useEffect(() => {
    // TODO: apply authentication
    // console.log("🛠 TabLayout useAuth() Update → User:", user);
    // if (user === undefined) return; // Prevent early unnecessary execution
    // setIsChecking(true); // Start checking
    // if (!user) {
    //   if (!currentPath.startsWith("/(auth)")) {
    //     console.log("🚪 Redirecting to login...");
    //     setTimeout(() => {
    //       router.replace("/(auth)/login");
    //       setIsChecking(false);
    //     }, 1);
    //   }
    // } else {
    //   if (!currentPath.startsWith("/(tabs)")) {
    //     console.log("🏠 Redirecting to home...");
    //     setTimeout(() => {
    //       router.replace("/(tabs)");
    //       setIsChecking(false);
    //     }, 1);
    //   }
    // }
  }, [user]);

  if (loading || !user || !userData) return null;

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
          href: true || testRole === "client" ? "/client-sessions" : null,
        }}
      />
      <Tabs.Screen
        name="client-learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-page-variant" size={size} color={color} />
          ),
          href: true || testRole === "client" ? "/client-learn" : null,
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
          href: true || testRole === "counselor" ? "/counselor-sessions" : null,
        }}
      />
      <Tabs.Screen
        name="counselor-clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-multiple" size={size} color={color} />
          ),
          href: true || testRole === "counselor" ? "/counselor-clients" : null,
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
          href: true || testRole === "admin" ? "/admin-dashboard" : null,
        }}
      />
      <Tabs.Screen
        name="admin-management"
        options={{
          title: "Management",
          tabBarIcon: ({ color, size }) => (
            <Icon name="folder-cog" size={size} color={color} />
          ),
          href: true || testRole === "admin" ? "/admin-management" : null,
        }}
      />
      <Tabs.Screen
        name="admin-approvals"
        options={{
          title: "Approvals",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-multiple-check" size={size} color={color} />
          ),
          href: true || testRole === "admin" ? "/admin-approvals" : null,
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
