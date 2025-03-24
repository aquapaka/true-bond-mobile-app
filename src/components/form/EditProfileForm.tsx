import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z } from "zod";

import { useAuth } from "@/src/context/AuthProvider";
import { UserData } from "@/src/types/User";
import { showNotification } from "@/src/utils/notificationUtils";

import ImageUploader from "./custom/ImageUploader";

import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { router } from "expo-router";
registerTranslation("en-GB", enGB);

function parseFirestoreTimestamp(
  value?: { seconds: number; nanoseconds: number } | string | null
): Date {
  if (!value) return new Date();

  //  Firestore timestamp object
  if (
    typeof value === "object" &&
    "seconds" in value &&
    "nanoseconds" in value
  ) {
    return new Date(value.seconds * 1000 + value.nanoseconds / 1_000_000);
  }

  //  ISO string
  if (typeof value === "string") {
    try {
      const date = new Date(value);

      if (!isNaN(date.getTime())) {
        return date;
      }
    } catch (error) {
      console.error("Error parsing date string:", error);
    }
  }

  return new Date();
}

/**
 * Validation schema Zod.
 */
const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email format"),
  profileImage: z.string().optional(),
  phone: z.string().optional(),
  relationshipStatus: z.enum([
    "Single",
    "In a Relationship",
    "Engaged",
    "Married",
    "It's Complicated",
    "Prefer Not to Say",
  ]),
  dateOfBirth: z.date(),
  gender: z.enum(["Male", "Female", "Other"]),
});

type ProfileFormData = Omit<
  z.infer<typeof ProfileSchema>,
  "id" | "createdAt" | "updatedAt" | "role" | "counselorProfileId"
>;

