import { counselorApi } from "@/src/api/counselorApi";
import SessionCard from "@/src/components/tab-specific/client-sessions/SessionCard";
import { Counselor } from "@/src/types/Counselor";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";

export default function ScheduleNewSessionScreen() {
  const [counselors, setCounselors] = useState<Counselor[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await counselorApi.getAllCounselors();
      setCounselors(data);
      console.log(data);

    }

    fetchData();
  }, [])

  if(!counselors) {
    return;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 16 }}>
        <Surface
          style={{
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Text variant="titleSmall">Upcoming sessions</Text>
          {counselors.map((counselor) => (
            <></>
          ))}
        </Surface>
        <Button mode="contained" onPress={() => null}>
          Schedule New Session
        </Button>
      </View>
    </ScrollView>
  );
}
