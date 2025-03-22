import SessionCard from "@/src/components/tab-specific/client-sessions/SessionCard";
import { Session } from "@/src/types/Session";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";

export default function ClientSessionsScreen() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      clientId: "2",
      counselorId: "3",
      meetLink: "alksdjalskdj",
      notes: "asdaskjdh",
      scheduledAt: new Date(),
      status: "confirmed",
    },
  ]);

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
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </Surface>
        <Link href={"/(tabs)/client-sessions/schedule-new-session"} asChild>
          <Button mode="contained" onPress={() => null}>
            Schedule New Session
          </Button>
        </Link>
      </View>
    </ScrollView>
  );
}