export function EditProfileForm({ isEditing = true }: { isEditing?: boolean }) {
  const { userData, updateUser } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      profileImage: "",
      phone: "",
      relationshipStatus: "Prefer Not to Say",
      dateOfBirth: new Date(),
      gender: "Other",
    },
  });

  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name ?? "",
        email: userData.email ?? "",
        profileImage: userData.profileImage ?? "",
        phone: userData.phone ?? "",
        relationshipStatus: userData.relationshipStatus ?? "Prefer Not to Say",
        // Firestore Timestamp => Date:
        dateOfBirth: parseFirestoreTimestamp(userData.dateOfBirth),
        gender: userData.gender ?? "Other",
      });
    }
  }, [userData, reset]);

  // format Date => text
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Handle submit
  const onSubmit = async (formValues: ProfileFormData) => {
    try {
      setLoading(true);

      const updatedProfile: Partial<UserData> = {
        ...formValues,

        dateOfBirth: formValues.dateOfBirth,
        updatedAt: new Date().toISOString(),
      };

      console.log("Updated profile data:", updatedProfile);

      await updateUser(updatedProfile);

      setLoading(false);
      showNotification(
        "success",
        "Profile updated",
        "Your profile has been successfully updated."
      );
      router.back();
    } catch (error) {
      setLoading(false);
      showNotification("error", "Update failed", String(error));
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingBottom: 100 },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Surface
        style={[styles.surface, { backgroundColor: theme.colors.surface }]}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text
              variant="titleMedium"
              style={[styles.title, { color: theme.colors.primary }]}
            >
              {isEditing ? "Edit Profile" : "Create Profile"}
            </Text>
            <Text variant="bodySmall" style={{ marginBottom: 10 }}>
              ID: {userData?.id}
            </Text>
            <Text variant="labelLarge" style={{ marginBottom: 10 }}>
              Role: {userData?.role}
            </Text>

            {/* Profile Image */}
            <Text variant="labelLarge" style={{ marginTop: 10 }}>
              Profile Image
            </Text>
            <Controller
              control={control}
              name="profileImage"
              render={({ field: { onChange, onBlur, value } }) => (
                <ImageUploader
                  value={value || ""}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.profileImage}>
              {errors.profileImage?.message}
            </HelperText>

            {/* Name */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Name"
                  placeholder="Enter your name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  left={<TextInput.Icon icon="account" />}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.name}>
              {errors.name?.message}
            </HelperText>

            {/* Phone */}
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Phone"
                  placeholder="Enter your phone number"
                  value={value || ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.input}
                  left={<TextInput.Icon icon="phone" />}
                  keyboardType="phone-pad"
                />
              )}
            />
            <HelperText type="error" visible={!!errors.phone}>
              {errors.phone?.message}
            </HelperText>

            {/* Relationship Status */}
            <Text variant="labelLarge" style={{ marginTop: 10 }}>
              Relationship Status
            </Text>
            <Controller
              control={control}
              name="relationshipStatus"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.pickerContainer,
                    { borderColor: theme.colors.outline },
                  ]}
                >
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    itemStyle={{
                      backgroundColor: theme.colors.primaryContainer,
                      color: theme.colors.primary,
                      fontFamily: "Taviraj-Bold",
                      fontSize: 18,
                    }}
                  >
                    <Picker.Item label="Single" value="Single" />
                    <Picker.Item
                      label="In a Relationship"
                      value="In a Relationship"
                    />
                    <Picker.Item label="Engaged" value="Engaged" />
                    <Picker.Item label="Married" value="Married" />
                    <Picker.Item
                      label="It's Complicated"
                      value="It's Complicated"
                    />
                    <Picker.Item
                      label="Prefer Not to Say"
                      value="Prefer Not to Say"
                    />
                  </Picker>
                </View>
              )}
            />
            <HelperText type="error" visible={!!errors.relationshipStatus}>
              {errors.relationshipStatus?.message}
            </HelperText>

            {/* Date of Birth */}
            <Text variant="labelLarge" style={{ marginTop: 10 }}>
              Date of Birth
            </Text>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <>
                  <Button
                    mode="outlined"
                    onPress={() => setOpenDatePicker(true)}
                    style={{ marginTop: 5 }}
                    icon="calendar"
                  >
                    {formatDate(value)}
                  </Button>
                  <DatePickerModal
                    locale="en-GB"
                    mode="single"
                    visible={openDatePicker}
                    onDismiss={() => setOpenDatePicker(false)}
                    date={value}
                    onConfirm={({ date }) => {
                      setOpenDatePicker(false);
                      if (date) onChange(date);
                    }}
                    saveLabel="Confirm"
                    label="Select date of birth"
                    animationType="slide"
                    presentationStyle="pageSheet"
                    validRange={{
                      startDate: new Date(1900, 0, 1),
                      endDate: new Date(),
                    }}
                  />
                </>
              )}
            />
            <HelperText type="error" visible={!!errors.dateOfBirth}>
              {errors.dateOfBirth?.message}
            </HelperText>

            {/* Gender */}
            <Text variant="labelLarge" style={{ marginTop: 10 }}>
              Gender
            </Text>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.pickerContainer,
                    { borderColor: theme.colors.outline },
                  ]}
                >
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    itemStyle={{
                      backgroundColor: theme.colors.primaryContainer,
                      color: theme.colors.primary,
                      fontFamily: "Taviraj-Bold",
                      fontSize: 18,
                    }}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
              )}
            />
            <HelperText type="error" visible={!!errors.gender}>
              {errors.gender?.message}
            </HelperText>

            {/* Email  */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={value}
                  editable={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    { backgroundColor: theme.colors.surfaceDisabled },
                  ]}
                  left={<TextInput.Icon icon="email" />}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              style={[
                styles.submitButton,
                { backgroundColor: theme.colors.primary },
              ]}
              icon="content-save"
            >
              {isEditing ? "Update Profile" : "Create Profile"}
            </Button>
          </Card.Content>
        </Card>
      </Surface>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    margin: 10,
    borderRadius: 8,
    elevation: 1,
  },
  card: {
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
  },
  input: {
    marginTop: 5,
    marginBottom: 2,
  },
  pickerContainer: {
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 6,
  },
});

export default EditProfileForm;
