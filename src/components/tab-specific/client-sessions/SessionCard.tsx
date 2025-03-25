import { useAuth } from "@/src/context/AuthProvider";
import { TruebondLightTheme } from "@/src/theme/theme";
import { Review } from "@/src/types/Review";
import { SessionWithCounselor } from "@/src/types/Session";
import { formatDate, formatRelativeDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import {
  Badge,
  Button,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { RatingSelector } from "../../form/custom/RatingSelector";
import { reviewApi } from "@/src/api/reviewApi";
import { sessionApi } from "@/src/api/sessionApi";
import { hasTimePassed } from "@/src/utils/generalUtils";

export default function SessionCard({
  session,
}: {
  session: SessionWithCounselor;
}) {
  const theme = useTheme();
  const { userData } = useAuth();
  const [review, setReview] = useState<Omit<Review, "id" | "createdAt">>({
    clientName: "Anonymous",
    clientProfileImage: "",
    counselorId: session.counselor?.id!,
    rating: 5,
    sessionId: session.id,
    comment: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  async function handleCompleteSession() {
    console.log(review);
    await reviewApi.addReview(review);
    await sessionApi.updateSession(session.id, { status: "completed" });
    showNotification("success", "Complete", "Thank you for your feedback");
    hideModal();
  }

  useEffect(() => {
    if (userData) {
      setReview((prev) => ({
        ...prev,
        clientName: userData.name,
        clientProfileImage: userData.profileImage,
      }));
    }
  }, [userData]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          // @ts-ignore
          `/(tabs)/client-sessions/session-details/${session.id}`
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
                source={{ uri: session.counselor?.profileImage }}
              />
              <Text variant="titleMedium" style={{}}>
                Meeting with Dr. {session.counselor?.name}
              </Text>
            </View>
            <Text variant="labelSmall" style={{}}>
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
                      "Cannot open meet link URL"
                    );
                  }
                }}
              >
                JOIN
              </Button>
            </View>
          )}
        </View>

        {/* Modal */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: theme.colors.surface,
              padding: 20,
              margin: 20,
              borderRadius: 12,
              gap: 12,
            }}
          >
            <Text variant="labelLarge" style={{ marginBottom: 8 }}>
              Write a review for {session.counselor?.name}
            </Text>
            <RatingSelector
              onChange={(rating) =>
                setReview((prev) => ({ ...prev, rating: rating }))
              }
              value={review.rating}
            />
            <TextInput
              label="Comment"
              multiline
              value={review.comment}
              mode="outlined"
              onChangeText={(text) =>
                setReview((prev) => ({ ...prev, comment: text }))
              }
            />
            <Button mode="contained" onPress={() => handleCompleteSession()}>
              Give review
            </Button>
          </Modal>
        </Portal>
        {session.status === "confirmed" &&
          hasTimePassed(session.scheduledAt) && (
            <View>
              <Button onPress={() => showModal()}>Mark as complete</Button>
            </View>
          )}
      </Surface>
    </TouchableOpacity>
  );
}
