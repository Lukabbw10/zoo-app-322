import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Platzhalter } from "@/components/platzhalter";
import { PrimaerButton } from "@/components/primaer-button";
import { leseTicketAuswahl, ticketTotal } from "@/daten/tickets";
import { abstand, farben } from "@/theme";

export default function BestaetigungScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    erwachsene?: string;
    kinder?: string;
    zahlung?: string;
  }>();
  const auswahl = leseTicketAuswahl(params);
  const zahlung =
    params.zahlung === "Karte" || params.zahlung === "TWINT"
      ? params.zahlung
      : null;

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.titel}>Bestätigung</Text>
      {auswahl && zahlung ? (
        <>
          <Platzhalter label="Beispiel: digitales Ticket" hoehe={160} />
          <Text style={styles.text}>
            Bestellung simuliert: {auswahl.erwachsene} Erwachsene,{" "}
            {auswahl.kinder} Kinder.
          </Text>
          <Text style={styles.text}>
            Total: CHF {ticketTotal(auswahl)} | Zahlungsart: {zahlung}
          </Text>
          <Text style={styles.text}>
            Es wurde nichts bezahlt und kein gültiges Ticket ausgestellt.
          </Text>
          <PrimaerButton
            titel="Zur Karte"
            onPress={() => router.navigate("/karte")}
          />
        </>
      ) : (
        <>
          <Platzhalter label="Hier erscheint die Bestätigung" hoehe={160} />
          <Text style={styles.text}>Es liegt noch keine Bestellung vor.</Text>
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
});
