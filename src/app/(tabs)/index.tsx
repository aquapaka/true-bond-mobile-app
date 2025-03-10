import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
