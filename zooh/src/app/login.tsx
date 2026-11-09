import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { abstand, farben } from "@/theme";
import { Feld } from "@/components/feld";
import { PrimaerButton } from "@/components/primaer-button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [angezeigt, setAngezeigt] = useState(false);
  const gueltig = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const ungueltig = email.length > 0 && !gueltig;
  const fehler = ungueltig
    ? "Bitte eine gültige E-Mail-Adresse eingeben, z. B. name@beispiel.ch."
    : undefined;

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.text}>Anmelden für Erinnerungen und Favoriten.</Text>

      <Feld
        label="E-Mail-Adresse"
        placeholder="name@beispiel.ch"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(wert) => {
          setEmail(wert);
          setAngezeigt(false);
        }}
        fehler={fehler}
      />

      <PrimaerButton
        titel="Anmelden"
        deaktiviert={!gueltig}
        onPress={() => setAngezeigt(true)}
      />
      {angezeigt ? (
        <Text style={styles.text} accessibilityLiveRegion="polite">
          Anmeldung im Prototyp vorgemerkt. Es wurde kein Konto erstellt.
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.l },
  text: { fontSize: 16, color: farben.text },
});
