import { counselorApi } from "@/src/api/counselorApi";
import { TruebondLightTheme } from "@/src/theme/theme";
import { Counselor } from "@/src/types/Counselor";
import { showNotification } from "@/src/utils/notificationUtils";
import { useNavigation } from "@react-navigation/native";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge, Surface, Text, useTheme } from "react-native-paper";

export default function AdminApprovalsScreen() {
  const theme = useTheme();
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchProfileList = async () => {
        try {
          const result = await counselorApi.getAllCounselors();
          setCounselors(result);
        } catch (error) {
          showNotification("error", "Error!", String(error));
        }
      };

      fetchProfileList();
    }, []),
  );

  return (
    <FlatList
      data={counselors}
      keyExtractor={(counselor) => counselor.id}
      style={styles.container}
      renderItem={({ item: counselor }) => (
        <Link href={`/(tabs)/admin-approvals/detail/${counselor.id}`} asChild>
          <TouchableOpacity>
            <Surface style={styles.card}>
              <View
                style={{
                  flex: 2,
                  gap: 8,
                }}
              >
                <Image
                  source={{ uri: counselor.profileImage }}
                  style={[
                    styles.image,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
                <Badge
                  style={{
                    width: "100%",
                    backgroundColor:
                      counselor.status === "approved"
                        ? TruebondLightTheme.colors.success
                        : counselor.status === "applying"
                          ? TruebondLightTheme.colors.warning
                          : TruebondLightTheme.colors.error,
                    paddingHorizontal: 12,
                  }}
                >
                  {counselor.status}
                </Badge>
              </View>

              <View style={styles.infoContainer}>
                <Text
                  variant="labelMedium"
                  style={[
                    styles.name,
                    {
                      color: theme.colors.primary,
                    },
                  ]}
                >
                  {counselor.name} application
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  Bio: {counselor.bio}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  Expertise: {counselor.expertise}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  Years of experience: {counselor.experienceYears}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{
                    marginTop: 8,
                    color: theme.colors.tertiary,
                  }}
                >
                  View Details →
                </Text>
              </View>
            </Surface>
          </TouchableOpacity>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
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
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    gap: 8,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 7,
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
});
