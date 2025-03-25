import { adminApi } from "@/src/api/adminApi";
import { useAuth } from "@/src/context/AuthProvider";
import { TruebondLightTheme } from "@/src/theme/theme";
import { AdminStats } from "@/src/types/AdminStats";
import { formatDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Divider, Surface, Text } from "react-native-paper";

export default function AdminDashboardScreen() {
  const { userData } = useAuth();
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await adminApi.getAdminStats();
        setAdminStats(result);
      } catch (error) {
        showNotification("error", "Error", String(error));
      }
    };

    fetchData();
  }, []);

  if (!adminStats)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <ScrollView>
      <View style={{ padding: 12, paddingBottom: 100, gap: 12 }}>
        <Surface style={{ padding: 12, borderRadius: 12, gap: 16 }}>
          {/*  */}
          <View>
            <Text variant="headlineSmall">Welcome, {userData?.name}</Text>
            <Text variant="labelMedium">
              Today is {formatDate(new Date()).split("at")[0]}
            </Text>
          </View>
        </Surface>
        <Surface style={{ padding: 12, borderRadius: 12, gap: 8 }}>
          {/*  */}
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Icon name="speedometer" size={20} />
            <Text variant="titleMedium">Overview Stats</Text>
          </View>
          {/*  */}
          <Text variant="titleMedium">
            Total users:{" "}
            {adminStats.totalUsers.clients + adminStats.totalUsers.counselors}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text variant="labelMedium">Total clients</Text>
              <Text variant="headlineMedium">
                {adminStats.totalUsers.clients}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text variant="labelMedium">Total counselors</Text>
              <Text variant="headlineMedium">
                {adminStats.totalUsers.counselors}
              </Text>
            </View>
          </View>

          <Divider />
          {/*  */}
          <Text variant="titleMedium">
            Total sessions:{" "}
            {adminStats.totalSessions.pending +
              adminStats.totalSessions.scheduled +
              adminStats.totalSessions.completed}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                variant="labelSmall"
                style={{ color: TruebondLightTheme.colors.warning }}
              >
                Pending
              </Text>
              <Text
                variant="headlineSmall"
                style={{ color: TruebondLightTheme.colors.warning }}
              >
                {adminStats.totalSessions.pending}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text variant="labelSmall">Scheduled</Text>
              <Text variant="headlineSmall">
                {adminStats.totalSessions.scheduled}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                variant="labelSmall"
                style={{ color: TruebondLightTheme.colors.success }}
              >
                Completed
              </Text>
              <Text
                variant="headlineSmall"
                style={{ color: TruebondLightTheme.colors.success }}
              >
                {adminStats.totalSessions.completed}
              </Text>
            </View>
          </View>

          <Divider />
          {/*  */}
          <Text variant="titleMedium">
            Total counselor apply:{" "}
            {adminStats.totalCounselorProfiles.pendingCounselorProfiles +
              adminStats.totalCounselorProfiles.approvedCounselorProfiles +
              adminStats.totalCounselorProfiles.declinedCounselorProfiles}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                variant="labelSmall"
                style={{ color: TruebondLightTheme.colors.warning }}
              >
                Pending
              </Text>
              <Text
                variant="headlineSmall"
                style={{ color: TruebondLightTheme.colors.warning }}
              >
                {adminStats.totalCounselorProfiles.pendingCounselorProfiles}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                variant="labelSmall"
                style={{ color: TruebondLightTheme.colors.error }}
              >
                Declined
              </Text>
              <Text
                variant="headlineSmall"
                style={{ color: TruebondLightTheme.colors.error }}
              >
                {adminStats.totalCounselorProfiles.declinedCounselorProfiles}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                variant="labelSmall"
                style={{ color: TruebondLightTheme.colors.success }}
              >
                Approved
              </Text>
              <Text
                variant="headlineSmall"
                style={{ color: TruebondLightTheme.colors.success }}
              >
                {adminStats.totalCounselorProfiles.approvedCounselorProfiles}
              </Text>
            </View>
          </View>
        </Surface>

        {adminStats.totalCounselorProfiles.pendingCounselorProfiles > 0 && (
          <TouchableOpacity onPress={() => router.navigate('/(tabs)/admin-approvals')}>
            <Surface style={{ padding: 12, borderRadius: 12, gap: 4 }}>
            {/*  */}
            <Text variant="titleMedium">
                There are{" "}
                {adminStats.totalCounselorProfiles.pendingCounselorProfiles}{" "}
                pending counselor apply
              </Text>
              <Text variant="labelMedium" style={{color: TruebondLightTheme.colors.tertiary}}>
                Go check now ---
              </Text>
          </Surface>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
