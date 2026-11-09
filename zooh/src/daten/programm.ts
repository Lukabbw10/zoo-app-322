export type Event = { id: string; titel: string; zeit: string; ziel: string };

export const programm: Event[] = [
  {
    id: "elefanten",
    titel: "Elefanten-Fütterung",
    zeit: "14:00",
    ziel: "Elefanten-Gehege",
  },
  {
    id: "raubtiere",
    titel: "Raubtier-Fütterung",
    zeit: "15:15",
    ziel: "Raubtier-Gehege",
  },
];

export function eventBeginn(event: Event, jetzt: number) {
  const [stunden, minuten] = event.zeit.split(":").map(Number);
  const beginn = new Date(jetzt);
  beginn.setHours(stunden, minuten, 0, 0);
  return beginn.getTime();
}

export function naechstesEvent(jetzt: number) {
  return programm.find((event) => eventBeginn(event, jetzt) > jetzt);
}
