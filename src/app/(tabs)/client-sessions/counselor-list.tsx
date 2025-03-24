import CounselorCard from "@/src/components/tab-specific/client-sessions/CounselorCard";
import SessionCard from "@/src/components/tab-specific/client-sessions/SessionCard";
import { CounselorProfile } from "@/src/types/CounselorProfile";
import { Session } from "@/src/types/Session";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";

export default function CounselorListScreen() {
  const [counselors, setCounselors] = useState<CounselorProfile[] | null>(null);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 16 }}>
        <CounselorCard />
        <CounselorCard />
        <CounselorCard />
      </View>
    </ScrollView>
  );
}
