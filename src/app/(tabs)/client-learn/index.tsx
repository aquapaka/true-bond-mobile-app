import { getCollection } from "@/src/lib/firestore";
import { LearningResource } from "@/src/types/LearningResource";
import { showNotification } from "@/src/utils/notificationUtils";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import { Link, useNavigation } from "expo-router";

export default function ClientLearnScreen() {
  const [learningResources, setLearningResources] = useState<
    LearningResource[]
  >([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);

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
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={learningResources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/(tabs)/client-learn/blog-detail/${item.id}`} asChild>
            <TouchableOpacity
              style={{
                marginBottom: 15,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: "100%", height: 150, borderRadius: 10 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
                {item.title}
              </Text>
              <Text style={{ color: "gray", marginTop: 5 }}>
                {item.category}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
