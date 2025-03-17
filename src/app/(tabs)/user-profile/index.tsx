import { useAuth } from "@/src/context/AuthProvider";
import { Link } from "expo-router";
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
      <Link href={"/(tabs)/user-profile/become-counselor"} asChild>
        <Button mode="contained" onPress={() => null}>
          Apply to be counselor
        </Button>
      </Link>
      <Button mode="contained" onPress={() => onLogoutPress()}>
        Log out
      </Button>
    </SafeAreaView>
  );
}
