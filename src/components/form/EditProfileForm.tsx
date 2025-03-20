import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/src/context/AuthProvider";
import { updateDocument } from "@/src/lib/firestore"; 
import ImageUploader from "./custom/ImageUploader";
import { showNotification } from "@/src/utils/notificationUtils";

// Validation schema for user profile
const ProfileSchema = z.object({
  name: z.string().min(1, "Username is required."), 
  email: z.string().email("Invalid email address."), 
  profileImage: z.string().optional(), 
});

const defaultValues = {
  name: "",
  email: "", 
  profileImage: "", 
};

export function EditProfileForm({ isEditing = true }: { isEditing?: boolean }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || "", 
      email: user?.email || "", 
      profileImage: user?.profileImage || "", 
    },
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const updatedProfile = {
        ...data, 
        updatedAt: new Date(), 
      };

      await updateDocument("users", user?.uid ?? "", updatedProfile);

      // Reset form after successful update
      reset();
      setLoading(false);
      showNotification("success", "Profile updated", "Your profile has been successfully updated.");
    } catch (error) {
      setLoading(false);
      showNotification("error", "Update failed", String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Edit Profile</Text>

      {/* Username Field */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Username"
            placeholder="Enter your username"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name?.message}
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

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={loading}>
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
});

export default EditProfileForm;
