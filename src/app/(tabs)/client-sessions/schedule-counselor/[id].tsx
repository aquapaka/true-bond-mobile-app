import { counselorApi } from "@/src/api/counselorApi";
import { sessionApi } from "@/src/api/sessionApi";
import ScheduleDateSelector from "@/src/components/form/custom/ScheduleDateSelector";
import { CounselorDetailProfile } from "@/src/components/tab-specific/schedule-counselor/CounselorDetailProfile";
import { useAuth } from "@/src/context/AuthProvider";
import { Counselor } from "@/src/types/Counselor";
import { Session } from "@/src/types/Session";
import { formatDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  Divider,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

export default function SchedulateCounselorScreen() {
  const { id }: { id: string } = useLocalSearchParams();
  const { userData } = useAuth();
  const [counselor, setCounselor] = useState<Counselor | null>(null);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await counselorApi.getCounselor(id);
        setCounselor(result);
      } catch (error) {
        showNotification("error", "error!", String(error));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData || !counselor) return;

      try {
        const result = await sessionApi.getActiveSession(
          userData?.id,
          counselor?.id
        );
        setActiveSession(result);
      } catch (error) {
        showNotification("error", "error!", String(error));
      }
    };
    fetchData();
  }, [userData, counselor]);

  const handleBooking = async () => {
    if (!selectedDate || !counselor || !userData) return;

    try {
      const response = await sessionApi.createNewSession(
        userData.id,
        counselor.id,
        "",
        selectedDate,
        "note",
        counselor.sessionPrice
      );

      showNotification(
        "success",
        "Your schedule information has been sent!",
        `Waiting for ${counselor.name} to apply`
      );
      router.navigate("/(tabs)/client-sessions");
    } catch (error) {
      showNotification("error", "error!", String(error));
    }
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  if (!counselor || !userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ padding: 8, gap: 12 }}>
        <CounselorDetailProfile counselor={counselor} />

        <Surface
          style={{ padding: 12, borderRadius: 12, gap: 16, marginBottom: 120 }}
        >
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Icon name="calendar" size={20} />
            <Text variant="titleMedium">Schedule new session</Text>
          </View>
          {activeSession ? (
            <>
              <Text
                variant={"labelMedium"}
                style={{ textAlign: "center", marginTop: 16 }}
              >
                You're currently having a{" "}
                {activeSession.status === "pending" ? "pending" : "confirmed"}{" "}
                schedule at
              </Text>
              <Text
                variant={"labelLarge"}
                style={{
                  textAlign: "center",
                  marginBottom: 16,
                  color: theme.colors.primary,
                }}
              >
                {formatDate(activeSession.scheduledAt)}
              </Text>
            </>
          ) : (
            <>
              <Text variant={"bodySmall"}>
                Select a time slot to book, each session will last for 45
                minutes
              </Text>
              {counselor.availability ? (
                <>
                  <ScheduleDateSelector
                    availableSlots={counselor.availability}
                    onSelect={(date) => setSelectedDate(date)}
                  />
                  <Divider />
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <Icon name="cash-check" size={20} />
                    <Text variant="titleMedium">Payment details</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text variant="labelMedium">Session price</Text>
                    <Text variant="titleMedium">${counselor.sessionPrice}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text variant="labelMedium">Additional fee</Text>
                    <Text variant="titleMedium">${0}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text variant="titleMedium">Total</Text>
                    <Text variant="headlineMedium">
                      ${counselor.sessionPrice}
                    </Text>
                  </View>
                </>
              ) : (
                <Text
                  variant={"labelMedium"}
                  style={{ textAlign: "center", marginVertical: 32 }}
                >
                  This counselor currently doesn't have any available booking
                  slot
                </Text>
              )}
              <Button
                mode="contained"
                disabled={!selectedDate}
                onPress={() => handleBooking()}
                style={{ marginTop: 12 }}
              >
                Book
              </Button>
            </>
          )}
        </Surface>
      </View>
    </ScrollView>
  );
}
