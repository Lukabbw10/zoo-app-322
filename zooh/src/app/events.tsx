import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { abstand, farben } from "@/theme";
import { Platzhalter } from "@/components/platzhalter";
import { PrimaerButton } from "@/components/primaer-button";

export default function EventsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.inhalt}>
      <Text style={styles.text}>
        Zweck: Übersicht aller Fütterungen & Vorführungstermine
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitel}>14:00 – Elefanten-Fütterung</Text>
        <PrimaerButton
          titel="Navigation dorthin starten"
          onPress={() =>
            router.push({
              pathname: "/route",
              params: { ziel: "Elefanten-Gehege" },
            })
          }
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitel}>15:15 – Raubtier-Fütterung</Text>
        <PrimaerButton
          titel="Navigation dorthin starten"
          onPress={() =>
            router.push({
              pathname: "/route",
              params: { ziel: "Raubtier-Gehege" },
            })
          }
        />
      </View>

      <Platzhalter label="Liste weiterer Events..." hoehe={100} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inhalt: { padding: abstand.m, gap: abstand.m },
  text: { fontSize: 16, color: farben.text },
  card: {
    backgroundColor: farben.flaeche,
    padding: abstand.m,
    borderRadius: 8,
    gap: abstand.s,
  },
  cardTitel: { fontSize: 16, fontWeight: "600", color: farben.text },
});
