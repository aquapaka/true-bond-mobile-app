import { sessionApi } from "@/src/api/sessionApi";
import CounselorSessionCard from "@/src/components/tab-specific/counselor-sessions/CounselorSessionCard";
import { useAuth } from "@/src/context/AuthProvider";
import { SessionWithClient } from "@/src/types/Session";
import { showNotification } from "@/src/utils/notificationUtils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Surface, Text } from "react-native-paper";

export default function CounselorSessionsScreen() {
  const { userData } = useAuth();
  const [sessions, setSessions] = useState<SessionWithClient[] | null>(null);
  const upcomingSessions = sessions
    ? sessions.filter((session) => session.status === "confirmed")
    : [];
  const completedSessions = sessions
    ? sessions.filter((session) => session.status === "completed")
    : [];
  const pendingSessions = sessions
    ? sessions.filter((session) => session.status === "pending")
    : [];

  useFocusEffect(
    useCallback(() => {
      if (!userData) return;

      const fetchData = async () => {
        try {
          const result =
            await sessionApi.getAllSessionsWithUserDataByCounselorId(
              userData.id
            );
          setSessions(result);
        } catch (error) {
          showNotification("error", "Error!", String(error));
        }
      };

      fetchData();
    }, [userData])
  );

  if (!sessions)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 12 }}>
        {/*  */}
        <Surface
          style={{
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Text variant="titleSmall">Upcoming sessions</Text>
          {upcomingSessions.length ? (
            upcomingSessions.map((session) => (
              <CounselorSessionCard key={session.id} session={session} />
            ))
          ) : (
            <View style={{ marginVertical: 16, alignItems: "center" }}>
              <Text variant={"labelSmall"} style={{ textAlign: "center" }}>
                No session
              </Text>
              <Icon name="ghost-outline" style={{ marginTop: 4 }} />
            </View>
          )}
        </Surface>
        {/*  */}
        <Surface
          style={{
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Text variant="titleSmall">Waiting for approve sessions</Text>
          {pendingSessions.length ? (
            pendingSessions.map((session) => (
              <CounselorSessionCard key={session.id} session={session} />
            ))
          ) : (
            <View style={{ marginVertical: 16, alignItems: "center" }}>
              <Text variant={"labelSmall"} style={{ textAlign: "center" }}>
                No session
              </Text>
              <Icon name="ghost-outline" style={{ marginTop: 4 }} />
            </View>
          )}
        </Surface>
        {/*  */}
        <Surface
          style={{
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Text variant="titleSmall">Completed sessions</Text>
          {completedSessions.length ? (
            completedSessions.map((session) => (
              <CounselorSessionCard key={session.id} session={session} />
            ))
          ) : (
            <View style={{ marginVertical: 16, alignItems: "center" }}>
              <Text variant={"labelSmall"} style={{ textAlign: "center" }}>
                No session
              </Text>
              <Icon name="ghost-outline" style={{ marginTop: 4 }} />
            </View>
          )}
        </Surface>
      </View>
    </ScrollView>
  );
}
