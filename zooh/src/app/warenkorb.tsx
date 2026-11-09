import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Platzhalter } from "@/components/platzhalter";
import { PrimaerButton } from "@/components/primaer-button";
import { leseTicketAuswahl, ticketTotal } from "@/daten/tickets";
import { abstand, farben } from "@/theme";

export default function WarenkorbScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    erwachsene?: string;
    kinder?: string;
  }>();
  const auswahl = leseTicketAuswahl(params);

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.titel}>Warenkorb</Text>
      <Platzhalter label="Ausgewählte Eintrittstickets" hoehe={100} />
      {auswahl ? (
        <>
          <Text style={styles.text}>Erwachsene: {auswahl.erwachsene}</Text>
          <Text style={styles.text}>Kinder: {auswahl.kinder}</Text>
          <Text style={styles.total}>Total: CHF {ticketTotal(auswahl)}</Text>
          <PrimaerButton
            titel="Weiter zur Zahlung"
            onPress={() =>
              router.push({
                pathname: "/zahlung",
                params: {
                  erwachsene: String(auswahl.erwachsene),
                  kinder: String(auswahl.kinder),
                },
              })
            }
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Dein Warenkorb ist leer.</Text>
          <PrimaerButton
            titel="Tickets auswählen"
            onPress={() => router.push("/tickets")}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.m },
  titel: { fontSize: 22, fontWeight: "700", color: farben.text },
  text: { fontSize: 16, color: farben.text },
  total: { fontSize: 20, fontWeight: "700", color: farben.text },
});
