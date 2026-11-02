import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Zoo Zürich – Live Map" }} />
      <Stack.Screen name="events" options={{ title: "Events & Fütterungen" }} />
      <Stack.Screen name="route" options={{ title: "Navigation" }} />
      <Stack.Screen name="login" options={{ title: "Anmelden" }} />
    </Stack>
  );
}
