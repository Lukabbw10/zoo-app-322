import { Link, useRouter } from "expo-router";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feld } from "@/components/feld";
import { Kartenansicht } from "@/components/kartenansicht";
import { Navigation } from "@/components/navigation";
import { PrimaerButton } from "@/components/primaer-button";
import { eventBeginn, naechstesEvent } from "@/daten/programm";
import { istImKartenausschnitt } from "@/daten/karte";
import type { Standort } from "@/daten/karte";
import { abstand, farben } from "@/theme";

const kategorien = ["Alle", "Tiere", "Events", "Gastro", "WC"] as const;
const orte = [
  { name: "Elefanten-Gehege", kategorie: "Tiere" },
  { name: "Raubtier-Gehege", kategorie: "Tiere" },
  { name: "Elefanten-Fütterung", kategorie: "Events" },
  { name: "Restaurant", kategorie: "Gastro" },
  { name: "WC beim Eingang", kategorie: "WC" },
] as const;

export default function KarteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [suche, setSuche] = useState("");
  const [standort, setStandort] = useState<Standort>();
  const [standortMeldung, setStandortMeldung] = useState("");
  const [standortLaedt, setStandortLaedt] = useState(false);
  async function standortAnzeigen() {
    setStandortLaedt(true);
    setStandortMeldung("");
    try {
      const berechtigung = await Location.requestForegroundPermissionsAsync();
      if (!berechtigung.granted) {
        setStandort(undefined);
        setStandortMeldung("Standortzugriff wurde nicht erlaubt.");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const aktuell = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setStandort(aktuell);
      setStandortMeldung(
        istImKartenausschnitt(aktuell)
          ? "Du bist hier"
          : "Dein Standort liegt ausserhalb des Kartenausschnitts.",
      );
    } catch {
      setStandort(undefined);
      setStandortMeldung("Der Standort konnte nicht ermittelt werden.");
    } finally {
      setStandortLaedt(false);
    }
  }
  const [jetzt, setJetzt] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setJetzt(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const naechstes = naechstesEvent(jetzt);
  const [kategorie, setKategorie] =
    useState<(typeof kategorien)[number]>("Alle");
  const treffer = orte.filter(
    (ort) =>
      (kategorie === "Alle" || ort.kategorie === kategorie) &&
      ort.name.toLocaleLowerCase().includes(suche.trim().toLocaleLowerCase()),
  );

  return (
    <View style={styles.seite}>
      <ScrollView
        contentContainerStyle={[
          styles.inhalt,
          { paddingTop: Math.max(insets.top, abstand.m) },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titel}>Zoo Zürich</Text>
        <Text style={styles.text}>Live Map & Event Planner</Text>
        <Feld
          label="Ort suchen"
          placeholder="Tier, Event oder WC"
          value={suche}
          onChangeText={setSuche}
        />
        <View style={styles.filter}>
          {kategorien.map((eintrag) => (
            <Pressable
              key={eintrag}
              accessibilityRole="button"
              accessibilityState={{ selected: kategorie === eintrag }}
              onPress={() => setKategorie(eintrag)}
              style={[
                styles.filterKnopf,
                kategorie === eintrag && styles.gewaehlt,
              ]}
            >
              <Text style={styles.text}>{eintrag}</Text>
            </Pressable>
          ))}
        </View>
        <Kartenansicht standort={standort} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Standort anzeigen"
          disabled={standortLaedt}
          onPress={() => void standortAnzeigen()}
          style={styles.standortKnopf}
        >
          <Ionicons name="locate-outline" size={20} color={farben.primaer} />
          <Text style={styles.aktion}>
            {standortLaedt ? "Standort wird gesucht" : "Standort anzeigen"}
          </Text>
        </Pressable>
        {standortMeldung ? (
          <Text style={styles.hinweis} accessibilityLiveRegion="polite">
            {standortMeldung}
          </Text>
        ) : null}
        <View style={styles.event}>
          <Text style={styles.untertitel}>Nächstes Event</Text>
          {naechstes ? (
            <>
              <Text style={styles.text}>
                {naechstes.zeit} - {naechstes.titel}
              </Text>
              <Text style={styles.hinweis}>
                In {Math.ceil((eventBeginn(naechstes, jetzt) - jetzt) / 60000)}{" "}
                Min. · Beispielprogramm
              </Text>
              <PrimaerButton
                titel="Route starten"
                onPress={() =>
                  router.push({
                    pathname: "/route",
                    params: { ziel: naechstes.ziel },
                  })
                }
              />
            </>
          ) : (
            <Text style={styles.text}>
              Heute keine weiteren Beispiel-Events.
            </Text>
          )}
        </View>
        <Text style={styles.untertitel}>Orte</Text>
        {treffer.length === 0 ? (
          <Text style={styles.text}>Keine Orte gefunden.</Text>
        ) : null}
        {treffer.map((ort) => (
          <Pressable
            key={ort.name}
            accessibilityRole="button"
            accessibilityLabel={`Route starten: ${ort.name}`}
            onPress={() =>
              router.push({ pathname: "/route", params: { ziel: ort.name } })
            }
            style={styles.ort}
          >
            <Text style={styles.text}>{ort.name}</Text>
            <Text style={styles.aktion}>Route starten</Text>
          </Pressable>
        ))}
        <Link href="/events" style={styles.link}>
          Alle Events und Fütterungen
        </Link>
      </ScrollView>
      <Navigation aktiv="karte" />
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
  untertitel: { fontSize: 18, fontWeight: "700", color: farben.text },
  text: { fontSize: 16, color: farben.text },
  hinweis: { fontSize: 14, color: farben.textSekundaer },
  event: {
    padding: abstand.m,
    backgroundColor: farben.flaeche,
    gap: abstand.s,
  },
  filter: { flexDirection: "row", flexWrap: "wrap", gap: abstand.s },
  filterKnopf: {
    paddingHorizontal: 12,
    paddingVertical: abstand.s,
    borderWidth: 1,
    borderColor: farben.rahmen,
    borderRadius: 6,
  },
  gewaehlt: { backgroundColor: farben.flaeche, borderColor: farben.primaer },
  ort: {
    paddingVertical: abstand.s,
    borderBottomWidth: 1,
    borderColor: farben.rahmen,
    gap: 4,
  },
  aktion: { fontSize: 14, color: farben.primaer },
  standortKnopf: {
    flexDirection: "row",
    alignItems: "center",
    gap: abstand.s,
    minHeight: 44,
  },
  link: { fontSize: 16, color: farben.primaer, paddingVertical: abstand.s },
});
