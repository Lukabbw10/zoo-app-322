# Zooh! Karten- und Event-Prototyp

## Starten

Voraussetzung: Node.js 22.13 oder neuer.

```bash
npm install
npx expo start
```

Mit `w` öffnet sich die Browseransicht. Alternativ den QR-Code mit einer zum SDK passenden Expo-Go-Version öffnen. Für die Karte ist eine Internetverbindung nötig.

## Funktionen und Grenzen

- Die Karte zeigt OpenStreetMap im Browser und die native Kartenansicht auf dem Smartphone. Der Standort wird nur nach Freigabe abgerufen; erneutes Antippen aktualisiert ihn.
- Suche und Kategorien filtern eine beispielhafte Liste von Orten. Zielorte und Eventzeiten sind keine Live-Daten des Zoos.
- Event-Erinnerungen werden 15 Minuten vor Beginn eingerichtet, beziehungsweise sofort, wenn weniger als 15 Minuten verbleiben. Smartphone-Benachrichtigungen benötigen eine Freigabe und können durch das Betriebssystem verzögert werden. Im Browser funktioniert die Erinnerung nur, solange die Seite geöffnet ist.
- Die Route ist ein beschrifteter Platzhalter, keine echte Wegführung. Tickets und Profil sind in der Navigation deaktiviert.

## Prüfung

```bash
npx expo lint
npx tsc --noEmit
```

Die Gruppe muss den Expert Review und den Hallway-Test mit tatsächlichen Personen durchführen und die Beobachtungen anonym dokumentieren.
