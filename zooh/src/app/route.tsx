import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { abstand, farben } from "@/theme";
import { Platzhalter } from "@/components/platzhalter";
import { PrimaerButton } from "@/components/primaer-button";

export default function RouteScreen() {
  const router = useRouter();
  const { ziel, erinnerung } = useLocalSearchParams<{
    ziel?: string;
    erinnerung?: string;
  }>();
  const zielName = typeof ziel === "string" ? ziel : undefined;

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.zielText}>
        {zielName ? `Ziel: ${zielName}` : "Navigation"}
      </Text>
      {zielName ? (
        <>
          <Platzhalter
            label={`Beispielroute vom Eingang zu ${zielName}`}
            hoehe={220}
          />
          <Text style={styles.text}>Start: Eingang (Beispielstandort)</Text>
          {erinnerung === "aktiv" || erinnerung === "aus" ? (
            <Text style={styles.text}>Erinnerung: {erinnerung}</Text>
          ) : null}
          <Text style={styles.text}>Die Karte zeigt eine Beispielroute.</Text>
        </>
      ) : (
        <>
          <Platzhalter label="Hier erscheint deine Route" hoehe={220} />
          <Text style={styles.text}>Wähle zuerst ein Ziel auf der Karte.</Text>
        </>
      )}
      <PrimaerButton titel="Zur Karte" onPress={() => router.replace("/")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.m },
  zielText: { fontSize: 20, fontWeight: "700", color: farben.primaer },
  text: { fontSize: 16, color: farben.text },
});
