import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Chip, HelperText, Text, TextInput } from "react-native-paper";
import { z } from "zod";
import ImageUploader from "./custom/ImageUploader";
import { showNotification } from "@/src/utils/notificationUtils";
import { addDocument, updateDocument } from "@/src/lib/firestore";
import {
  BookingSlot,
  CounselorProfile,
  TimeSlot,
  Weekday,
} from "@/src/types/CounselorProfile";
import { updateCurrentUser } from "firebase/auth";
import { UserData } from "@/src/types/User";
import { useAuth } from "@/src/context/AuthProvider";
import { router } from "expo-router";

const weekdays: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const timeSlots: TimeSlot[] = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const CounselorProfileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  expertise: z.string().min(3, "Expertise is required."),
  experienceYears: z.coerce
    .number()
    .min(1, "Must have at least 1 year of experience."),
  sessionPrice: z.coerce.number().min(0, "Price must be a positive number."),
  certificateImageUrl: z.string().min(1, "Certificate is required."),
  availability: z.array(
    z.object({
      day: z.string(),
      slots: z
        .array(z.string())
        .min(1, "At least one time slot must be selected."),
    })
  ),
});

export type CounselorProfileFormData = Omit<
  z.infer<typeof CounselorProfileSchema>,
  "id" | "createdAt" | "updatedAt"
>;

const CounselorProfileForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CounselorProfileFormData>({
    resolver: zodResolver(CounselorProfileSchema),
    defaultValues: {
      bio: "",
      expertise: "",
      experienceYears: 1,
      sessionPrice: 2,
      certificateImageUrl: "",
      availability: [],
    },
  });
  const { userData } = useAuth();

  const [selectedDays, setSelectedDays] = useState<Record<string, string[]>>(
    {}
  );

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => {
      const updated = { ...prev };
      if (updated[day]) {
        delete updated[day]; // Deselect day
      } else {
        updated[day] = []; // Enable day with empty slots
      }
      return updated;
    });
  };

  const toggleTimeSlot = (day: string, slot: string) => {
    setSelectedDays((prev) => {
      const updated = { ...prev };
      if (!updated[day]) return updated;
      if (updated[day].includes(slot)) {
        updated[day] = updated[day].filter((s) => s !== slot);
      } else {
        updated[day] = [...updated[day], slot];
      }
      return updated;
    });
  };

  async function onSubmit(data: CounselorProfileFormData) {
    if (!userData) {
      showNotification("error", "Error!", "Userdata have not loaded");
      return;
    }

    try {
      const addedProfile = await addDocument<CounselorProfile>(
        "counselorProfiles",
        {
          ...data,
          userId: userData.id,
          availability: data.availability as BookingSlot[],
          rating: 5,
          status: "applying",
        }
      );

      // Update userdata counselorProfileId
      await updateDocument<UserData>("users", userData.id, {
        counselorProfileId: addedProfile.id,
      });

      // Reset form after successful
      if (addedProfile) {
        reset();
        showNotification(
          "success",
          "Your information has been sent!",
          "It will be process within 2 days"
        );
        router.back();
      }
    } catch (error) {
      showNotification("error", "Error!", String(error));
    }
  }

  return (
    <View>
      {/* Bio */}
      <Controller
        control={control}
        name="bio"
        render={({ field }) => (
          <TextInput
            label="Bio"
            mode="outlined"
            placeholder="Enter your bio..."
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.bio}>
        {errors.bio?.message}
      </HelperText>

      {/* Expertise */}
      <Controller
        control={control}
        name="expertise"
        render={({ field }) => (
          <TextInput
            label="Expertise"
            mode="outlined"
            placeholder="communication, financial... "
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.expertise}>
        {errors.expertise?.message}
      </HelperText>

      {/* Experience Years */}
      <Controller
        control={control}
        name="experienceYears"
        render={({ field }) => (
          <TextInput
            label="Experience (Years)"
            mode="outlined"
            keyboardType="numeric"
            onChangeText={(text) => field.onChange(Number(text))}
            value={String(field.value)}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.experienceYears}>
        {errors.experienceYears?.message}
      </HelperText>

      {/* Session Price */}
      <Controller
        control={control}
        name="sessionPrice"
        render={({ field }) => (
          <TextInput
            label="Session Price ($)"
            mode="outlined"
            keyboardType="numeric"
            onChangeText={(text) => field.onChange(Number(text))}
            value={String(field.value)}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.sessionPrice}>
        {errors.sessionPrice?.message}
      </HelperText>

      {/* Certificate Image */}
      <Text
        variant="labelMedium"
        style={{ fontWeight: "bold", marginBottom: 12 }}
      >
        Certificate Image
      </Text>
      <Controller
        control={control}
        name="certificateImageUrl"
        render={({ field }) => (
          <ImageUploader
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.certificateImageUrl}>
        {errors.certificateImageUrl?.message}
      </HelperText>

      {/* Availability Selector */}
      <Text
        variant="labelMedium"
        style={{ fontWeight: "bold", marginBottom: 12 }}
      >
        Availability
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {weekdays.map((day) => (
          <Chip
            key={day}
            selected={!!selectedDays[day]}
            onPress={() => toggleDay(day)}
            compact
          >
            {day}
          </Chip>
        ))}
      </View>

      {Object.keys(selectedDays).map((day) => (
        <View key={day} style={{ marginTop: 10 }}>
          <Text
            variant="labelSmall"
            style={{ fontWeight: "bold", marginBottom: 12 }}
          >
            {day} - Select Time Slots
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {timeSlots.map((slot) => (
              <Chip
                key={`${day}-${slot}`}
                selected={selectedDays[day]?.includes(slot)}
                onPress={() => toggleTimeSlot(day, slot)}
                compact
              >
                {slot}
              </Chip>
            ))}
          </View>
        </View>
      ))}

      {/* Submit */}
      <Button
        mode="contained"
        onPress={handleSubmit((data) =>
          onSubmit({
            ...data,
            availability: Object.entries(selectedDays).map(([day, slots]) => ({
              day,
              slots,
            })),
          })
        )}
        disabled={isSubmitting}
        style={{ marginTop: 20 }}
      >
        Apply using this Profile
      </Button>
    </View>
  );
};

export default CounselorProfileForm;
