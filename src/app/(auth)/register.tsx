import RegisterForm from "@/src/components/form/RegisterForm";
import { useNavigation } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 16, gap: 32 }}>
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        Let's start your journey!
      </Text>
      <RegisterForm />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ textDecorationLine: "underline" }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
