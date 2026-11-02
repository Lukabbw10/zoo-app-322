import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { abstand, farben } from "@/app/theme";
import { Feld } from "@/app/components/feld";
import { PrimaerButton } from "@/app/components/primaer-button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const ungueltig = email.length > 0 && !email.includes("@");
  const fehler = ungueltig
    ? "Bitte eine gültige E-Mail mit @ eingeben."
    : undefined;

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.text}>
        Erstelle ein Konto für Push-Benachrichtigungen & Favoriten.
      </Text>

      <Feld
        label="E-Mail-Adresse"
        placeholder="name@beispiel.ch"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        fehler={fehler}
      />

      <PrimaerButton
        titel="Anmelden"
        deaktiviert={email.length === 0 || ungueltig}
        onPress={() => alert("Erfolgreich angemeldet!")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.l },
  text: { fontSize: 16, color: farben.text },
});
