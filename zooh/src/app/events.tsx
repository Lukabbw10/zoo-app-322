import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { abstand, farben } from "@/theme";
import { useErinnerungen } from "@/components/erinnerungen";
import { Navigation } from "@/components/navigation";
import { PrimaerButton } from "@/components/primaer-button";
import { eventBeginn, programm } from "@/daten/programm";

export default function EventsScreen() {
  const router = useRouter();
  const { aktiv, ausstehend, umstellen } = useErinnerungen();
  const [jetzt, setJetzt] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setJetzt(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.seite}>
      <ScrollView contentContainerStyle={styles.inhalt}>
        <Text style={styles.titel}>Events & Fütterungen</Text>
        <Text style={styles.hinweis}>
          Beispielprogramm · Erinnerung 15 Minuten vor Beginn
        </Text>
        {Platform.OS === "web" ? (
          <Text style={styles.hinweis}>
            Im Browser funktioniert die Erinnerung, solange die Seite geöffnet
            ist.
          </Text>
        ) : null}
        {programm.map((event) => {
          const istAktiv = Boolean(aktiv[event.id]);
          const vorbei = eventBeginn(event, jetzt) <= jetzt;
          return (
            <View style={styles.card} key={event.id}>
              <Text style={styles.cardTitel}>
                {event.zeit} - {event.titel}
              </Text>
              <Text style={styles.text}>{event.ziel}</Text>
              <View style={styles.zeile}>
                <Text style={styles.text}>
                  {vorbei && !istAktiv
                    ? "Heute bereits begonnen"
                    : `Erinnerung ${istAktiv ? "aktiv" : "aus"}`}
                </Text>
                <Switch
                  accessibilityLabel={`Erinnerung für ${event.titel}`}
                  disabled={Boolean(ausstehend) || (vorbei && !istAktiv)}
                  value={istAktiv}
                  onValueChange={(wert) => void umstellen(event, wert)}
                />
              </View>
              <PrimaerButton
                titel="Route starten"
                onPress={() =>
                  router.push({
                    pathname: "/route",
                    params: {
                      ziel: event.ziel,
                      erinnerung: istAktiv ? "aktiv" : "aus",
                    },
                  })
                }
              />
            </View>
          );
        })}
      </ScrollView>
      <Navigation aktiv="events" />
    </View>
  );
}

const styles = StyleSheet.create({
  seite: { flex: 1, backgroundColor: farben.hintergrund },
  inhalt: {
    padding: abstand.m,
    gap: abstand.m,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  titel: { fontSize: 22, fontWeight: "700", color: farben.text },
  text: { fontSize: 16, color: farben.text },
  hinweis: { fontSize: 14, color: farben.textSekundaer },
  zeile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: farben.flaeche,
    padding: abstand.m,
    borderRadius: 8,
    gap: abstand.s,
  },
  cardTitel: { fontSize: 16, fontWeight: "600", color: farben.text },
});
