import { Stack } from "expo-router";

export default function LearnLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Learn" }} />
      <Stack.Screen name="blog-detail" options={{ title: "Details" }} />
    </Stack>
  );
}
