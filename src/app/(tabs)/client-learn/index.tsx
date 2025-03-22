import { getCollection } from "@/src/lib/firestore";
import { LearningResource } from "@/src/types/LearningResource";
import { getReadingTime } from "@/src/utils/generalUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClientLearnScreen() {
  const [learningResources, setLearningResources] = useState<
    LearningResource[]
  >([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          await getCollection<LearningResource>("learningresources");
        setLearningResources(result);
      } catch (error) {
        showNotification("error", "Error!", String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading learning resources...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={learningResources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/(tabs)/client-learn/blog-detail/${item.id}`} asChild>
            <TouchableOpacity style={{ padding: 8 }}>
              <Surface
                style={{
                  borderRadius: 12,
                  flexDirection: "row",
                  padding: 12,
                  gap: 12,
                }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 110, height: 120, borderRadius: 8 }}
                />
                <View
                  style={{
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Text variant="headlineSmall">{item.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: 24, height: 24, borderRadius: 100 }}
                    />
                    <Text variant="titleSmall" style={{ flex: 1 }}>
                      {item.title}
                    </Text>
                    <Text
                      variant="bodySmall"
                      style={{ color: theme.colors.tertiary }}
                    >
                      {getReadingTime(item.content)}
                    </Text>
                  </View>
                </View>
              </Surface>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
