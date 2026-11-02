import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { abstand, farben } from "@/app/theme";
import { Platzhalter } from "@/app/components/platzhalter";
import { PrimaerButton } from "@/app/components/primaer-button";

export default function StartMapScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.titel}>Zoo Zürich Live Map</Text>

      {/* Schnell-Filter aus eurer Skizze */}
      <Platzhalter
        label="Filter: [Tiere]  [Events]  [Gastro]  [WCs]"
        hoehe={50}
      />

      {/* Interaktive Live-Karte */}
      <Platzhalter
        label="🗺️ Interaktive Karte mit GPS ('Du bist hier')"
        hoehe={240}
      />

      {/* Banner fürs nächste Event */}
      <View style={styles.eventBox}>
        <Text style={styles.eventTitel}>
          🔔 14:00 Elefanten-Fütterung (in 15 Min.)
        </Text>
        <PrimaerButton
          titel="Route zur Fütterung starten"
          onPress={() =>
            router.push({
              pathname: "/route",
              params: { ziel: "Elefanten-Gehege" },
            })
          }
        />
      </View>

      <Text style={styles.untertitel}>Weitere Bereiche:</Text>
      <View style={styles.linkListe}>
        <Link href="/events" style={styles.link}>
          📅 Alle Tages-Events & Fütterungen
        </Link>
        <Link href="/login" style={styles.link}>
          👤 Anmelden für Event-Erinnerungen
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.m },
  titel: { fontSize: 22, fontWeight: "700", color: farben.text },
  untertitel: {
    fontSize: 16,
    fontWeight: "600",
    color: farben.text,
    marginTop: abstand.s,
  },
  eventBox: {
    backgroundColor: farben.flaeche,
    padding: abstand.m,
    borderRadius: 8,
    gap: abstand.s,
  },
  eventTitel: { fontSize: 15, fontWeight: "600", color: farben.text },
  linkListe: { gap: abstand.s },
  link: {
    fontSize: 16,
    color: farben.primaer,
    fontWeight: "600",
    paddingVertical: abstand.s,
  },
});
