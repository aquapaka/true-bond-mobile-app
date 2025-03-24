import { useAuth } from "@/src/context/AuthProvider";
import { updateDocument } from "@/src/lib/firestore";
import { UserData } from "@/src/types/User";
import { showNotification } from "@/src/utils/notificationUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { date, z } from "zod";
import ImageUploader from "./custom/ImageUploader";
import DatePicker from "react-native-date-picker";

// Validation schema for user profile
// TODO: Validate those data properly
const ProfileSchema = z.object({
  name: z.string().min(1, "Username is required."),
  email: z.string(),
  profileImage: z.string(),
  phone: z.string(),
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

// TODO: Add missing input fields
export function EditProfileForm({ isEditing = true }: { isEditing?: boolean }) {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const updatedProfile = {
        ...data,
        updatedAt: new Date(),
      };

      console.log("Updated profile data:", updatedProfile);

      await updateDocument<UserData>(
        "users",
        userData?.id ?? "",
        updatedProfile
      );

      // Reset form after successful update
      reset();
      setLoading(false);
      showNotification(
        "success",
        "Profile updated",
        "Your profile has been successfully updated."
      );
    } catch (error) {
      setLoading(false);
      showNotification("error", "Update failed", String(error));
    }
  };

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "No name",
        email: userData.email || "example@gmail.com",
        profileImage: userData.profileImage || "",
        dateOfBirth: userData.dateOfBirth || new Date(),
        gender: userData.gender || "Other",
        phone: userData.phone || "",
        relationshipStatus: userData.relationshipStatus || "Prefer Not to Say",
      });
    }
  }, [userData, user, reset]);

  function dateFormat(value: Date, arg1: string): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Edit Profile {userData?.id}</Text>


      {/* Profile Image Field */}
      <Text variant="labelLarge">Profile Image</Text>
      <Controller
        control={control}
        name="profileImage"
        render={({ field: { onChange, onBlur, value } }) => (
          <ImageUploader value={value} onChange={onChange} onBlur={onBlur} />
        )}
      />
      <HelperText type="error" visible={!!errors.profileImage}>
        {errors.profileImage?.message}
      </HelperText>
      {/* Username Field */}
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
          />
        )}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name?.message}
      </HelperText>
      {/* Phone Field */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Phone"
            placeholder="Enter your phone number"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.phone}>
        {errors.phone?.message}
      </HelperText>

      {/* Relationship Status Field */}
      <Controller
        control={control}
        name="relationshipStatus"
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
          >
            <Picker.Item label="Single" value="Single" />
            <Picker.Item label="In a Relationship" value="In a Relationship" />
            <Picker.Item label="Engaged" value="Engaged" />
            <Picker.Item label="Married" value="Married" />
            <Picker.Item label="It's Complicated" value="It's Complicated" />
            <Picker.Item
              label="Prefer Not to Say"
              value="Prefer Not to Say"
            />
          </Picker>
        )}
      />
      <HelperText type="error" visible={!!errors.relationshipStatus}>
        {errors.relationshipStatus?.message}
      </HelperText>

      {/* Date of Birth Field */}
      {/* <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, value } }) => (
          <DatePicker
            style={styles.datePicker}
            onDateChange={(date: any) => onChange(date)}
            date={value} // Use date instead of value
            mode="date"
            label="Date of Birth"
            placeholder="Enter your date of birth"
            format="yyyy-MM-dd"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.dateOfBirth}>
        {errors.dateOfBirth?.message}
      </HelperText> */}

        {/* Gender Field */}
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          )}
        />
        <HelperText type="error" visible={!!errors.gender}>
          {errors.gender?.message}
        </HelperText>

        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Email"
              value={value}
              editable={false} // Email is not editable
              onBlur={onBlur}
              onChangeText={onChange}
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
        >
          {isEditing ? "Update Profile" : "Create Profile"}
        </Button>
    </View>
  );
}

// Stylesheet for consistent styling
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  datePicker: {
    width: '100%',
    height: 40,

  },
});

export default EditProfileForm;
