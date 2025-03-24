import { TruebondLightTheme } from "@/src/theme/theme";
import { SessionWithCounselor } from "@/src/types/Session";
import { formatDate, formatRelativeDate } from "@/src/utils/formatUtils";
import { useEffect } from "react";
import { Image, View } from "react-native";
import { Badge, Button, Surface, Text, useTheme } from "react-native-paper";

export default function SessionCard({
  session,
}: {
  session: SessionWithCounselor;
}) {
  const theme = useTheme();

  useEffect(() => {
    console.log(session);
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
        gap: 8,
      }}
    >
      <View style={{ flex: 5 }}>
        <View>
          <Text variant="labelSmall" style={{ textTransform: "uppercase" }}>
            {formatDate(session.scheduledAt)}
          </Text>
          <Badge
            style={{
              backgroundColor:
                session.status === "confirmed" || session.status === "completed"
                  ? TruebondLightTheme.colors.success
                  : session.status === "pending"
                    ? TruebondLightTheme.colors.warning
                    : TruebondLightTheme.colors.error,
              paddingHorizontal: 12,
            }}
          >
            {session.status}
          </Badge>
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Image
            width={36}
            height={36}
            style={{
              backgroundColor: theme.colors.primaryContainer,
              borderRadius: 100,
              marginVertical: 4,
            }}
            source={{ uri: session.counselor?.profileImage }}
          />
          <Text variant="titleMedium" style={{}}>
            Meeting with Dr. {session.counselor?.name}
          </Text>
        </View>
        <Text variant="labelSmall" style={{}}>
          {formatRelativeDate(session.scheduledAt)}
        </Text>
      </View>
      {session.status === "confirmed" && (
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Button
            contentStyle={{ flexDirection: "row-reverse" }}
            icon={"google-podcast"}
            compact
            onPress={() => null}
          >
            JOIN
          </Button>
        </View>
      )}
    </Surface>
  );
}
