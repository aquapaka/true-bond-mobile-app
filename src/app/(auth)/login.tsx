import LoginForm from "@/src/components/form/LoginForm";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function LoginScreen() {
  return (
    <View style={{padding: 16, gap: 32}}>
      <Text variant="headlineMedium" style={{ fontWeight: "bold", textAlign: 'center' }}>
        Welcome to True Bond!
      </Text>
      <LoginForm />
    </View>
  );
}
