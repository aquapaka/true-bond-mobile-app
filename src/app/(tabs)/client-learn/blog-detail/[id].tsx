import { getDocument } from "@/src/lib/firestore";
import { LearningResource } from "@/src/types/LearningResource";
import { getReadingTime } from "@/src/utils/generalUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BlogDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<LearningResource | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const result = await getDocument<LearningResource>(
          "learningresources",
          id as string,
        );
        setBlog(result);
      } catch (error) {
        showNotification("error", "Error!", String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#3498db" />
      </SafeAreaView>
    );
  }

  if (!blog) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
          Không tìm thấy bài viết!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image
        source={{ uri: blog.imageUrl }}
        style={{
          width: "100%",
          height: 250,
          borderRadius: 8,
          marginBottom: 15,
        }}
        resizeMode="cover"
      />

      <Text variant="headlineLarge">{blog.title}</Text>

      <Text
        variant="labelMedium"
        style={{
          color: theme.colors.tertiary,
          marginTop: 8,
        }}
      >
        {blog.category}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          gap: 12,
        }}
      >
        <Image
          source={{ uri: blog.authorImageUrl }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 20,
          }}
        />
        <Text variant="titleMedium">{blog.author}</Text>
        <Text variant="titleSmall">{getReadingTime(blog.content)}</Text>
      </View>

      <Text variant="bodyMedium">{blog.content}</Text>
    </ScrollView>
  );
}
