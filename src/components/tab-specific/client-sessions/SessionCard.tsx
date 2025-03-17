import { getDocument } from "@/src/lib/firestore";
import { Counselor } from "@/src/types/Counselor";
import { Session } from "@/src/types/Session";
import { formatDate } from "@/src/utils/formatUtils";
import { showNotification } from "@/src/utils/notificationUtils";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function SessionCard({ session }: { session: Session }) {
  const [counselor, setCounselor] = useState<Counselor | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchCounselor = async () => {
      setLoading(true);
      try {
        const counselor = await getDocument<Counselor>(
          "counselors",
          session.counselorId
        );
        setCounselor(counselor);
      } catch (error) {
        showNotification(
          "error",
          "Error while getting counselor data",
          String(error)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCounselor();
  }, []);

  return (
    <Surface
      mode="flat"
      elevation={2}
      style={{
        flexDirection: "row",
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}
    >
      <View style={{ flex: 5 }}>
        <Text variant="labelSmall" style={{ textTransform: "uppercase" }}>
          {formatDate(session.scheduledAt)}
        </Text>
        <Text variant="titleMedium" style={{}}>
          Meeting with {counselor?.name}
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Button
          contentStyle={{ flexDirection: "row-reverse" }}
          icon={"google-podcast"}
          compact
          onPress={() => null}
        >
          JOIN
        </Button>
      </View>
    </Surface>
  );
}
