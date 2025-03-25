import { sessionApi } from "@/src/api/sessionApi";
import { ClientDetailProfile } from "@/src/components/tab-specific/counselor-sessions/ClientDetailProfile";
import { CounselorDetailProfile } from "@/src/components/tab-specific/schedule-counselor/CounselorDetailProfile";
import { TruebondLightTheme } from "@/src/theme/theme";
import { SessionWithClient, SessionWithCounselor } from "@/src/types/Session";
import { formatDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { isValidLink } from "@/src/utils/validationUtils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Badge,
  Button,
  Divider,
  HelperText,
  IconButton,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function SessionsDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionWithCounselor | null>(null);
  const theme = useTheme();

  async function handleConfirm() {
    if (!session) return;

    sessionApi.updateSession(session?.id, {
      status: "confirmed",
    });
    showNotification("success", "Confirm success", "");
  }

  async function handleCancel() {
    if (!session) return;

    sessionApi.updateSession(session?.id, {
      status: "canceled",
    });
    showNotification("success", "Cancel success", "");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sessionApi.getSessionWithCounselorById(
          id as string
        );
        setSession(result);
        console.log(result);

      } catch (error) {
        showNotification("error", "Error!", String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session || !session.counselor) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Can't find information about client</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ padding: 8, gap: 12, paddingBottom: 120 }}>
        {/*  */}
        <Surface style={{ padding: 12, borderRadius: 12, gap: 8 }}>
          {/*  */}
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Icon name="calendar" size={20} />
            <Text variant="titleMedium">Schedule</Text>
          </View>
          <Text variant="labelMedium">This session will begin at:</Text>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {formatDate(session.scheduledAt)}
          </Text>

          <Divider />

          {/*  */}
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Icon name="information-outline" size={20} />
            <Text variant="titleMedium">Details</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="labelMedium">Applied price for this session:</Text>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              ${session.sessionPrice}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="labelMedium">Status:</Text>
            <Badge
              style={{
                backgroundColor:
                  session.status === "confirmed" ||
                  session.status === "completed"
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

          <Divider />

          {/*  */}
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Icon name="video" size={20} />
            <Text variant="titleMedium">Meet Link</Text>
          </View>
          <Text variant="labelMedium">Google Meet link for this session:</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              {session.meetLink ? session.meetLink : "Set new meeting link..."}
            </Text>

            {session.meetLink && (
              <IconButton
                mode="contained"
                icon="paperclip"
                iconColor={theme.colors.primary}
                size={20}
                onPress={async () => {
                  await Clipboard.setStringAsync(session.meetLink);
                  showNotification(
                    "info",
                    "Meet link has been copied into clipboard",
                    ""
                  );
                }}
              />
            )}
          </View>
        </Surface>
        {/*  */}
        <CounselorDetailProfile counselor={session.counselor} />

      </View>
    </ScrollView>
  );
}
