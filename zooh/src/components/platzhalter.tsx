import { StyleSheet, Text, View } from "react-native";
import { abstand, farben } from "@/theme";

type Props = { label: string; hoehe?: number };

export function Platzhalter({ label, hoehe = 120 }: Props) {
  return (
    <View style={[styles.box, { height: hoehe }]} accessibilityLabel={label}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: farben.flaeche,
    borderWidth: 1,
    borderColor: farben.rahmen,
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: abstand.m,
  },
  label: { color: farben.textSekundaer, textAlign: "center" },
});