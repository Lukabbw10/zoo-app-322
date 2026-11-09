import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { farben } from "@/theme";

type Props = { aktiv: "karte" | "events" };

export function Navigation({ aktiv }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.leiste, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      <Link href="/" replace asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Karte"
          style={styles.element}
        >
          <Ionicons
            name="map-outline"
            size={24}
            color={aktiv === "karte" ? farben.primaer : farben.text}
          />
          <Text style={[styles.label, aktiv === "karte" && styles.aktiv]}>
            Karte
          </Text>
        </Pressable>
      </Link>
      <Link href="/events" replace asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Events"
          style={styles.element}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color={aktiv === "events" ? farben.primaer : farben.text}
          />
          <Text style={[styles.label, aktiv === "events" && styles.aktiv]}>
            Events
          </Text>
        </Pressable>
      </Link>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Tickets"
        disabled
        style={[styles.element, styles.deaktiviert]}
      >
        <Ionicons
          name="ticket-outline"
          size={24}
          color={farben.textSekundaer}
        />
        <Text style={styles.label}>Tickets</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Profil"
        disabled
        style={[styles.element, styles.deaktiviert]}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={farben.textSekundaer}
        />
        <Text style={styles.label}>Profil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  leiste: {
    flexDirection: "row",
    backgroundColor: farben.hintergrund,
    borderTopWidth: 1,
    borderColor: farben.rahmen,
    paddingTop: 8,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  element: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    gap: 2,
  },
  label: { fontSize: 12, color: farben.text },
  aktiv: { color: farben.primaer, fontWeight: "700" },
  deaktiviert: { opacity: 0.45 },
});
