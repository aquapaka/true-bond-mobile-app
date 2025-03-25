import { counselorApi } from "@/src/api/counselorApi";
import { TruebondLightTheme } from "@/src/theme/theme";
import { Counselor } from "@/src/types/Counselor";
import { formatShortDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Badge,
  Button,
  Chip,
  Divider,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

export default function DetailProfile() {
  const { id }: { id: string } = useLocalSearchParams();
  const [counselor, setCounselor] = useState<Counselor | null>(null);
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchcounselor = async () => {
      try {
        const result = await counselorApi.getCounselor(id);
        setCounselor(result);
      } catch (error) {
        showNotification("error", "error!", String(error));
      }
    };
    fetchcounselor();
  }, []);

  const handleApprove = async () => {
    if (!counselor) return;

    try {
      const response = await counselorApi.approveCounselor(counselor.id);

      showNotification(
        "success",
        "Approved successfully!",
        `${counselor.name} is now a counselor`,
      );
      router.back();
    } catch (error) {
      showNotification("error", "error!", String(error));
    }
  };

  const handleDecline = async () => {
    if (!counselor) return;

    try {
      const response = await counselorApi.declineCounselor(counselor.id);

      showNotification(
        "success",
        "Declined successfully!",
        `${counselor.name} application has been declined`,
      );
      router.back();
    } catch (error) {
      showNotification("error", "error!", String(error));
    }
  };

  if (!counselor) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Surface
        style={{ padding: 12, borderRadius: 12, gap: 16, marginBottom: 120 }}
      >
        <View style={styles.header}>
          <View style={{ flex: 3 }}>
            <Image
              source={{ uri: counselor?.profileImage }}
              style={[styles.image, { backgroundColor: theme.colors.primary }]}
            />
          </View>
          <View>
            <Text variant="titleLarge">{counselor.name} application</Text>
            <Text variant="bodyMedium">
              Applied on: {formatShortDate(counselor?.createdAt)}
            </Text>
            <Text variant="bodyMedium">Name: {counselor?.name}</Text>
            {/* <Text variant="bodyMedium">DoB: {counselor?.dateOfBirth}</Text> */}
            <Text variant="bodyMedium">Gender: {counselor?.gender}</Text>
            <Text variant="bodyMedium">Email: {counselor?.email}</Text>
            <Text variant="bodyMedium">Phone: {counselor?.phone}</Text>
            <Text variant="bodyMedium">
              Relationship: {counselor?.relationshipStatus}
            </Text>
          </View>
        </View>

        <Divider />

        <View>
          <Text variant="titleMedium">Detail Information</Text>
          <Text>Bio: {counselor.bio}</Text>
          <Text>Expertise: {counselor.expertise}</Text>
          <Text>Experience: {counselor.experienceYears} years</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text>Application Status:</Text>
            <Badge
              style={{
                backgroundColor:
                  counselor.status === "approved"
                    ? TruebondLightTheme.colors.success
                    : counselor.status === "applying"
                      ? TruebondLightTheme.colors.warning
                      : TruebondLightTheme.colors.error,
                paddingHorizontal: 12,
              }}
            >
              {counselor.status}
            </Badge>
          </View>
          <Text>Certificate:</Text>
          <Image
            source={{ uri: counselor.certificateImageUrl }}
            style={{
              width: "100%",
              minHeight: 240,
              objectFit: "cover",
            }}
          />
        </View>

        <Divider />

        <View>
          <Text variant="titleMedium">Session apply information</Text>
          <Text>Applying price per session: {counselor.sessionPrice}$</Text>
          <Text>Applying Time Slots:</Text>
          <View
            style={{
              gap: 4,
              marginTop: 8,
            }}
          >
            {counselor.availability.length > 0 ? (
              counselor.availability.map((slot, index) => (
                <Surface
                  elevation={2}
                  mode="flat"
                  key={index}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text style={styles.day}>{slot.day}:</Text>
                  {slot.slots.length > 0 ? (
                    <View style={styles.slotList}>
                      {slot.slots.map((time, i) => (
                        <Chip key={time}>{time}</Chip>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.noSlot}>No slots available</Text>
                  )}
                </Surface>
              ))
            ) : (
              <Text style={styles.noSlot}>No availability set</Text>
            )}
          </View>
        </View>

        {counselor.status !== "approved" && counselor.status !== "declined" && (
          <>
            <Divider />

            <View style={styles.buttonContainer}>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.errorContainer,
                }}
                onPress={() => handleDecline()}
              >
                Decline
              </Button>
              <Button
                mode="contained"
                style={{
                  flex: 1,
                  backgroundColor: TruebondLightTheme.colors.success,
                }}
                onPress={() => handleApprove()}
              >
                Approve
              </Button>
            </View>
          </>
        )}
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#007bff",
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#555",
  },
  rating: {
    fontSize: 14,
    color: "#ffa500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  availabilityContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 5,
  },
  day: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  slotList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    gap: 4,
  },
  slot: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  noSlot: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
