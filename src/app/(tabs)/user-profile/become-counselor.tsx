import CounselorProfileForm from "@/src/components/form/CounselorProfileForm";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default function BecomeCounselorScreen() {
  return (
    <ScrollView>
      <Text>BecomeCounselorScreen</Text>
      <CounselorProfileForm onSubmit={(data) => null} />
    </ScrollView>
  );
}
