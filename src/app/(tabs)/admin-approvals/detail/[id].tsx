import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { CounselorProfile } from "@/src/types/CounselorProfile";
import { showNotification } from "@/src/utils/notificationUtils";
import { getDocument, updateDocument } from "@/src/lib/firestore";
import { ActivityIndicator } from "react-native-paper";
import { UserData } from "@/src/types/User";

export default function DetailProfile() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<CounselorProfile | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const result = await getDocument<CounselorProfile>(
          "counselorProfiles",
          id as string
        );
        setData(result);
      } catch (error) {
        showNotification("error", "error!", String(error));
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const getUserProfile = async () => {
      try {
        const result = await getDocument<UserData>("users", data.userId);
        setUser(result);
      } catch (error) {
        showNotification("error", "error!", String(error));
      }
    };
    getUserProfile();
  }, [data]);
  console.log(user);

  const handleAprrove = async () => {
    try {
      if (!data || !user) return;

      const response = await updateDocument<CounselorProfile>(
        "counselorProfiles",
        data?.id,
        {
          status: "approved",
        }
      );

      const res = await updateDocument<UserData>("users", user?.id, {
        role: "counselor",
      });

      showNotification("success", "Approved successfully!", String(""));
      router.back();
    } catch (error) {
      showNotification("error", "error!", String(error));
    }
  };

  const handleReject = async () => {
    try {
      if (!data) return;

      const response = await updateDocument<CounselorProfile>(
        "counselorProfiles",
        data?.id,
        {
          status: "declined",
        }
      );

      showNotification("success", "Approved successfully!", String(response));
    } catch (error) {
      showNotification("error", "error!", String(error));
    }
  };

  if (!data || !user) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={{ uri: user?.profileImage }} style={styles.image} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.status}>Gender: {user?.gender}</Text>
          <Text style={styles.status}>Email: {user?.email}</Text>
          <Text style={styles.status}>Phone: {user?.phone}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Image
          source={{ uri: data.certificateImageUrl }}
          style={styles.cerImage}
        />
        <Text style={styles.detail}>Expertise: {data.expertise}</Text>
        <Text style={styles.detail}>
          Experience: {data.experienceYears} years
        </Text>
        <Text style={styles.detail}>Session Price: ${data.sessionPrice}</Text>
        <Text style={styles.detail}>Bio: {data.bio}</Text>
        <Text style={styles.status}>Status: {data.status}</Text>
        <Text style={styles.rating}>⭐ {data.rating}/5</Text>

        <Text style={styles.sectionTitle}>Availability</Text>
        {data.availability.length > 0 ? (
          data.availability.map((slot, index) => (
            <View key={index} style={styles.availabilityContainer}>
              <Text style={styles.day}>{slot.day}:</Text>
              {slot.slots.length > 0 ? (
                <View style={styles.slotList}>
                  {slot.slots.map((time, i) => (
                    <Text key={i} style={styles.slot}>
                      {time}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.noSlot}>No slots available</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noSlot}>No availability set</Text>
        )}

        <Text style={styles.sectionTitle}>Created At</Text>
        <Text style={styles.detail}>
          {new Date(data.createdAt.seconds * 1000).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.buttonText} onPress={() => handleReject()}>
            Reject
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.approveButton}>
          <Text style={styles.buttonText} onPress={() => handleAprrove()}>
            Approve
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#007bff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  cerImage: {
    width: 317,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#555",
  },
  rating: {
    fontSize: 14,
    color: "#ffa500",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  availabilityContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 5,
  },
  day: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  slotList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  slot: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  noSlot: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    padding: 10,
  },
  approveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
