# NANIL Pulse – App

Premium Wellbeing Demo App (Session, Geräte, Anleitung, Events, Sound-Profile).

## Branding

- **NANIL** = Orange (#e07030)
- **PULSE** = Türkis (#00c4aa)
- **Tagline:** DECODING WELLNESS. EMPOWERING LIFE.

Logo: Bild in `public/nanil-pulse-logo.png` ablegen – wird im Header angezeigt. Fehlt es, erscheint ein Fallback mit „N“ und farbigem Text.

## Starten

```bash
cd nanil-pulse-app
npm install
npm run dev
```

Dann im Browser: http://localhost:5173

## Build

```bash
npm run build
```

Ausgabe in `dist/`.

## Funktionen

- **Session:** 2-Minuten-Balance-Session, Start/Stop/Fortsetzen, Atemhinweis
- **Geräte:** Pulse Ring & Pulse Core (verbinden/trennen, Batterie, Signal)
- **Anleitung:** Ohr- und Brust-Platzierung (SVG), Schritte, Sicherheit
- **Events:** Nachricht, Anruf, Batterie niedrig, Signalverlust simulieren
- **Sound:** Profile Subtil, Premium, Immersiv, Demo (Web Audio API)
- **Sprachen:** DE, EN, TR
