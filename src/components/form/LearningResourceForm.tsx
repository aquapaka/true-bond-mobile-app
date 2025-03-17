import { addDocument } from "@/src/lib/firestore";
import {
  LearningResource,
  LearningResourceCategory,
} from "@/src/types/LearningResource";
import { showNotification } from "@/src/utils/notificationUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { z } from "zod";

const categories: LearningResourceCategory[] = [
  "communication",
  "finances",
  "conflict_resolution",
];

type LearningResourceFormData = Omit<
  LearningResource,
  "id" | "createdAt" | "updatedAt"
>;

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
    reset,
  } = useForm<LearningResourceFormData>({
    resolver: zodResolver(LearningResourceSchema),
    defaultValues,
  });

  async function onSubmit(data: LearningResourceFormData) {
    try {
      if (isEditing) {
      } else {
        const addedLearningResource = await addDocument<LearningResource>(
          "learningresources",
          data
        );
        // Reset form after successful
        if (addedLearningResource) {
          reset();
          showNotification(
            "success",
            "Successfully added!",
            "Learning Resource has been added"
          );
        }
      }
    } catch (error) {
      showNotification("error", "Error!", String(error));
    }
  }

  return (
    <View style={{ gap: 12 }}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.title}>
        {errors.title?.message}
      </HelperText>

      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Content"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.content}>
        {errors.content?.message}
      </HelperText>

      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Category"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.category}>
        {errors.category?.message}
      </HelperText>

      <Controller
        control={control}
        name="imageUrl"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="ImageUrl"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.imageUrl}>
        {errors.imageUrl?.message}
      </HelperText>

      <Controller
        control={control}
        name="author"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="author"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.author}>
        {errors.author?.message}
      </HelperText>

      <Controller
        control={control}
        name="authorImageUrl"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="authorImageUrl"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.authorImageUrl}>
        {errors.authorImageUrl?.message}
      </HelperText>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        {isEditing ? "Update Resource" : "Create Resource"}
      </Button>

      <Button
        mode="contained"
        onPress={() => {
          showNotification("success", "Demo", "This is demo description");
        }}
      >
        {"Demo Notification"}
      </Button>
    </View>
  );
}
