import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import type { Standort } from "@/daten/karte";

export function Kartenansicht({ standort }: { standort?: Standort }) {
  return (
    <MapView
      accessibilityLabel="Online-Karte Zoo Zürich"
      style={styles.karte}
      initialRegion={{
        latitude: 47.3847,
        longitude: 8.5738,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >
      {standort ? <Marker coordinate={standort} title="Du bist hier" /> : null}
    </MapView>
  );
}

const styles = StyleSheet.create({
  karte: { height: 270, width: "100%" },
});
