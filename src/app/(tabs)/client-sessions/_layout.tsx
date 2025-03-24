import { Stack } from "expo-router";

export default function ClientSessionLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sessions" }} />
      <Stack.Screen
        name="counselor-list"
        options={{ title: "Find a counselor" }}
      />
      <Stack.Screen
        name="schedule-counselor/[id]"
        options={{ title: "Schedule" }}
      />
    </Stack>
  );
}
