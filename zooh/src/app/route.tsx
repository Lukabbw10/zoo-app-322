import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { abstand, farben } from "@/app/theme";
import { Platzhalter } from "@/app/components/platzhalter";

export default function RouteScreen() {
  const { ziel } = useLocalSearchParams<{ ziel?: string }>();
  const zielName = ziel || "Ausgewähltes Gehege";

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.zielText}>Ziel: {zielName}</Text>
      <Text style={styles.text}>
        Zweck: Fussgänger-Navigation Schritt-für-Schritt
      </Text>
      <Platzhalter
        label={`🚶 Route anzeigen von 'Mein Standort' -> ${zielName}`}
        hoehe={220}
      />
      <Platzhalter
        label="Anweisung: In 50m links abbiegen Richtung Masoala Halle"
        hoehe={80}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.m },
  zielText: { fontSize: 20, fontWeight: "700", color: farben.primaer },
  text: { fontSize: 16, color: farben.text },
});
