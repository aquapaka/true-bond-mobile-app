import { Stack } from "expo-router";

export default function ClientSessionLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sessions" }} />
    </Stack>
  );
}
