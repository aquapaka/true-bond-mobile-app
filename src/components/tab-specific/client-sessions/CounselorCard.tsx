import { TruebondLightTheme } from "@/src/theme/theme";
import { Counselor } from "@/src/types/Counselor";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          // @ts-ignore
          `/(tabs)/client-sessions/schedule-counselor/${counselor.id}`,
        )
      }
    >
      <Surface
        style={{ flexDirection: "row", borderRadius: 16, padding: 12, gap: 12 }}
      >
        <Surface style={{ borderRadius: 12, overflow: "hidden" }}>
          <Image
            width={72}
            height={72}
            source={{
              uri: counselor.profileImage,
            }}
          />
        </Surface>
        <View>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Dr. {counselor.name}
          </Text>
          <Icon
            name="check-decagram-outline"
            size={16}
            color={TruebondLightTheme.colors.success}
          />
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.primary, marginTop: 4 }}
          >
            {counselor.experienceYears} years of experience
          </Text>
          <Text variant="labelSmall">{counselor.expertise}</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
}
