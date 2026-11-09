import { Stack } from "expo-router";
import { ErinnerungenProvider } from "@/components/erinnerungen";

export const unstable_settings = { anchor: "index" };

export default function RootLayout() {
  return (
    <ErinnerungenProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Karte", headerShown: false }}
        />
        <Stack.Screen
          name="karte"
          options={{ title: "Karte", headerShown: false }}
        />
        <Stack.Screen
          name="events"
          options={{ title: "Events & Fütterungen", headerShown: false }}
        />
        <Stack.Screen name="route" options={{ title: "Navigation" }} />
        <Stack.Screen name="login" options={{ title: "Anmelden" }} />
        <Stack.Screen name="tickets" options={{ title: "Eintrittstickets" }} />
        <Stack.Screen name="warenkorb" options={{ title: "Warenkorb" }} />
        <Stack.Screen name="zahlung" options={{ title: "Zahlung" }} />
        <Stack.Screen name="bestaetigung" options={{ title: "Bestätigung" }} />
      </Stack>
    </ErinnerungenProvider>
  );
}
