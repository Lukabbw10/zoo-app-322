import { Platzhalter } from "@/components/platzhalter";
import type { Standort } from "@/daten/karte";

export function Kartenansicht({ standort }: { standort?: Standort }) {
  return <Platzhalter label="Online-Karte Zoo Zürich" hoehe={270} />;
}
