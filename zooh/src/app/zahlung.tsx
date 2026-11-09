import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feld } from "@/components/feld";
import { Platzhalter } from "@/components/platzhalter";
import { PrimaerButton } from "@/components/primaer-button";
import { leseTicketAuswahl, ticketTotal } from "@/daten/tickets";
import { abstand, farben } from "@/theme";

export default function ZahlungScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    erwachsene?: string;
    kinder?: string;
  }>();
  const auswahl = leseTicketAuswahl(params);
  const [email, setEmail] = useState("");
  const [zahlung, setZahlung] = useState<"Karte" | "TWINT">("Karte");
  const gueltig = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const fehler =
    email.length > 0 && !gueltig
      ? "Bitte eine gültige E-Mail-Adresse eingeben, z. B. name@beispiel.ch."
      : undefined;

  return (
    <ScrollView
      contentContainerStyle={styles.inhalt}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titel}>Zahlung</Text>
      <Platzhalter label="Zahlungsübersicht" hoehe={80} />
      {auswahl ? (
        <>
          <Text style={styles.total}>Total: CHF {ticketTotal(auswahl)}</Text>
          <Feld
            label="E-Mail für das Ticket"
            placeholder="name@beispiel.ch"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            fehler={fehler}
          />
          <Text style={styles.text}>Zahlungsart</Text>
          <View style={styles.auswahl}>
            {(["Karte", "TWINT"] as const).map((art) => (
              <Pressable
                key={art}
                accessibilityRole="radio"
                accessibilityState={{ checked: zahlung === art }}
                onPress={() => setZahlung(art)}
                style={[styles.option, zahlung === art && styles.gewaehlt]}
              >
                <Text style={styles.text}>{art}</Text>
              </Pressable>
            ))}
          </View>
          <PrimaerButton
            titel="Bestellung simulieren"
            deaktiviert={!gueltig}
            onPress={() =>
              router.push({
                pathname: "/bestaetigung",
                params: {
                  erwachsene: String(auswahl.erwachsene),
                  kinder: String(auswahl.kinder),
                  zahlung,
                },
              })
            }
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Bitte zuerst Tickets auswählen.</Text>
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
  auswahl: { flexDirection: "row", gap: abstand.s },
  option: {
    flex: 1,
    padding: abstand.m,
    borderWidth: 1,
    borderColor: farben.rahmen,
    borderRadius: 6,
    alignItems: "center",
  },
  gewaehlt: {
    borderColor: farben.primaer,
    borderWidth: 2,
    backgroundColor: farben.flaeche,
  },
});
