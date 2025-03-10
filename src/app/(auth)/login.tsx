import LoginForm from "@/src/components/form/LoginForm";
import { useAuth } from "@/src/context/AuthProvider";
import { Link, useNavigation } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { user, userData, signOut } = useAuth();

  return (
    <View style={{ padding: 16, gap: 32 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        Welcome {user?.displayName} to True Bond!
      </Text>
      <LoginForm />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Link href={"/(auth)/register"} asChild>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: "underline" }}>Register</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity>
          <Text style={{ textDecorationLine: "underline" }}>
            Forgot password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
