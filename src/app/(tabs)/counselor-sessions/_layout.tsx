import { Stack } from "expo-router";

export default function CounselorSessionsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sessions" }} />
      <Stack.Screen
        name="session-details/[id]"
        options={{ title: "Session details" }}
      />
    </Stack>
  );
}
