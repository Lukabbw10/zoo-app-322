import { Pressable, StyleSheet, Text, View } from "react-native";
import { abstand, farben } from "@/theme";

type Props = { label: string; wert: number; onChange: (neu: number) => void };

export function Zaehler({ label, wert, onChange }: Props) {
  return (
    <View style={styles.zeile}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: eins weniger`}
        disabled={wert === 0}
        onPress={() => onChange(wert - 1)}
        style={[styles.knopf, wert === 0 && styles.deaktiviert]}
      >
        <Text style={styles.knopfText}>-</Text>
      </Pressable>
      <Text style={styles.wert} accessibilityLabel={`${label}: ${wert}`}>
        {wert}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: eins mehr`}
        disabled={wert === 10}
        onPress={() => onChange(wert + 1)}
        style={[styles.knopf, wert === 10 && styles.deaktiviert]}
      >
        <Text style={styles.knopfText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  zeile: { flexDirection: "row", alignItems: "center", gap: abstand.s },
  label: { flex: 1, fontSize: 16, color: farben.text },
  knopf: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: farben.rahmen,
    borderRadius: 6,
  },
  deaktiviert: { opacity: 0.4 },
  knopfText: { fontSize: 24, color: farben.text },
  wert: { width: 28, textAlign: "center", fontSize: 16, color: farben.text },
});
