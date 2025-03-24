import { counselorApi } from "@/src/api/counselorApi";
import CounselorCard from "@/src/components/tab-specific/client-sessions/CounselorCard";
import { Counselor } from "@/src/types/Counselor";
import { CounselorProfile } from "@/src/types/CounselorProfile";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

export default function CounselorListScreen() {
  const [counselors, setCounselors] = useState<Counselor[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await counselorApi.getAllCounselors();
      setCounselors(data);
      console.log(data);
    };

    fetchData();
  }, []);

  if (!counselors) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 16 }}>
        {counselors
          .filter(
            (counselor) =>
              counselor.role === "counselor" && counselor.status === "approved"
          )
          .map((counselor) => (
            <CounselorCard key={counselor.id} counselor={counselor} />
          ))}
      </View>
    </ScrollView>
  );
}
