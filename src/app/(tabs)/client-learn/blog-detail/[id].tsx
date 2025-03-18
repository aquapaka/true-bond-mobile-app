import { getDocument } from "@/src/lib/firestore";
import { LearningResource } from "@/src/types/LearningResource";
import { showNotification } from "@/src/utils/notificationUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BlogDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<LearningResource | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const result = await getDocument<LearningResource>(
          "learningresources",
          id as string
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Image
          source={{ uri: blog.imageUrl }}
          style={{
            width: "100%",
            height: 250,
            borderRadius: 10,
            marginBottom: 15,
          }}
          resizeMode="cover"
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#333",
          }}
        >
          {blog.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Image
            source={{ uri: blog.authorImageUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#555" }}>
            {blog.author}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#3498db",
            marginBottom: 10,
          }}
        >
          #{blog.category}
        </Text>

        <Text style={{ fontSize: 16, lineHeight: 24, color: "#444" }}>
          {blog.content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
