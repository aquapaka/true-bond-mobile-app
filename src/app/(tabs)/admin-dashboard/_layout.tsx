import { Stack } from "expo-router";

export default function AdminDashboardLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Dashboard Overview" }} />
    </Stack>
  );
}
