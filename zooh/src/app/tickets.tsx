import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Platzhalter } from "@/components/platzhalter";
import { PrimaerButton } from "@/components/primaer-button";
import { Zaehler } from "@/components/zaehler";
import { preise, ticketTotal } from "@/daten/tickets";
import { abstand, farben } from "@/theme";

export default function TicketsScreen() {
  const router = useRouter();
  const [erwachsene, setErwachsene] = useState(1);
  const [kinder, setKinder] = useState(0);
  const total = ticketTotal({ erwachsene, kinder });

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.titel}>Eintritt auswählen</Text>
      <Platzhalter label="Eintritt für einen Zoobesuch" hoehe={100} />
      <Text style={styles.text}>
        Beispielpreise: Erwachsene CHF {preise.erwachsene}, Kinder CHF{" "}
        {preise.kinder}
      </Text>
      <Zaehler label="Erwachsene" wert={erwachsene} onChange={setErwachsene} />
      <Zaehler label="Kinder" wert={kinder} onChange={setKinder} />
      <Text style={styles.total} accessibilityLiveRegion="polite">
        Total: CHF {total}
      </Text>
      <PrimaerButton
        titel="In den Warenkorb"
        deaktiviert={total === 0}
        onPress={() =>
          router.push({
            pathname: "/warenkorb",
            params: { erwachsene: String(erwachsene), kinder: String(kinder) },
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.m },
  titel: { fontSize: 22, fontWeight: "700", color: farben.text },
  text: { fontSize: 16, color: farben.text },
  total: { fontSize: 20, fontWeight: "700", color: farben.text },
});
