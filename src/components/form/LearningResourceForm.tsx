import { addDocument } from "@/src/lib/firestore";
import {
  LearningResource,
  LearningResourceCategory,
} from "@/src/types/LearningResource";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { serverTimestamp } from "firebase/firestore";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { z } from "zod";

const categories: LearningResourceCategory[] = [
  "communication",
  "finances",
  "conflict_resolution",
];

type LearningResourceFormData = Omit<LearningResource, "id" | "createdAt" | "updatedAt">;

const LearningResourceSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  imageUrl: z.string().min(1, "Image Url is required."),
  author: z.string().min(1, "Author is required."),
  authorImageUrl: z.string().min(1, "Author image is required."),
  category: z.enum(
    categories as [LearningResourceCategory, ...LearningResourceCategory[]],
    {
      message: "Invalid category.",
    }
  ),
});

export function LearningResourceForm({
  isEditing = false,
  defaultValues,
}: {
  isEditing?: boolean;
  defaultValues?: LearningResourceFormData;
}) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LearningResourceFormData>({
    resolver: zodResolver(LearningResourceSchema),
    defaultValues,
  });

  async function onSubmit(data: LearningResourceFormData) {
    try {
      if (isEditing) {
      } else {
        await addDocument<LearningResource>("learningresources", data);
      }
      router.back(); // Navigate back after submission
    } catch (error) {
      console.error("Error saving resource:", error);
    }
  }

  return (
    <View style={{ gap: 12 }}>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput mode="outlined" placeholder="Title" {...field} />
        )}
      />
      {errors.title && (
        <Text style={{ color: theme.colors.error }}>
          {errors.title.message}
        </Text>
      )}

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <TextInput mode="outlined" placeholder="Content" {...field} />
        )}
      />
      {errors.content && (
        <Text style={{ color: theme.colors.error }}>
          {errors.content.message}
        </Text>
      )}

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <TextInput mode="outlined" placeholder="Category" {...field} />
        )}
      />
      {errors.category && (
        <Text style={{ color: theme.colors.error }}>
          {errors.category.message}
        </Text>
      )}

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        {isEditing ? "Update Resource" : "Create Resource"}
      </Button>
    </View>
  );
}
