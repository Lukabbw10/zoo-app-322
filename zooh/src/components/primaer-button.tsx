import { Pressable, StyleSheet, Text } from "react-native";
import { abstand, farben } from "@/theme";

type Props = { titel: string; onPress: () => void; deaktiviert?: boolean };

export function PrimaerButton(props: Props) {
  const { titel, onPress, deaktiviert = false } = props;
  return (
    <Pressable
      onPress={onPress}
      disabled={deaktiviert}
      accessibilityRole="button"
      style={[styles.button, deaktiviert ? styles.aus : null]}
    >
      <Text style={styles.text}>{titel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: farben.primaer,
    padding: abstand.m,
    borderRadius: 8,
  },
  aus: { backgroundColor: farben.rahmen },
  text: {
    color: farben.primaerText,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});