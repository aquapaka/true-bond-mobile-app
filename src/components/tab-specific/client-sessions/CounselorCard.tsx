import { Image, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

export default function CounselorCard() {
  const theme = useTheme();

  return (
    <Surface
      style={{ flexDirection: "row", borderRadius: 16, padding: 12, gap: 12 }}
    >
      <Surface style={{ borderRadius: 12, overflow: 'hidden' }}>
        <Image
          width={72}
          height={72}
          source={{
            uri: "https://media.istockphoto.com/id/1028847418/vector/doctor-visit-with-patient-for-medicine-concept.jpg?s=612x612&w=0&k=20&c=0w5u7ShrukF7Jk_IgqBDRhW-3MfOJzuRurkIgSF9Wow=",
          }}
        />
      </Surface>
      <View>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          Dr. Chikanso Chima
        </Text>
        <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
          Angiolory
        </Text>
      </View>
    </Surface>
  );
}
