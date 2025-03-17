import { LearningResourceForm } from "@/src/components/form/LearningResourceForm";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, paddingBottom: 64, padding: 16 }}>
        <Text>Home Screen</Text>
        <LearningResourceForm />
      </SafeAreaView>
    </ScrollView>
  );
}
