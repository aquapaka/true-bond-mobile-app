import { LearningResourceForm } from "@/src/components/form/LearningResourceForm";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default function AdminManagementScreen() {
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 64, padding: 16 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          Add new resouces
        </Text>
        <LearningResourceForm />
      </View>
    </ScrollView>
  );
}
