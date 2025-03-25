import { sessionApi } from "@/src/api/sessionApi";
import { useAuth } from "@/src/context/AuthProvider";
import { SessionWithClient } from "@/src/types/Session";
import { formatDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Surface, Text, useTheme } from "react-native-paper";
import CounselorSessionCard from "../counselor-sessions/CounselorSessionCard";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LearningResource } from "@/src/types/LearningResource";
import { getCollection } from "@/src/lib/firestore";
import { getReadingTime } from "@/src/utils/generalUtils";

export default function CounselorHome() {
  const { userData } = useAuth();
  const [sessions, setSessions] = useState<SessionWithClient[] | null>(null);
  const upcomingSessions = sessions
    ? sessions.filter((session) => session.status === "confirmed")
    : [];
  const [learningResources, setLearningResources] = useState<
    LearningResource[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          await getCollection<LearningResource>("learningresources");
        setLearningResources(result);
      } catch (error) {
        showNotification("error", "Error!", String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  if (loading || !sessions || !learningResources) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ padding: 12, paddingBottom: 100, gap: 12 }}>
      <Surface style={{ padding: 12, borderRadius: 12, gap: 4 }}>
        {/*  */}
        <Text variant="headlineSmall">Welcome back, {userData?.name}</Text>
        <Text variant="labelMedium">
          Today is {formatDate(new Date()).split("at")[0]}
        </Text>
        <Text variant="titleMedium">Ready for your next session?</Text>
      </Surface>

      {/*  */}
      <Surface
        style={{
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Text variant="titleMedium">Upcoming sessions</Text>
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
        <Text variant="titleMedium">For you</Text>
        {learningResources.slice(0, 3).map((item) => (
          <>
            <Link href={`/(tabs)/client-learn/blog-detail/${item.id}`} asChild>
              <TouchableOpacity>
                <Surface
                  mode="flat"
                  style={{
                    borderRadius: 12,
                    flexDirection: "row",
                    padding: 12,
                    gap: 12,
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 90, height: 90, borderRadius: 6 }}
                  />
                  <View
                    style={{
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Text variant="headlineSmall">{item.title}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Image
                        source={{ uri: item.authorImageUrl }}
                        style={{ width: 24, height: 24, borderRadius: 100 }}
                      />
                      <Text variant="titleSmall" style={{ flex: 1 }}>
                        {item.author}
                      </Text>
                      <Text
                        variant="bodySmall"
                        style={{ color: theme.colors.tertiary }}
                      >
                        {getReadingTime(item.content)}
                      </Text>
                    </View>
                  </View>
                </Surface>
              </TouchableOpacity>
            </Link>
          </>
        ))}
      </Surface>
    </View>
  );
}
