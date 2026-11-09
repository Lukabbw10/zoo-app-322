import "leaflet/dist/leaflet.css";
import { createElement, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Map as LeafletMap } from "leaflet";
import type { Standort } from "@/daten/karte";

export function Kartenansicht({ standort }: { standort?: Standort }) {
  const element = useRef<HTMLDivElement>(null);
  const [karte, setKarte] = useState<{
    instanz: LeafletMap;
    leaflet: typeof import("leaflet");
  } | null>(null);
  const [fehler, setFehler] = useState(false);

  useEffect(() => {
    let aktiv = true;
    let instanz: LeafletMap | undefined;
    let beobachter: ResizeObserver | undefined;

    void import("leaflet")
      .then((leaflet) => {
        if (!aktiv || !element.current) return;
        instanz = leaflet
          .map(element.current, { zoomControl: false })
          .setView([47.3847, 8.5738], 16);
        leaflet
          .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>',
          })
          .addTo(instanz);
        leaflet.control
          .zoom({ zoomInTitle: "Vergrössern", zoomOutTitle: "Verkleinern" })
          .addTo(instanz);
        if (typeof ResizeObserver !== "undefined") {
          beobachter = new ResizeObserver(() => instanz?.invalidateSize());
          beobachter.observe(element.current);
        }
        setKarte({ instanz, leaflet });
      })
      .catch(() => {
        if (aktiv) setFehler(true);
      });

    return () => {
      aktiv = false;
      beobachter?.disconnect();
      instanz?.remove();
    };
  }, []);

  useEffect(() => {
    if (!karte || !standort) return;
    const marker = karte.leaflet
      .circleMarker([standort.latitude, standort.longitude], {
        radius: 8,
        color: "#FFFFFF",
        weight: 3,
        fillColor: "#1768bd",
        fillOpacity: 1,
      })
      .addTo(karte.instanz)
      .bindTooltip("Du bist hier");
    return () => {
      marker.remove();
    };
  }, [karte, standort]);

  return (
    <View>
      <View style={styles.karte}>
        {createElement("div", {
          ref: element,
          role: "region",
          "aria-label": "Online-Karte Zoo Zürich",
          style: { width: "100%", height: "100%" },
        })}
      </View>
      {fehler ? (
        <Text style={styles.fehler}>
          Die Karte konnte nicht geladen werden.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  karte: {
    width: "100%",
    aspectRatio: 1.5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#9E9E9E",
  },
  fehler: { fontSize: 14, color: "#B71C1C", paddingVertical: 6 },
});
