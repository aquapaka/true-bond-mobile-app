import { useAuth } from "@/src/context/AuthProvider";
import { TouchableOpacity } from "react-native";

import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  async function onLogoutPress() {
    await signOut();
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={() => onLogoutPress()}>
        <Button mode="contained">Log out</Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
