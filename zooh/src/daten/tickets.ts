export const preise = { erwachsene: 30, kinder: 15 };

export type TicketAuswahl = { erwachsene: number; kinder: number };

export function leseTicketAuswahl(params: {
  erwachsene?: string;
  kinder?: string;
}): TicketAuswahl | null {
  if (
    typeof params.erwachsene !== "string" ||
    typeof params.kinder !== "string" ||
    !/^(?:[0-9]|10)$/.test(params.erwachsene) ||
    !/^(?:[0-9]|10)$/.test(params.kinder)
  ) {
    return null;
  }

  const erwachsene = Number(params.erwachsene);
  const kinder = Number(params.kinder);
  return erwachsene + kinder > 0 ? { erwachsene, kinder } : null;
}

export function ticketTotal({ erwachsene, kinder }: TicketAuswahl) {
  return erwachsene * preise.erwachsene + kinder * preise.kinder;
}
