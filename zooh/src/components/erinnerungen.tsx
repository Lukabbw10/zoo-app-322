import * as Notifications from "expo-notifications";
import { AndroidImportance, IosAuthorizationStatus } from "expo-notifications";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AppState, Platform, StyleSheet, Text, View } from "react-native";
import { eventBeginn, programm } from "@/daten/programm";
import type { Event } from "@/daten/programm";
import { abstand, farben } from "@/theme";

type Erinnerungen = Record<string, number>;
type Kontext = {
  aktiv: Erinnerungen;
  ausstehend: string | null;
  meldung: string;
  umstellen: (event: Event, wert: boolean) => Promise<void>;
};

const Erinnerungskontext = createContext<Kontext | null>(null);
const speicherKey = "zooh-erinnerungen";
const kanal = "zooh-events";

if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export function ErinnerungenProvider({ children }: { children: ReactNode }) {
  const [aktiv, setAktiv] = useState<Erinnerungen>({});
  const [geladen, setGeladen] = useState(false);
  const [ausstehend, setAusstehend] = useState<string | null>(null);
  const [meldung, setMeldung] = useState("");

  useEffect(() => {
    async function laden() {
      try {
        if (Platform.OS === "web") {
          const gespeicherte = JSON.parse(
            localStorage.getItem(speicherKey) || "{}",
          );
          const eintraege = programm.flatMap((event) => {
            const zeit = gespeicherte[event.id];
            return typeof zeit === "number" && zeit > Date.now()
              ? [[event.id, zeit]]
              : [];
          });
          setAktiv(Object.fromEntries(eintraege));
        } else {
          const geplante =
            await Notifications.getAllScheduledNotificationsAsync();
          const eintraege = geplante.flatMap((eintrag) => {
            const event = programm.find(
              (punkt) => eintrag.identifier === `zooh-${punkt.id}`,
            );
            const zeit = eintrag.content.data?.zeit;
            return event && typeof zeit === "number" ? [[event.id, zeit]] : [];
          });
          setAktiv(Object.fromEntries(eintraege));
        }
      } catch {
        setMeldung("Erinnerungen konnten nicht geladen werden.");
      } finally {
        setGeladen(true);
      }
    }
    void laden();
    const subscription = AppState.addEventListener("change", (status) => {
      if (Platform.OS !== "web" && status === "active") void laden();
    });
    const benachrichtigung =
      Platform.OS === "web"
        ? null
        : Notifications.addNotificationReceivedListener((nachricht) => {
            const event = programm.find(
              (punkt) => nachricht.request.identifier === `zooh-${punkt.id}`,
            );
            if (!event) return;
            setAktiv((vorher) => {
              const aktualisiert = { ...vorher };
              delete aktualisiert[event.id];
              return aktualisiert;
            });
          });
    return () => {
      subscription.remove();
      benachrichtigung?.remove();
    };
  }, []);

  useEffect(() => {
    if (!geladen || Platform.OS !== "web") return;
    try {
      localStorage.setItem(speicherKey, JSON.stringify(aktiv));
    } catch {
      console.warn(
        "Erinnerungen bleiben nur während dieser Sitzung gespeichert.",
      );
    }
    const timer = Object.entries(aktiv).map(([id, zeit]) =>
      setTimeout(
        () => {
          const event = programm.find((punkt) => punkt.id === id);
          if (!event) return;
          const text = `${event.titel} beginnt um ${event.zeit} Uhr.`;
          setMeldung(text);
          if (
            typeof Notification !== "undefined" &&
            Notification.permission === "granted"
          ) {
            try {
              new Notification("Zooh! Erinnerung", { body: text });
            } catch {}
          }
          setAktiv((vorher) => {
            const aktualisiert = { ...vorher };
            delete aktualisiert[id];
            return aktualisiert;
          });
        },
        Math.max(0, zeit - Date.now()),
      ),
    );
    return () => timer.forEach(clearTimeout);
  }, [aktiv, geladen]);

  async function umstellen(event: Event, wert: boolean) {
    if (!geladen || ausstehend) return;
    setAusstehend(event.id);
    setMeldung("");
    try {
      if (!wert) {
        if (Platform.OS !== "web")
          await Notifications.cancelScheduledNotificationAsync(
            `zooh-${event.id}`,
          );
        setAktiv((vorher) => {
          const aktualisiert = { ...vorher };
          delete aktualisiert[event.id];
          return aktualisiert;
        });
        return;
      }
      const jetzt = Date.now();
      const beginn = eventBeginn(event, jetzt);
      if (beginn <= jetzt) {
        setMeldung("Dieses Beispiel-Event hat heute bereits begonnen.");
        return;
      }
      const zeit = Math.max(jetzt + 1000, beginn - 15 * 60000);
      if (Platform.OS === "web") {
        if (
          typeof Notification !== "undefined" &&
          Notification.permission === "default"
        ) {
          await Notification.requestPermission();
        }
      } else {
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync(kanal, {
            name: "Event-Erinnerungen",
            importance: AndroidImportance.HIGH,
          });
        }
        const berechtigung = await Notifications.requestPermissionsAsync();
        if (
          !berechtigung.granted &&
          berechtigung.ios?.status !== IosAuthorizationStatus.PROVISIONAL
        ) {
          setMeldung(
            "Bitte Benachrichtigungen in den Geräteeinstellungen erlauben.",
          );
          return;
        }
        await Notifications.scheduleNotificationAsync({
          identifier: `zooh-${event.id}`,
          content: {
            title: "Zooh! Erinnerung",
            body: `${event.titel} beginnt um ${event.zeit} Uhr.`,
            data: { zeit },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: new Date(zeit),
            channelId: kanal,
          },
        });
      }
      setAktiv((vorher) => ({ ...vorher, [event.id]: zeit }));
    } catch {
      setMeldung(
        "Erinnerung konnte nicht eingerichtet werden. Bitte versuche es erneut.",
      );
    } finally {
      setAusstehend(null);
    }
  }

  return (
    <Erinnerungskontext.Provider
      value={{
        aktiv,
        ausstehend: geladen ? ausstehend : "laden",
        meldung,
        umstellen,
      }}
    >
      <View style={styles.seite}>
        {meldung ? (
          <Text style={styles.meldung} accessibilityLiveRegion="polite">
            {meldung}
          </Text>
        ) : null}
        {children}
      </View>
    </Erinnerungskontext.Provider>
  );
}

export function useErinnerungen() {
  const kontext = useContext(Erinnerungskontext);
  if (!kontext) throw new Error("ErinnerungenProvider fehlt");
  return kontext;
}

const styles = StyleSheet.create({
  seite: { flex: 1 },
  meldung: {
    padding: abstand.s,
    color: farben.text,
    backgroundColor: farben.flaeche,
  },
});
