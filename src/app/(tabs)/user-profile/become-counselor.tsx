import CounselorProfileForm from "@/src/components/form/CounselorProfileForm";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

export default function BecomeCounselorScreen() {
  const theme = useTheme();

  return (
    <ScrollView>
      <View style={{ padding: 16, paddingBottom: 84, gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Icon name="information" color={theme.colors.primary} />
          <Text variant="bodySmall">
            Complete your profile to apply for counselor
          </Text>
        </View>
        <CounselorProfileForm />
      </View>
    </ScrollView>
  );
}
