import { Stack } from "expo-router";

export default function UserProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
    </Stack>
  );
}
