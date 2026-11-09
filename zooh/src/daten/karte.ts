export type Standort = { latitude: number; longitude: number };

export function kartenPosition(standort: Standort) {
  const breite = ((standort.longitude + 180) / 360) * 2 ** 15;
  const bogen = (standort.latitude * Math.PI) / 180;
  const hoehe = ((1 - Math.asinh(Math.tan(bogen)) / Math.PI) / 2) * 2 ** 15;
  return {
    links: ((breite - 17163) / 3) * 100,
    oben: ((hoehe - 11473) / 2) * 100,
  };
}

export function istImKartenausschnitt(standort: Standort) {
  const position = kartenPosition(standort);
  return (
    position.links >= 0 &&
    position.links <= 100 &&
    position.oben >= 0 &&
    position.oben <= 100
  );
}
