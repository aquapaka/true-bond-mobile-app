import { TruebondLightTheme } from "@/src/theme/theme";
import { SessionWithClient } from "@/src/types/Session";
import { formatDate, formatRelativeDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import { Badge, Button, Surface, Text, useTheme } from "react-native-paper";

export default function CounselorSessionCard({
  session,
}: {
  session: SessionWithClient;
}) {
  const theme = useTheme();

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate(
          // @ts-ignore
          `/(tabs)/counselor-sessions/session-details/${session.id}`,
        )
      }
    >
      <Surface
        mode="flat"
        elevation={2}
        style={{
          padding: 8,
          marginVertical: 4,
          borderRadius: 8,
          gap: 8,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="labelSmall" style={{ textTransform: "uppercase" }}>
            {formatDate(session.scheduledAt)}
          </Text>
          <Badge
            style={{
              backgroundColor:
                session.status === "confirmed" || session.status === "completed"
                  ? TruebondLightTheme.colors.success
                  : session.status === "pending"
                    ? TruebondLightTheme.colors.warning
                    : TruebondLightTheme.colors.error,
              paddingHorizontal: 12,
            }}
          >
            {session.status}
          </Badge>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Image
                width={36}
                height={36}
                style={{
                  backgroundColor: theme.colors.primaryContainer,
                  borderRadius: 100,
                  marginVertical: 4,
                }}
                source={{ uri: session.client?.profileImage }}
              />
              <Text variant="titleMedium">
                Meeting with client {session.client?.name}
              </Text>
            </View>
            <Text variant="labelSmall">
              {formatRelativeDate(session.scheduledAt)}
            </Text>
          </View>
          {session.status === "confirmed" && session.meetLink && (
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Button
                contentStyle={{ flexDirection: "row-reverse" }}
                icon={"google-podcast"}
                compact
                onPress={async () => {
                  const canOpen = await Linking.canOpenURL(session.meetLink);
                  if (canOpen) {
                    await Linking.openURL(session.meetLink);
                  } else {
                    showNotification(
                      "error",
                      "Error",
                      "Cannot open meet link URL",
                    );
                  }
                }}
              >
                JOIN
              </Button>
            </View>
          )}
        </View>
      </Surface>
    </TouchableOpacity>
  );
}
