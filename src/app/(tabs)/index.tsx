import { LearningResourceForm } from "@/src/components/form/LearningResourceForm";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home Screen</Text>
      <LearningResourceForm />
    </SafeAreaView>
  );
}
