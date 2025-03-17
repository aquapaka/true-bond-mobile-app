import React from "react";
import { View, ScrollView } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, HelperText, Checkbox } from "react-native-paper";
import * as z from "zod";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CounselorProfileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  expertise: z.string().min(3, "Expertise is required."),
  experienceYears: z
    .number()
    .min(1, "At least 1 year of experience is required.")
    .max(50, "Experience cannot exceed 50 years."),
  certificateImageUrl: z.string().url("Invalid certificate image URL."),
  sessionPrice: z.number().min(0, "Price must be at least 0."),
  availability: z
    .array(
      z.object({
        day: z.string(),
        slots: z.array(z.string().min(1, "Time slot is required.")),
      })
    )
    .nonempty("At least one available day is required."),
  approved: z.boolean(),
});

type CounselorProfileFormData = z.infer<typeof CounselorProfileSchema>;

export default function CounselorProfileForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: CounselorProfileFormData) => void;
  defaultValues?: Partial<CounselorProfileFormData>;
}) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CounselorProfileFormData>({
    resolver: zodResolver(CounselorProfileSchema),
    defaultValues: {
      bio: "",
      expertise: "",
      experienceYears: 1,
      certificateImageUrl: "",
      sessionPrice: 0,
      availability: [],
      approved: false,
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  return (
    <ScrollView style={{ padding: 16 }}>
      <Controller
        control={control}
        name="bio"
        render={({ field }) => (
          <TextInput
            label="Bio"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.bio}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.bio}>
        {errors.bio?.message}
      </HelperText>

      <Controller
        control={control}
        name="expertise"
        render={({ field }) => (
          <TextInput
            label="Expertise"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.expertise}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.expertise}>
        {errors.expertise?.message}
      </HelperText>

      <Controller
        control={control}
        name="experienceYears"
        render={({ field }) => (
          <TextInput
            label="Years of Experience"
            value={String(field.value)}
            keyboardType="numeric"
            onChangeText={(value) => field.onChange(Number(value))}
            onBlur={field.onBlur}
            error={!!errors.experienceYears}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.experienceYears}>
        {errors.experienceYears?.message}
      </HelperText>

      <Controller
        control={control}
        name="certificateImageUrl"
        render={({ field }) => (
          <TextInput
            label="Certificate Image URL"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.certificateImageUrl}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.certificateImageUrl}>
        {errors.certificateImageUrl?.message}
      </HelperText>

      <Controller
        control={control}
        name="sessionPrice"
        render={({ field }) => (
          <TextInput
            label="Session Price"
            value={String(field.value)}
            keyboardType="numeric"
            onChangeText={(value) => field.onChange(Number(value))}
            onBlur={field.onBlur}
            error={!!errors.sessionPrice}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.sessionPrice}>
        {errors.sessionPrice?.message}
      </HelperText>

      {/* Availability Selection */}
      <View>
        {fields.map((field, index) => (
          <View key={field.id}>
            <TextInput label="Day" value={field.day} disabled />
            <TextInput
              label="Time Slots (comma separated)"
              onChangeText={(value) =>
                setValue(
                  `availability.${index}.slots`,
                  value.split(",").map((slot) => slot.trim())
                )
              }
            />
            <Button onPress={() => remove(index)}>Remove</Button>
          </View>
        ))}
        <Button
          onPress={() =>
            append({
              day: daysOfWeek[fields.length % 7],
              slots: [],
            })
          }
        >
          Add Availability
        </Button>
      </View>

      <Controller
        control={control}
        name="approved"
        render={({ field }) => (
          <Checkbox.Item
            label="Approved"
            status={field.value ? "checked" : "unchecked"}
            onPress={() => field.onChange(!field.value)}
          />
        )}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </ScrollView>
  );
}
