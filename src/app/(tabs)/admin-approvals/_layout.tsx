import { Stack } from "expo-router";

export default function AdminApprovalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Approve counselor requests" }}
      />
      <Stack.Screen name="detail/[id]" options={{ title: "Profile" }} />
    </Stack>
  );
}
