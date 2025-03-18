import CounselorProfileForm, {
  CounselorProfileFormData,
} from "@/src/components/form/CounselorProfileForm";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { showNotification } from "@/src/utils/notificationUtils";

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
