import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getCollection } from "@/src/lib/firestore";
import { CounselorProfile } from "@/src/types/CounselorProfile";
import { showNotification } from "@/src/utils/notificationUtils";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export default function AdminApprovalsScreen() {
  const [list, setList] = useState<CounselorProfile[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileList = async () => {
      try {
        const result =
          await getCollection<CounselorProfile>("counselorProfiles");
        setList(result);
      } catch (error) {
        showNotification("error", "Error!", String(error));
      }
    };
    fetchProfileList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Counselor Approval List</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/(tabs)/admin-approvals/detail/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image
                source={{ uri: item.certificateImageUrl }}
                style={styles.image}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.expertise}</Text>
                <Text style={styles.text}>Rating: {item.rating} ⭐</Text>
                <Text style={styles.text}>Status: {item.status}</Text>
                <Text style={styles.detailsText}>View Details →</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  detailsText: {
    fontSize: 14,
    color: "#007bff",
    marginTop: 5,
  },
});
