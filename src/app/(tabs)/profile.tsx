import { useAuth } from "@/src/context/AuthProvider";
import { TouchableOpacity, View } from "react-native";

import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { signOut } = useAuth();

  async function onLogoutPress() {
    await signOut();
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => onLogoutPress()}>
        <Button mode="contained">Log out</Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
