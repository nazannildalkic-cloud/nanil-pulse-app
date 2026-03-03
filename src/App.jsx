import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════
//  NANIL PULSE – Premium Wellbeing Demo App  v2.0
//  Brand: NANIL (orange) · PULSE (teal) · DECODING WELLNESS. EMPOWERING LIFE.
// ═══════════════════════════════════════════════════════════════════════

const B = {
  navy: "#2e2e38",
  navyMid: "#37373f",
  navyLt: "#3f3f48",
  navyBrd: "rgba(255,255,255,0.06)",
  orange: "#c9a227",
  orangeD: "#a68b1f",
  orangeLt: "#e2c96a",
  orangeDim: "rgba(201,162,39,0.12)",
  orangeBrd: "rgba(201,162,39,0.4)",
  teal: "#5d9aa8",
  tealD: "#4a7c88",
  tealLt: "#7eb8c4",
  tealDim: "rgba(93,154,168,0.12)",
  tealBrd: "rgba(93,154,168,0.35)",
  text: "#f4f4f6",
  textMut: "#9ca3af",
  textDim: "#4a4a5a",
  red: "#e05050",
  redDim: "rgba(224,80,80,0.12)",
  redBrd: "rgba(224,80,80,0.35)",
  green: "#40c880",
  greenDim: "rgba(64,200,128,0.12)",
};

const T = {
  de: {
    app: "NANIL Pulse",
    tagline: "Advanced Wellbeing System",
    taglineBrand: "DECODING WELLNESS. EMPOWERING LIFE.",
    footer: "Demo · Simulation · Kein Wellbeing-Rat",
    tabs: { session: "Session", device: "Geräte", guide: "Anleitung", events: "Events", sounds: "Sound" },
    session: {
      title: "Balance Session", duration: "2 Minuten",
      start: "Session starten", stop: "Session stoppen", resume: "Fortsetzen",
      completed: "Abgeschlossen", ready: "Bereit",
      breath: "Atme ruhig ein und aus  ·  Lass los",
      notConn: "Bitte zuerst Ring verbinden",
    },
    device: {
      ring: "Pulse Ring", patch: "Pulse Core Patch",
      conn: "Verbunden", disc: "Getrennt",
      connect: "Verbinden", disconnect: "Trennen",
      battery: "Batterie", signal: "Signal",
      sigGood: "Optimal", sigWeak: "Schwach", sigLost: "Verloren",
      reattach: "Neu anbringen", earMode: "Ohr-Modus aktiv",
    },
    gestures: {
      title: "Ring-Gesten",
      tap: "Einzel-Tap", tapDesc: "Nachricht abspielen",
      dtap: "Doppel-Tap", dtapDesc: "Anruf annehmen",
      lp: "Lang drücken", lpDesc: "Optionen",
      last: "Letzter Befehl",
    },
    call: {
      incoming: "Eingehender Anruf", paused: "Session pausiert",
      accept: "Annehmen", decline: "Ablehnen",
      active: "Gespräch aktiv", ended: "Anruf beendet",
      resuming: "Session wird fortgesetzt …",
      hint: "Ring Doppel-Tap zum Annehmen",
    },
    msg: {
      incoming: "Neue Nachricht", bone: "Knochenvibration",
      hint: "Ring Einzel-Tap zum Abspielen",
      playing: "Wird abgespielt …", done: "Fertig",
      close: "Schließen", play: "Abspielen",
    },
    events: {
      title: "Events simulieren",
      msg: "Nachricht simulieren", msgSub: "Knochenvibration · Tap → abspielen",
      call: "Anruf simulieren", callSub: "Eingehend · Double-Tap → annehmen",
      bat: "Patch Batterie niedrig", batSub: "Warnsignal · Batterie kritisch",
      sig: "Patch Signalverlust", sigSub: "6 Sek. Simulation",
      info: "Im echten Gerät über Bluetooth ausgelöst.",
    },
    guide: {
      ring: "Pulse Ring – Platzierung",
      ringSub: "Cymba Conchae · Ohrmuschel",
      ringSteps: ["Ring leicht anlegen", "Sanften Kontakt halten", "Session starten"],
      ringAngle: "15 – 25° Anpresswinkel",
      ringNoPressure: "Kein Druck in Gehörgang",
      ringContact: "Kontaktpunkt: Cymba Conchae",
      patch: "Pulse Core – Platzierung",
      patchSub: "Oberer Sternalbereich · Brust",
      patchSteps: ["Haut reinigen & trocknen", "Patch zentriert aufkleben", "10 Sek. andrücken"],
      patchCenter: "Zentriert auf Mittellinie",
      patchNot: "Nicht anbringen auf:",
      avoidList: ["Narben", "Sensitiver Brustbereich", "Beschädigte Haut"],
      safety: "Nur für Wellbeing. Bei Unwohlsein sofort abnehmen.",
    },
    sounds: {
      title: "Sound-Profile",
      subtle: "Subtil", premium: "Premium", immersive: "Immersiv", demo: "Demo",
      subtilDesc: "95 Hz · sanft pulsierend",
      premiumDesc: "90+180 Hz · zwei Schichten",
      immersivDesc: "82 Hz · tiefe Wellen",
      demoDesc: "100 Hz · Investor-Demo",
      test: "Profil testen", testing: "Läuft …",
    },
    vitals: {
      title: "Echtzeit-Vitaldaten",
      hr: "Herzfrequenz", hrUnit: "BPM",
      hrv: "Herzratenvariabilität", hrvUnit: "ms",
      breath: "Atemfrequenz", breathUnit: "Atemzüge/Min",
      stress: "Stress-Score", stressLow: "Entspannt", stressMid: "Moderat", stressHigh: "Erhöht", stressCrit: "Kritisch",
      loop: "Closed-Loop Status",
      loopActive: "Aktiv — Stimulation wird automatisch angepasst",
      loopIdle: "Verbinde Ring & Patch und starte eine Session",
      loopDesc: "Das System misst kontinuierlich deine Vitalwerte und passt die Vagusnerv-Stimulation in Echtzeit an.",
      voice: "Stimmanalyse & Biomarker",
      voiceDesc: "KI analysiert Mikrotremor, Tonhöhenvarianz, Grundfrequenz und Sprachrhythmus — für Stress-, Hormon- und Wellbeing-Erkennung.",
      voiceStart: "Stimmanalyse starten",
      voiceRunning: "Analysiere Stimme …",
      voiceResult: "Ergebnis",
      voiceCalm: "Ruhig & ausgeglichen",
      voiceTense: "Leichte Anspannung erkannt",
      voiceStressed: "Stress erkannt — Session empfohlen",
      voiceTip: "Sprich 10 Sekunden natürlich in dein Handy. Die KI erkennt Stress-, Hormon- und Gesundheitsmuster in deiner Stimme.",
      voiceHormone: "Hormoneller Status (Stimme)",
      voiceCortisol: "Cortisol (Stress)",
      voiceTestosterone: "Testosteron",
      voiceEnergy: "Energie-Level",
      voiceStudies: "Wissenschaftliche Grundlage",
      voiceStudy1: "Luxembourg Institute of Health — KI-Stimmanalyse erkennt Diabetes-Marker mit 89% Genauigkeit (2023)",
      voiceStudy2: "Pisanski et al. — Stimmfrequenz korreliert mit Testosteron- und Cortisol-Spiegeln (Psychoneuroendocrinology, 2018)",
      voiceStudy3: "Pipitone & Gallup — Stimmveränderungen über den Menstruationszyklus korrelieren mit Östrogen-Peaks (Evolution & Human Behavior, 2008)",
      voiceStudy4: "CoLive Voice (Luxemburg) — Größte Stimm-Biomarker-Studie: 50.000+ Proben zur Gesundheitserkennung",
      voiceNotJustWomen: "Gilt für alle — nicht nur zyklusbasiert",
      voiceForAll: "Stimm-Biomarker erkennen universelle Gesundheitsindikatoren: Cortisol-Stress, Testosteron-Level, Schilddrüsenfunktion, Energiestatus und emotionales Wellbeing.",
      patchData: "Biosensor-Daten (Patch)",
      skinTemp: "Hauttemperatur", skinTempUnit: "°C",
      motion: "Bewegung", motionLow: "Ruhig", motionMod: "Leicht", motionHigh: "Aktiv",
      hormone: "Hormon-Tracking",
      hormoneDesc: "Der Biosensor-Patch erfasst kontinuierlich Hauttemperatur, HRV-Muster und Mikro-Schweiß zur Hormonanalyse — für alle Geschlechter.",
      hormoneGeneral: "Allgemeine Hormone",
      cortisolLevel: "Cortisol",
      testosteroneLevel: "Testosteron",
      thyroidLevel: "Schilddrüse (T3/T4)",
      melatoninLevel: "Melatonin",
      cycleDay: "Zyklustag", cycleDayUnit: "von 28",
      phase: "Phase", follicular: "Follikelphase", ovulation: "Eisprung", luteal: "Lutealphase", menstrual: "Menstruation",
      fertility: "Fruchtbarkeit", fertilityHigh: "Hoch", fertilityMed: "Mittel", fertilityLow: "Niedrig",
      estrogen: "Östrogen", progesterone: "Progesteron", lh: "LH-Anstieg",
      ovulationAlert: "Eisprung-Fenster erkannt",
      ovulationDesc: "Basaltemperatur + HRV-Muster deuten auf Eisprung hin.",
      tempTrend: "Basaltemperatur-Trend",
    },
    vagus: {
      title: "Vagusnerv-Stimulation",
      subtitle: "So aktivierst du den Vagusnerv am Ohr",
      anatomy: "Ohr-Anatomie & Stimulationspunkt",
      cymba: "Cymba Conchae",
      cymbaDesc: "Der auriculäre Ast des Vagusnervs (ABVN) innerviert die Cymba Conchae — eine Mulde in der oberen Ohrmuschel. Das ist der einzige Punkt am Ohr, an dem der Vagusnerv direkt unter der Haut liegt.",
      howTo: "So geht's",
      step1: "Finde die Cymba Conchae",
      step1d: "Die Mulde direkt über dem Gehörgang, im oberen inneren Teil der Ohrmuschel. Fühle mit dem Finger nach der flachen Vertiefung.",
      step2: "Ring positionieren",
      step2d: "Setze den NANIL Pulse Ring so auf, dass der Kontaktpunkt die Cymba Conchae berührt. Winkel: 15-25° zur Hautoberfläche.",
      step3: "Sanften Kontakt halten",
      step3d: "Kein Druck nötig! Leichter Hautkontakt reicht. Die Mikrostimulation arbeitet mit minimaler Intensität.",
      step4: "Session starten",
      step4d: "Starte eine Balance Session. Das System beginnt automatisch mit der Vagusnerv-Stimulation.",
      warning: "NICHT in den Gehörgang drücken! Der Ring gehört in die obere Ohrmuschel, nicht in den Ohrkanal.",
      science: "Wissenschaftlicher Hintergrund",
      scienceDesc: "Transkutane auriculäre Vagusnervstimulation (taVNS) aktiviert den parasympathischen Zweig des autonomen Nervensystems. Studien zeigen: reduzierte Herzfrequenz, verbesserte HRV, Senkung des Cortisol-Spiegels.",
      discreet: "Unauffällige Nutzung",
      discreetDesc: "Der Ring sieht aus wie ein modernes Ear Cuff. Niemand bemerkt die Stimulation.",
      discreetCall: "Anrufe diskret führen",
      discreetCallDesc: "Knochenleitung überträgt Audio über den Ring. Halte die Hand unauffällig ans Ohr — wie beim Telefonieren. Eingehende Anrufe per Doppel-Tap annehmen.",
      placement: "Ring-Platzierung am Ohr",
      placementDesc: "Der Zeigefinger hält den Ring sanft an die Cymba Conchae — die obere Mulde der Ohrmuschel. Kein Druck nötig, nur leichter Hautkontakt.",
      discreetMsg: "Nachrichten abhören",
      discreetMsgDesc: "Nachrichten werden per Knochenvibration übertragen. Einzel-Tap zum Abspielen. Nur du hörst den Inhalt — komplett privat.",
      effects: "Spürbare Effekte",
      effect1: "Sofortige Entspannung",
      effect1d: "Aktivierung des Parasympathikus in 30-60 Sekunden",
      effect2: "Stress-Reduktion",
      effect2d: "Messbare Senkung des Cortisol-Spiegels",
      effect3: "Verbesserte HRV",
      effect3d: "Herzratenvariabilität steigt um 15-25%",
      effect4: "Mentale Klarheit",
      effect4d: "Verbesserte Konzentration und Fokus",
    },
    ui: {
      eventLog: "Ereignisprotokoll",
      trend: "Trend (letzte Messungen)",
      hangUp: "Auflegen",
      paused: "Pausiert",
      active: "AKTIV",
      contact: "Kontakt aufnehmen",
      contactSub: "Fragen, Partnerschaften oder Pitch Deck anfordern",
      whatsapp: "WhatsApp schreiben",
      email: "E-Mail senden",
    },
    log: {
      sesStart: "▶ Session gestartet", sesStop: "■ Session gestoppt",
      sesDone: "✓ Session abgeschlossen", sesResume: "↺ Session fortgesetzt",
      msgIn: "💬 Nachricht empfangen", msgPlay: "▶ Nachricht wird abgespielt", msgClose: "✕ Nachricht geschlossen",
      callIn: "📞 Eingehender Anruf", callAcc: "✓ Anruf angenommen", callEnd: "✓ Anruf beendet",
      callDec: "✕ Anruf abgelehnt", callHang: "📵 Aufgelegt",
      gesture: "👆 Ring-Geste", batCrit: "⚠ Patch Batterie kritisch",
      sigLost: "📡 Patch Signalverlust", sigBack: "📡 Signal wiederhergestellt",
      ringOff: "Ring getrennt", ringOn: "Ring verbunden",
      patchOff: "Patch getrennt", patchOn: "Patch verbunden",
      voiceCalm: "🎤 Stimme: Entspannt", voiceTense: "🎤 Stimme: Leichte Anspannung", voiceStress: "🎤 Stimme: Stress erkannt",
    },
  },
  en: {
    app: "NANIL Pulse",
    tagline: "Advanced Wellbeing System",
    taglineBrand: "DECODING WELLNESS. EMPOWERING LIFE.",
    footer: "Demo · Simulation · Not wellbeing advice",
    tabs: { session: "Session", device: "Devices", guide: "Guide", events: "Events", sounds: "Sound" },
    session: {
      title: "Balance Session", duration: "2 Minutes",
      start: "Start Session", stop: "Stop Session", resume: "Resume",
      completed: "Completed", ready: "Ready",
      breath: "Breathe gently in and out  ·  Let go",
      notConn: "Please connect ring first",
    },
    device: {
      ring: "Pulse Ring", patch: "Pulse Core Patch",
      conn: "Connected", disc: "Disconnected",
      connect: "Connect", disconnect: "Disconnect",
      battery: "Battery", signal: "Signal",
      sigGood: "Optimal", sigWeak: "Weak", sigLost: "Lost",
      reattach: "Reattach", earMode: "Ear Mode Active",
    },
    gestures: {
      title: "Ring Gestures",
      tap: "Single Tap", tapDesc: "Play message",
      dtap: "Double Tap", dtapDesc: "Answer call",
      lp: "Long Press", lpDesc: "Options",
      last: "Last command",
    },
    call: {
      incoming: "Incoming Call", paused: "Session paused",
      accept: "Accept", decline: "Decline",
      active: "Call active", ended: "Call ended",
      resuming: "Resuming session …",
      hint: "Ring Double Tap to answer",
    },
    msg: {
      incoming: "New Message", bone: "Bone Vibration",
      hint: "Ring Single Tap to listen",
      playing: "Playing …", done: "Done",
      close: "Close", play: "Play",
    },
    events: {
      title: "Simulate Events",
      msg: "Simulate Message", msgSub: "Bone vibration · Tap → play",
      call: "Simulate Call", callSub: "Incoming · Double-Tap → answer",
      bat: "Patch Battery Low", batSub: "Alert signal · Critical battery",
      sig: "Patch Signal Loss", sigSub: "6 sec simulation",
      info: "In real device triggered via Bluetooth.",
    },
    guide: {
      ring: "Pulse Ring – Placement",
      ringSub: "Cymba Conchae · Ear",
      ringSteps: ["Place ring gently", "Maintain light contact", "Start session"],
      ringAngle: "15 – 25° contact angle",
      ringNoPressure: "No pressure into ear canal",
      ringContact: "Contact point: Cymba Conchae",
      patch: "Pulse Core – Placement",
      patchSub: "Upper sternal area · Chest",
      patchSteps: ["Clean & dry skin", "Center patch on midline", "Press 10 sec"],
      patchCenter: "Centered on midline",
      patchNot: "Do not apply on:",
      avoidList: ["Scars", "Sensitive chest area", "Damaged skin"],
      safety: "For wellbeing only. Remove immediately if discomfort occurs.",
    },
    sounds: {
      title: "Sound Profiles",
      subtle: "Subtle", premium: "Premium", immersive: "Immersive", demo: "Demo",
      subtilDesc: "95 Hz · gentle pulse",
      premiumDesc: "90+180 Hz · dual layer",
      immersivDesc: "82 Hz · deep waves",
      demoDesc: "100 Hz · Investor Demo",
      test: "Test Profile", testing: "Running …",
    },
    vitals: {
      title: "Real-Time Vitals",
      hr: "Heart Rate", hrUnit: "BPM",
      hrv: "Heart Rate Variability", hrvUnit: "ms",
      breath: "Breathing Rate", breathUnit: "breaths/min",
      stress: "Stress Score", stressLow: "Relaxed", stressMid: "Moderate", stressHigh: "Elevated", stressCrit: "Critical",
      loop: "Closed-Loop Status",
      loopActive: "Active — Stimulation auto-adjusting",
      loopIdle: "Connect Ring & Patch and start a session",
      loopDesc: "The system continuously measures your vitals and adjusts vagus nerve stimulation in real-time.",
      voice: "Voice Analysis & Biomarkers",
      voiceDesc: "AI analyzes micro-tremor, pitch variance, fundamental frequency and speech rhythm — for stress, hormone and wellbeing detection.",
      voiceStart: "Start Voice Analysis",
      voiceRunning: "Analyzing voice …",
      voiceResult: "Result",
      voiceCalm: "Calm & balanced",
      voiceTense: "Slight tension detected",
      voiceStressed: "Stress detected — Session recommended",
      voiceTip: "Speak naturally for 10 seconds. The AI detects stress, hormone and health patterns in your voice.",
      voiceHormone: "Hormonal Status (Voice)",
      voiceCortisol: "Cortisol (Stress)",
      voiceTestosterone: "Testosterone",
      voiceEnergy: "Energy Level",
      voiceStudies: "Scientific Foundation",
      voiceStudy1: "Luxembourg Institute of Health — AI voice analysis detects diabetes markers with 89% accuracy (2023)",
      voiceStudy2: "Pisanski et al. — Voice frequency correlates with testosterone and cortisol levels (Psychoneuroendocrinology, 2018)",
      voiceStudy3: "Pipitone & Gallup — Voice changes across menstrual cycle correlate with estrogen peaks (Evolution & Human Behavior, 2008)",
      voiceStudy4: "CoLive Voice (Luxembourg) — Largest voice biomarker study: 50,000+ samples for health detection",
      voiceNotJustWomen: "For everyone — not just cycle-based",
      voiceForAll: "Voice biomarkers detect universal health indicators: cortisol stress, testosterone levels, thyroid function, energy status and emotional wellbeing.",
      patchData: "Biosensor Data (Patch)",
      skinTemp: "Skin Temperature", skinTempUnit: "°C",
      motion: "Motion", motionLow: "Still", motionMod: "Light", motionHigh: "Active",
      hormone: "Hormone Tracking",
      hormoneDesc: "The biosensor patch continuously tracks skin temperature, HRV patterns and micro-perspiration for hormone analysis — for all genders.",
      hormoneGeneral: "General Hormones",
      cortisolLevel: "Cortisol",
      testosteroneLevel: "Testosterone",
      thyroidLevel: "Thyroid (T3/T4)",
      melatoninLevel: "Melatonin",
      cycleDay: "Cycle Day", cycleDayUnit: "of 28",
      phase: "Phase", follicular: "Follicular Phase", ovulation: "Ovulation", luteal: "Luteal Phase", menstrual: "Menstruation",
      fertility: "Fertility", fertilityHigh: "High", fertilityMed: "Medium", fertilityLow: "Low",
      estrogen: "Estrogen", progesterone: "Progesterone", lh: "LH Surge",
      ovulationAlert: "Ovulation Window Detected",
      ovulationDesc: "Basal temperature + HRV patterns indicate ovulation.",
      tempTrend: "Basal Temperature Trend",
    },
    vagus: {
      title: "Vagus Nerve Stimulation",
      subtitle: "How to activate the vagus nerve at your ear",
      anatomy: "Ear Anatomy & Stimulation Point",
      cymba: "Cymba Conchae",
      cymbaDesc: "The auricular branch of the vagus nerve (ABVN) innervates the Cymba Conchae — a hollow in the upper ear. This is the only point on the ear where the vagus nerve lies directly beneath the skin.",
      howTo: "How It Works",
      step1: "Find the Cymba Conchae",
      step1d: "The hollow just above the ear canal, in the upper inner part of the ear. Feel for the flat depression with your finger.",
      step2: "Position the Ring",
      step2d: "Place the NANIL Pulse Ring so the contact point touches the Cymba Conchae. Angle: 15-25° to skin surface.",
      step3: "Maintain Light Contact",
      step3d: "No pressure needed! Light skin contact is sufficient. Micro-stimulation works at minimal intensity.",
      step4: "Start Session",
      step4d: "Start a Balance Session. The system automatically begins vagus nerve stimulation.",
      warning: "Do NOT press into the ear canal! The ring belongs in the upper ear, not the ear canal.",
      science: "Scientific Background",
      scienceDesc: "Transcutaneous auricular vagus nerve stimulation (taVNS) activates the parasympathetic branch of the autonomic nervous system. Studies show: reduced heart rate, improved HRV, lowered cortisol levels.",
      discreet: "Discreet Usage",
      discreetDesc: "The ring looks like a modern ear cuff. Nobody notices the stimulation.",
      discreetCall: "Take Calls Discreetly",
      discreetCallDesc: "Bone conduction transmits audio through the ring. Hold your hand casually to your ear — like making a phone call. Answer incoming calls with a double-tap.",
      placement: "Ring Placement on Ear",
      placementDesc: "Your index finger gently holds the ring against the Cymba Conchae — the upper hollow of the ear. No pressure needed, just light skin contact.",
      discreetMsg: "Listen to Messages",
      discreetMsgDesc: "Messages are transmitted via bone vibration. Single-tap to play. Only you hear the content — completely private.",
      effects: "Noticeable Effects",
      effect1: "Immediate Relaxation",
      effect1d: "Parasympathetic activation in 30-60 seconds",
      effect2: "Stress Reduction",
      effect2d: "Measurable cortisol level decrease",
      effect3: "Improved HRV",
      effect3d: "Heart rate variability increases 15-25%",
      effect4: "Mental Clarity",
      effect4d: "Enhanced concentration and focus",
    },
    ui: {
      eventLog: "Event Log",
      trend: "Trend (recent measurements)",
      hangUp: "Hang Up",
      paused: "Paused",
      active: "ACTIVE",
      contact: "Contact Us",
      contactSub: "Questions, partnerships, or request pitch deck",
      whatsapp: "Message on WhatsApp",
      email: "Send Email",
    },
    log: {
      sesStart: "▶ Session started", sesStop: "■ Session stopped",
      sesDone: "✓ Session completed", sesResume: "↺ Session resumed",
      msgIn: "💬 Message received", msgPlay: "▶ Playing message", msgClose: "✕ Message dismissed",
      callIn: "📞 Incoming call", callAcc: "✓ Call accepted", callEnd: "✓ Call ended",
      callDec: "✕ Call declined", callHang: "📵 Hung up",
      gesture: "👆 Ring gesture", batCrit: "⚠ Patch battery critical",
      sigLost: "📡 Patch signal lost", sigBack: "📡 Signal restored",
      ringOff: "Ring disconnected", ringOn: "Ring connected",
      patchOff: "Patch disconnected", patchOn: "Patch connected",
      voiceCalm: "🎤 Voice: Relaxed", voiceTense: "🎤 Voice: Slight tension", voiceStress: "🎤 Voice: Stress detected",
    },
  },
  tr: {
    app: "NANIL Pulse",
    tagline: "Gelişmiş Esenlik Sistemi",
    taglineBrand: "DECODING WELLNESS. EMPOWERING LIFE.",
    footer: "Demo · Simülasyon · Tavsiye değil",
    tabs: { session: "Seans", device: "Cihazlar", guide: "Kılavuz", events: "Olaylar", sounds: "Ses" },
    session: {
      title: "Denge Seansı", duration: "2 Dakika",
      start: "Seans Başlat", stop: "Durdur", resume: "Devam Et",
      completed: "Tamamlandı", ready: "Hazır",
      breath: "Sakin nefes al ve ver  ·  Bırak",
      notConn: "Lütfen önce yüzüğü bağlayın",
    },
    device: {
      ring: "Pulse Ring", patch: "Pulse Core Patch",
      conn: "Bağlı", disc: "Bağlı Değil",
      connect: "Bağlan", disconnect: "Kes",
      battery: "Pil", signal: "Sinyal",
      sigGood: "Optimal", sigWeak: "Zayıf", sigLost: "Kayıp",
      reattach: "Yeniden tak", earMode: "Kulak modu aktif",
    },
    gestures: {
      title: "Yüzük Hareketleri",
      tap: "Tek Dokunuş", tapDesc: "Mesaj dinle",
      dtap: "Çift Dokunuş", dtapDesc: "Aramayı yanıtla",
      lp: "Uzun Basış", lpDesc: "Seçenekler",
      last: "Son komut",
    },
    call: {
      incoming: "Gelen Arama", paused: "Seans duraklatıldı",
      accept: "Kabul", decline: "Reddet",
      active: "Arama aktif", ended: "Arama bitti",
      resuming: "Seans devam ediyor …",
      hint: "Çift dokunuş ile yanıtla",
    },
    msg: {
      incoming: "Yeni Mesaj", bone: "Kemik Titreşimi",
      hint: "Tek dokunuş ile dinle",
      playing: "Çalıyor …", done: "Bitti",
      close: "Kapat", play: "Oynat",
    },
    events: {
      title: "Olayları Simüle Et",
      msg: "Mesaj Simülasyonu", msgSub: "Kemik titreşim · Dokun → oynat",
      call: "Arama Simülasyonu", callSub: "Gelen arama · Çift-Dokun → yanıtla",
      bat: "Pil Düşük", batSub: "Uyarı · Kritik pil",
      sig: "Sinyal Kaybı", sigSub: "6 sn simülasyon",
      info: "Gerçek cihazda Bluetooth ile tetiklenir.",
    },
    guide: {
      ring: "Pulse Ring – Yerleşim",
      ringSub: "Cymba Conchae · Kulak",
      ringSteps: ["Yüzüğü hafifçe yerleştir", "Hafif temas sürdür", "Seansı başlat"],
      ringAngle: "15 – 25° baskı açısı",
      ringNoPressure: "Kulak kanalına baskı yapma",
      ringContact: "Temas noktası: Cymba Conchae",
      patch: "Pulse Core – Yerleşim",
      patchSub: "Üst sternum · Göğüs",
      patchSteps: ["Cildi temizle & kurut", "Ortala yapıştır", "10 sn bastır"],
      patchCenter: "Orta hatta hizala",
      patchNot: "Uygulanmaması gereken:",
      avoidList: ["Yara izleri", "Hassas bölge", "Hasarlı cilt"],
      safety: "Yalnızca esenlik için. Rahatsızlık hissederseniz hemen çıkarın.",
    },
    sounds: {
      title: "Ses Profilleri",
      subtle: "Narin", premium: "Premium", immersive: "Derin", demo: "Demo",
      subtilDesc: "95 Hz · yumuşak nabız",
      premiumDesc: "90+180 Hz · çift katman",
      immersivDesc: "82 Hz · derin dalgalar",
      demoDesc: "100 Hz · Yatırımcı Demo",
      test: "Profil Test Et", testing: "Çalışıyor …",
    },
    vitals: {
      title: "Gerçek Zamanlı Vital Veriler",
      hr: "Kalp Atış Hızı", hrUnit: "BPM",
      hrv: "Kalp Atış Değişkenliği", hrvUnit: "ms",
      breath: "Solunum Hızı", breathUnit: "nefes/dk",
      stress: "Stres Skoru", stressLow: "Rahat", stressMid: "Orta", stressHigh: "Yüksek", stressCrit: "Kritik",
      loop: "Kapalı Döngü Durumu",
      loopActive: "Aktif — Stimülasyon otomatik ayarlanıyor",
      loopIdle: "Ring ve Patch'i bağlayıp bir seans başlatın",
      loopDesc: "Sistem sürekli olarak vital değerlerinizi ölçer ve vagus siniri stimülasyonunu gerçek zamanlı ayarlar.",
      voice: "Ses Analizi & Biyobelirteçler",
      voiceDesc: "Yapay zeka, mikro titreşim, perde varyansı, temel frekans ve konuşma ritmini analiz eder — stres, hormon ve sağlık tespiti için.",
      voiceStart: "Ses Analizini Başlat",
      voiceRunning: "Ses analiz ediliyor …",
      voiceResult: "Sonuç",
      voiceCalm: "Sakin ve dengeli",
      voiceTense: "Hafif gerginlik tespit edildi",
      voiceStressed: "Stres tespit edildi — Seans önerilir",
      voiceTip: "10 saniye doğal konuşun. Yapay zeka sesinizde stres, hormon ve sağlık kalıplarını tespit eder.",
      voiceHormone: "Hormonal Durum (Ses)",
      voiceCortisol: "Kortizol (Stres)",
      voiceTestosterone: "Testosteron",
      voiceEnergy: "Enerji Seviyesi",
      voiceStudies: "Bilimsel Temel",
      voiceStudy1: "Lüksemburg Sağlık Enstitüsü — Yapay zeka ses analizi diyabet belirteçlerini %89 doğrulukla tespit eder (2023)",
      voiceStudy2: "Pisanski ve ark. — Ses frekansı testosteron ve kortizol seviyeleri ile ilişkilidir (Psychoneuroendocrinology, 2018)",
      voiceStudy3: "Pipitone & Gallup — Adet döngüsü boyunca ses değişiklikleri östrojen zirveleri ile ilişkilidir (Evolution & Human Behavior, 2008)",
      voiceStudy4: "CoLive Voice (Lüksemburg) — En büyük ses biyobelirteç çalışması: Sağlık tespiti için 50.000+ örnek",
      voiceNotJustWomen: "Herkes için — sadece döngü bazlı değil",
      voiceForAll: "Ses biyobelirteçleri evrensel sağlık göstergelerini tespit eder: kortizol stresi, testosteron seviyeleri, tiroid fonksiyonu, enerji durumu ve duygusal sağlık.",
      patchData: "Biyosensör Verileri (Patch)",
      skinTemp: "Cilt Sıcaklığı", skinTempUnit: "°C",
      motion: "Hareket", motionLow: "Sakin", motionMod: "Hafif", motionHigh: "Aktif",
      hormone: "Hormon Takibi",
      hormoneDesc: "Biyosensör patch, hormon analizi için cilt sıcaklığını, HRV kalıplarını ve mikro terlemeyi sürekli takip eder — tüm cinsiyetler için.",
      hormoneGeneral: "Genel Hormonlar",
      cortisolLevel: "Kortizol",
      testosteroneLevel: "Testosteron",
      thyroidLevel: "Tiroid (T3/T4)",
      melatoninLevel: "Melatonin",
      cycleDay: "Döngü Günü", cycleDayUnit: "/ 28",
      phase: "Faz", follicular: "Foliküler Faz", ovulation: "Yumurtlama", luteal: "Luteal Faz", menstrual: "Adet Dönemi",
      fertility: "Doğurganlık", fertilityHigh: "Yüksek", fertilityMed: "Orta", fertilityLow: "Düşük",
      estrogen: "Östrojen", progesterone: "Progesteron", lh: "LH Yükselişi",
      ovulationAlert: "Yumurtlama Penceresi Tespit Edildi",
      ovulationDesc: "Bazal sıcaklık + HRV kalıpları yumurtlamaya işaret ediyor.",
      tempTrend: "Bazal Sıcaklık Trendi",
    },
    vagus: {
      title: "Vagus Siniri Stimülasyonu",
      subtitle: "Kulağınızda vagus sinirini nasıl aktive edersiniz",
      anatomy: "Kulak Anatomisi ve Stimülasyon Noktası",
      cymba: "Cymba Conchae",
      cymbaDesc: "Vagus sinirinin auriküler dalı (ABVN), Cymba Conchae'yi innerve eder — üst kulak kepçesindeki bir çukur. Vagus sinirinin doğrudan cildin altında olduğu kulaktaki tek nokta burasıdır.",
      howTo: "Nasıl Yapılır",
      step1: "Cymba Conchae'yi Bulun",
      step1d: "Kulak kanalının hemen üzerindeki çukur, kulak kepçesinin üst iç kısmında. Parmağınızla düz girintiyi hissedin.",
      step2: "Yüzüğü Konumlandırın",
      step2d: "NANIL Pulse yüzüğünü temas noktası Cymba Conchae'ye değecek şekilde yerleştirin. Açı: cilde 15-25°.",
      step3: "Hafif Temas Sürdürün",
      step3d: "Baskı gerekmez! Hafif cilt teması yeterlidir. Mikro stimülasyon minimum yoğunlukta çalışır.",
      step4: "Seansı Başlatın",
      step4d: "Bir Denge Seansı başlatın. Sistem otomatik olarak vagus siniri stimülasyonuna başlar.",
      warning: "Kulak kanalına BASMAYIN! Yüzük üst kulak kepçesine aittir, kulak kanalına değil.",
      science: "Bilimsel Arka Plan",
      scienceDesc: "Transkutan auriküler vagus siniri stimülasyonu (taVNS), otonom sinir sisteminin parasempatik dalını aktive eder. Çalışmalar gösterir: azalan kalp atış hızı, gelişmiş HRV, düşen kortizol seviyeleri.",
      discreet: "Fark Edilmeden Kullanım",
      discreetDesc: "Yüzük modern bir ear cuff gibi görünür. Stimülasyonu kimse fark etmez.",
      discreetCall: "Gizlice Arama Yapın",
      discreetCallDesc: "Kemik iletimi, ses yüzük üzerinden iletir. Elinizi doğal şekilde kulağınıza tutun — telefon görüşmesi yapar gibi. Gelen aramaları çift dokunuşla cevaplayın.",
      placement: "Yüzüğün Kulakta Yerleşimi",
      placementDesc: "İşaret parmağınız yüzüğü Cymba Conchae'ye — kulak kepçesinin üst çukuruna — hafifçe tutar. Baskı gerekmez, sadece hafif cilt teması.",
      discreetMsg: "Mesajları Dinleyin",
      discreetMsgDesc: "Mesajlar kemik titreşimi ile iletilir. Tek dokunuşla oynatın. İçeriği yalnızca siz duyarsınız — tamamen özel.",
      effects: "Hissedilir Etkiler",
      effect1: "Anında Rahatlama",
      effect1d: "30-60 saniyede parasempatik aktivasyon",
      effect2: "Stres Azaltma",
      effect2d: "Ölçülebilir kortizol seviyesi düşüşü",
      effect3: "Gelişmiş HRV",
      effect3d: "Kalp atış değişkenliği %15-25 artar",
      effect4: "Zihinsel Berraklık",
      effect4d: "Gelişmiş konsantrasyon ve odak",
    },
    ui: {
      eventLog: "Olay Günlüğü",
      trend: "Trend (son ölçümler)",
      hangUp: "Kapat",
      paused: "Duraklatıldı",
      active: "AKTİF",
      contact: "İletişime Geçin",
      contactSub: "Sorular, ortaklıklar veya sunum talebi",
      whatsapp: "WhatsApp ile yazın",
      email: "E-Posta gönderin",
    },
    log: {
      sesStart: "▶ Seans başlatıldı", sesStop: "■ Seans durduruldu",
      sesDone: "✓ Seans tamamlandı", sesResume: "↺ Seans devam ediyor",
      msgIn: "💬 Mesaj alındı", msgPlay: "▶ Mesaj oynatılıyor", msgClose: "✕ Mesaj kapatıldı",
      callIn: "📞 Gelen arama", callAcc: "✓ Arama kabul edildi", callEnd: "✓ Arama bitti",
      callDec: "✕ Arama reddedildi", callHang: "📵 Kapatıldı",
      gesture: "👆 Yüzük hareketi", batCrit: "⚠ Patch pil kritik",
      sigLost: "📡 Patch sinyal kaybı", sigBack: "📡 Sinyal geri geldi",
      ringOff: "Yüzük ayrıldı", ringOn: "Yüzük bağlandı",
      patchOff: "Patch ayrıldı", patchOn: "Patch bağlandı",
      voiceCalm: "🎤 Ses: Rahat", voiceTense: "🎤 Ses: Hafif gerginlik", voiceStress: "🎤 Ses: Stres tespit edildi",
    },
  },
};

// ── Audio Engine ─────────────────────────────────────────────────────────────
function useAudio() {
  const ctxRef = useRef(null);
  const nodes = useRef({});
  const ivlRef = useRef(null);
  const mutedR = useRef(false);
  const [muted, setMuted] = useState(false);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  const killAll = useCallback(() => {
    clearInterval(ivlRef.current);
    ivlRef.current = null;
    Object.values(nodes.current).forEach((n) => {
      try {
        n?.stop?.();
        n?.disconnect?.();
      } catch {}
    });
    nodes.current = {};
  }, []);

  const makeOsc = (c, freq, vol, type = "sine") => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(c.destination);
    o.start();
    return { o, g };
  };

  const play = useCallback(
    (profile) => {
      killAll();
      if (mutedR.current) return;
      const c = ensureCtx();

      const pulse = (g, peak, rest, dur) => {
        const t = c.currentTime;
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(rest, t);
        g.gain.linearRampToValueAtTime(peak, t + dur * 0.4);
        g.gain.linearRampToValueAtTime(rest, t + dur);
      };

      if (profile === "subtle") {
        const { o, g } = makeOsc(c, 95, 0, "sine");
        nodes.current = { o, g };
        ivlRef.current = setInterval(() => pulse(g, 0.25, 0.05, 1.2), 1300);
      } else if (profile === "premium") {
        const a = makeOsc(c, 90, 0, "sine");
        const b = makeOsc(c, 180, 0, "triangle");
        nodes.current = { o: a.o, g: a.g, o2: b.o, g2: b.g };
        ivlRef.current = setInterval(() => {
          pulse(a.g, 0.28, 0.06, 1.1);
          pulse(b.g, 0.14, 0.03, 1.4);
        }, 1200);
      } else if (profile === "immersive") {
        const { o, g } = makeOsc(c, 82, 0, "sine");
        nodes.current = { o, g };
        ivlRef.current = setInterval(() => pulse(g, 0.35, 0.08, 2.1), 2300);
      } else if (profile === "demo") {
        const { o, g } = makeOsc(c, 100, 0, "sine");
        nodes.current = { o, g };
        ivlRef.current = setInterval(() => pulse(g, 0.4, 0.12, 0.7), 800);
      } else if (profile === "message") {
        const { o, g } = makeOsc(c, 148, 0, "sine");
        nodes.current = { o, g };
        let n = 0;
        ivlRef.current = setInterval(() => {
          if (n++ >= 3) {
            killAll();
            return;
          }
          pulse(g, 0.35, 0.01, 0.22);
        }, 360);
      } else if (profile === "call") {
        const { o, g } = makeOsc(c, 118, 0, "sine");
        nodes.current = { o, g };
        ivlRef.current = setInterval(() => pulse(g, 0.3, 0.06, 0.55), 780);
      } else if (profile === "battery") {
        const { o, g } = makeOsc(c, 240, 0, "triangle");
        nodes.current = { o, g };
        let n = 0;
        ivlRef.current = setInterval(() => {
          if (n++ >= 2) {
            killAll();
            return;
          }
          pulse(g, 0.28, 0.01, 0.25);
        }, 520);
      }
    },
    [killAll]
  );

  const toggleMute = useCallback(() => {
    mutedR.current = !mutedR.current;
    setMuted(mutedR.current);
    if (mutedR.current) killAll();
  }, [killAll]);

  return { play, kill: killAll, muted, toggleMute };
}

// ── Ear / Ring Image (Guide) ─────────────────────────────────────────────────
function EarRingSVG({ active, activeLabel }) {
  return (
    <div style={{ position: "relative" }}>
      <img src="/vagus-nerv.png" alt="Vagus Nerve Stimulation via Smart Ring"
        style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 16, display: "block" }} />
      {active && (
        <div style={{ position: "absolute", top: 12, right: 12, background: B.tealDim, border: `1px solid ${B.tealBrd}`,
          borderRadius: 20, padding: "4px 12px", fontSize: 11, color: B.teal, fontWeight: 700 }}>
          {activeLabel}
        </div>
      )}
    </div>
  );
}

// ── Patch / Chest Image (Guide) ──────────────────────────────────────────────
function PatchChestSVG({ connected, signal, connLabel, discLabel }) {
  return (
    <div style={{ position: "relative" }}>
      <img src="/patch.jpg" alt="Pulse Core Patch placement"
        style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 16, display: "block" }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 8 }}>
        <div style={{ background: connected ? B.tealDim : B.redDim, border: `1px solid ${connected ? B.tealBrd : B.redBrd}`,
          borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700,
          color: connected ? B.teal : B.red, backdropFilter: "blur(8px)" }}>
          {connected ? connLabel : discLabel}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
// ── Voice AI Assistant ───────────────────────────────────────────────────────
function VoiceAI({ lang, t }) {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle");
  const recRef = useRef(null);

  const kb = {
    de: {
      greeting: "Willkommen bei NANIL Pulse. Ich bin Ihre KI-Assistentin. Fragen Sie mich alles über unser Wellbeing-System, den Smart Ring, den Biosensor-Patch, Vagusnerv-Stimulation oder Hormon-Tracking.",
      ring: "Der NANIL Pulse Ring ist ein eleganter Ear Cuff der auf der Cymba Conchae platziert wird. Er stimuliert den auriculären Ast des Vagusnervs per transkutaner Mikrostimulation. Knochenleitung ermöglicht diskrete Anrufe und Nachrichten. Verfügbar in Gold und Silber.",
      patch: "Der Pulse Core Patch ist ein Biosensor der auf dem oberen Sternalbereich getragen wird. Er misst kontinuierlich Herzfrequenz, HRV, Hauttemperatur, Bewegung und Mikro-Schweiß. Die Daten werden per Bluetooth an die App übertragen.",
      vagus: "Die Vagusnerv-Stimulation aktiviert den Parasympathikus — das Entspannungssystem des Körpers. Studien zeigen: reduzierte Herzfrequenz, verbesserte HRV, niedrigeres Cortisol. Der Ring stimuliert die Cymba Conchae, den einzigen Punkt am Ohr wo der Vagusnerv direkt unter der Haut liegt.",
      hormone: "Der Biosensor-Patch erfasst Basaltemperatur, HRV-Muster und Mikro-Schweiß-Veränderungen zur Hormonanalyse. Er trackt den Menstruationszyklus, erkennt Eisprung-Fenster, und zeigt Östrogen-, Progesteron- und LH-Trends.",
      stress: "Unser Closed-Loop System misst Stress über mehrere Biomarker: HRV, Hauttemperatur, Bewegung und Stimmanalyse. Bei erhöhtem Stress passt das System die Vagusnerv-Stimulation automatisch an.",
      invest: "NANIL Pulse ist ein Wellbeing-Tech Startup mit einem patentierten Closed-Loop Wellbeing-System. Wir suchen Investoren, Co-Founder und strategische Partner. Kontaktieren Sie uns für Pitch-Deck und Finanzierungsdetails.",
      price: "NANIL Pulse ist aktuell in der Entwicklungsphase. Early-Access Pakete werden demnächst verfügbar sein. Registrieren Sie sich für Updates und Sonderkonditionen.",
      fallback: "Verstanden. Kann ich Ihnen noch bei etwas anderem helfen? Fragen Sie mich über Ring, Patch, Vagusnerv, Hormone, Stressmanagement oder Investitionsmöglichkeiten."
    },
    en: {
      greeting: "Welcome to NANIL Pulse. I'm your AI assistant. Ask me anything about our wellbeing system, smart ring, biosensor patch, vagus nerve stimulation, or hormone tracking.",
      ring: "The NANIL Pulse Ring is an elegant ear cuff placed on the Cymba Conchae. It stimulates the auricular branch of the vagus nerve via transcutaneous micro-stimulation. Bone conduction enables discreet calls and messages. Available in gold and silver.",
      patch: "The Pulse Core Patch is a biosensor worn on the upper sternal area. It continuously measures heart rate, HRV, skin temperature, motion, and micro-perspiration. Data is transmitted via Bluetooth to the app.",
      vagus: "Vagus nerve stimulation activates the parasympathetic nervous system — the body's relaxation system. Studies show: reduced heart rate, improved HRV, lower cortisol. The ring stimulates the Cymba Conchae, the only point on the ear where the vagus nerve lies directly beneath the skin.",
      hormone: "The biosensor patch tracks basal temperature, HRV patterns, and micro-sweat changes for hormone analysis. It tracks the menstrual cycle, detects ovulation windows, and shows estrogen, progesterone, and LH trends.",
      stress: "Our closed-loop system measures stress via multiple biomarkers: HRV, skin temperature, motion, and voice analysis. When stress is elevated, the system automatically adjusts vagus nerve stimulation.",
      invest: "NANIL Pulse is a wellbeing-tech startup with a patented closed-loop wellbeing system. We're looking for investors, co-founders, and strategic partners. Contact us for pitch deck and funding details.",
      price: "NANIL Pulse is currently in development phase. Early-access packages will be available soon. Register for updates and special conditions.",
      fallback: "Understood. Can I help with anything else? Ask me about the ring, patch, vagus nerve, hormones, stress management, or investment opportunities."
    },
    tr: {
      greeting: "NANIL Pulse'a hoş geldiniz. Ben yapay zeka asistanınızım. Wellbeing sistemimiz, akıllı yüzük, biyosensör patch, vagus siniri stimülasyonu veya hormon takibi hakkında her şeyi sorabilirsiniz.",
      ring: "NANIL Pulse Yüzük, Cymba Conchae üzerine yerleştirilen şık bir ear cuff'tır. Transkutan mikro stimülasyon ile vagus sinirinin auriküler dalını uyarır. Kemik iletimi sayesinde gizli aramalar ve mesajlar mümkündür. Altın ve gümüş renklerde mevcuttur.",
      patch: "Pulse Core Patch, üst sternum bölgesine takılan bir biyosensördür. Sürekli olarak kalp atış hızı, HRV, cilt sıcaklığı, hareket ve mikro terlemeyi ölçer. Veriler Bluetooth ile uygulamaya aktarılır.",
      vagus: "Vagus siniri stimülasyonu parasempatik sinir sistemini aktive eder — vücudun rahatlama sistemi. Çalışmalar gösterir: azalan kalp atış hızı, gelişmiş HRV, düşük kortizol. Yüzük, vagus sinirinin doğrudan cildin altında olduğu kulaktaki tek nokta olan Cymba Conchae'yi uyarır.",
      hormone: "Biyosensör patch, hormon analizi için bazal sıcaklık, HRV kalıpları ve mikro ter değişikliklerini takip eder. Adet döngüsünü izler, yumurtlama pencerelerini tespit eder, östrojen, progesteron ve LH trendlerini gösterir.",
      stress: "Kapalı döngü sistemimiz stresi birden fazla biyobelirteç ile ölçer: HRV, cilt sıcaklığı, hareket ve ses analizi. Stres yükseldiğinde sistem vagus siniri stimülasyonunu otomatik olarak ayarlar.",
      invest: "NANIL Pulse, patentli kapalı döngü wellbeing sistemi ile bir wellbeing teknolojisi girişimidir. Yatırımcı, kurucu ortak ve stratejik partner arıyoruz.",
      price: "NANIL Pulse şu anda geliştirme aşamasındadır. Erken erişim paketleri yakında sunulacaktır.",
      fallback: "Anlaşıldı. Başka bir konuda yardımcı olabilir miyim?"
    }
  };

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "de" ? "de-DE" : lang === "tr" ? "tr-TR" : "en-US";
    u.rate = 1.0; u.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const pref = voices.find(v => v.lang.startsWith(u.lang.substring(0,2)));
    if (pref) u.voice = pref;
    setStatus("speaking");
    u.onend = () => { setStatus("listening"); startRec(); };
    window.speechSynthesis.speak(u);
  }, [lang]);

  const startRec = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (!recRef.current) {
      recRef.current = new SR();
      recRef.current.continuous = false;
      recRef.current.interimResults = false;
    }
    recRef.current.lang = lang === "de" ? "de-DE" : lang === "tr" ? "tr-TR" : "en-US";
    recRef.current.onresult = (e) => {
      const text = e.results[0][0].transcript.toLowerCase();
      const k = kb[lang] || kb.de;
      let resp = k.fallback;
      if (text.match(/ring|ohr|ear|kulak|yüzük/i)) resp = k.ring;
      else if (text.match(/patch|sensor|brust|chest|göğüs/i)) resp = k.patch;
      else if (text.match(/vagus|nerv|nerve|sinir|stimul/i)) resp = k.vagus;
      else if (text.match(/hormon|zyklus|cycle|döngü|eisprung|ovul|östrogen|estrogen/i)) resp = k.hormone;
      else if (text.match(/stress|entspann|relax|rahat/i)) resp = k.stress;
      else if (text.match(/invest|geld|money|fund|partner|yatırım/i)) resp = k.invest;
      else if (text.match(/preis|price|kost|cost|fiyat|kaufen|buy/i)) resp = k.price;
      else if (text.match(/hallo|hi|hey|merhaba|selam/i)) resp = k.greeting;
      speak(resp);
    };
    recRef.current.onerror = () => { setStatus("listening"); };
    recRef.current.onend = () => { if (listening) try { recRef.current.start(); } catch(e) {} };
    setListening(true);
    try { recRef.current.start(); } catch(e) {}
  }, [lang, listening, speak]);

  const openVoice = () => {
    setOpen(true);
    setListening(true);
    setTimeout(() => speak((kb[lang] || kb.de).greeting), 300);
  };
  const closeVoice = () => {
    setOpen(false);
    setListening(false);
    setStatus("idle");
    window.speechSynthesis.cancel();
    if (recRef.current) try { recRef.current.stop(); } catch(e) {}
  };

  return (
    <>
      <button onClick={openVoice} style={{ position: "fixed", bottom: 150, right: 24, width: 52, height: 52, borderRadius: "50%",
        background: `linear-gradient(135deg, ${B.orange}, ${B.orangeD})`, border: "none", color: "#fff", fontSize: 20,
        cursor: "pointer", boxShadow: "0 4px 24px rgba(201,162,39,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        🎤
      </button>
      {open && (
        <div className="overlay" style={{ flexDirection: "column", gap: 16, zIndex: 400, padding: "24px 20px", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center", height: 50 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: 5, borderRadius: 3, background: status === "speaking" ? B.orange : B.teal,
                animation: status !== "idle" ? `wave 0.5s ease-in-out ${i * 0.08}s infinite alternate` : "none",
                height: [18, 30, 44, 30, 18][i] }} />
            ))}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: B.text }}>
            {status === "speaking" ? (lang === "de" ? "Zeynah AI spricht..." : lang === "tr" ? "Zeynah AI konuşuyor..." : "Zeynah AI speaking...")
              : (lang === "de" ? "Zeynah AI hört zu..." : lang === "tr" ? "Zeynah AI dinliyor..." : "Zeynah AI listening...")}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: navigator.onLine ? B.teal : B.red }} />
            <span style={{ fontSize: 12, color: B.textDim }}>{navigator.onLine ? "Online" : "Offline"}</span>
          </div>
          {/* Themen-Buttons — funktionieren immer, auch offline */}
          <div style={{ fontSize: 12, color: B.textDim, marginTop: 4 }}>
            {lang === "de" ? "Thema antippen oder sprechen:" : lang === "tr" ? "Konuya dokunun veya konuşun:" : "Tap a topic or speak:"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 360 }}>
            {[
              { key: "ring", icon: "💍", de: "Ring", en: "Ring", tr: "Yüzük" },
              { key: "patch", icon: "📡", de: "Patch", en: "Patch", tr: "Patch" },
              { key: "vagus", icon: "🧠", de: "Vagus", en: "Vagus", tr: "Vagus" },
              { key: "hormone", icon: "🌸", de: "Hormone", en: "Hormones", tr: "Hormon" },
              { key: "stress", icon: "📉", de: "Stress", en: "Stress", tr: "Stres" },
              { key: "invest", icon: "💼", de: "Investoren", en: "Investors", tr: "Yatırım" },
              { key: "price", icon: "🏷", de: "Preise", en: "Pricing", tr: "Fiyat" },
            ].map((topic) => (
              <button key={topic.key} onClick={() => speak((kb[lang] || kb.de)[topic.key])}
                style={{ padding: "8px 14px", borderRadius: 20, background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(255,255,255,0.12)`, color: B.text, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
                {topic.icon} {topic[lang] || topic.de}
              </button>
            ))}
          </div>
          <button onClick={closeVoice} style={{ padding: "12px 28px", borderRadius: 30, background: "rgba(224,80,80,0.15)",
            border: `1px solid rgba(224,80,80,0.4)`, color: B.red, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14, marginTop: 8 }}>
            {lang === "de" ? "Gespräch beenden" : lang === "tr" ? "Görüşmeyi bitir" : "End conversation"}
          </button>
        </div>
      )}
    </>
  );
}

// ── Landing Page ─────────────────────────────────────────────────────────────
const LP = {
  de: {
    hero: "Die Zukunft des Wellbeings",
    heroSub: "Closed-Loop Stressmanagement mit Biosensor-Patch und Smart Ring",
    cta: "App öffnen",
    ctaInfo: "Mehr erfahren",
    f1: "Vagusnerv-Stimulation", f1d: "Transkutane Aktivierung des Parasympathikus über die Cymba Conchae",
    f2: "Echtzeit-Biofeedback", f2d: "HR, HRV, Hauttemperatur, Bewegung — alles in Echtzeit",
    f3: "Hormon-Tracking", f3d: "Eisprung, Zyklusphasen, Östrogen & Progesteron per Biosensor",
    f4: "Diskrete Kommunikation", f4d: "Anrufe und Nachrichten per Knochenleitung — privat & unsichtbar",
    f5: "KI-Stimmanalyse", f5d: "Stresserkennung durch Mikrotremor und Sprachrhythmus",
    f6: "Closed-Loop System", f6d: "Automatische Anpassung der Stimulation basierend auf Vitaldaten",
    prodTitle: "Das System", prodRing: "The Core — Smart Ring", prodRingD: "Eleganter Ear Cuff mit Vagusnerv-Stimulation, Knochenleitung und Gestenkontrolle.",
    prodPatch: "The Shield — Biosensor Patch", prodPatchD: "Kontinuierliche Messung von Vitaldaten, Hormonen und Stressmarkern.",
    techTitle: "Technologie",
    forTitle: "Für wen?",
    for1: "Für dich selbst", for1d: "Stress reduzieren, Schlaf verbessern, Hormone verstehen",
    for2: "Für Investoren", for2d: "Patentiertes Closed-Loop System, wachsender $50B Wellness-Markt",
    for3: "Für Co-Founder", for3d: "Revolutionäres Wellbeing-Tech Startup in der Frühphase",
    for4: "Für Partner", for4d: "API-Integration für Kliniken, Versicherungen und Wellness-Anbieter",
    footerLine: "DECODING WELLNESS. EMPOWERING LIFE.",
  },
  en: {
    hero: "The Future of Wellbeing",
    heroSub: "Closed-Loop Stress Management with Biosensor Patch and Smart Ring",
    cta: "Open App",
    ctaInfo: "Learn More",
    f1: "Vagus Nerve Stimulation", f1d: "Transcutaneous parasympathetic activation via the Cymba Conchae",
    f2: "Real-Time Biofeedback", f2d: "HR, HRV, skin temperature, motion — all in real-time",
    f3: "Hormone Tracking", f3d: "Ovulation, cycle phases, estrogen & progesterone via biosensor",
    f4: "Discreet Communication", f4d: "Calls and messages via bone conduction — private & invisible",
    f5: "AI Voice Analysis", f5d: "Stress detection through micro-tremor and speech rhythm",
    f6: "Closed-Loop System", f6d: "Automatic stimulation adjustment based on vital data",
    prodTitle: "The System", prodRing: "The Core — Smart Ring", prodRingD: "Elegant ear cuff with vagus nerve stimulation, bone conduction, and gesture control.",
    prodPatch: "The Shield — Biosensor Patch", prodPatchD: "Continuous measurement of vitals, hormones, and stress markers.",
    techTitle: "Technology",
    forTitle: "For Whom?",
    for1: "For Yourself", for1d: "Reduce stress, improve sleep, understand your hormones",
    for2: "For Investors", for2d: "Patented closed-loop system, growing $50B wellness market",
    for3: "For Co-Founders", for3d: "Revolutionary wellbeing-tech startup in early stage",
    for4: "For Partners", for4d: "API integration for clinics, insurances, and wellness providers",
    footerLine: "DECODING WELLNESS. EMPOWERING LIFE.",
  },
  tr: {
    hero: "Wellbeing'in Geleceği",
    heroSub: "Biyosensör Patch ve Akıllı Yüzük ile Kapalı Döngü Stres Yönetimi",
    cta: "Uygulamayı Aç",
    ctaInfo: "Daha Fazla Bilgi",
    f1: "Vagus Siniri Stimülasyonu", f1d: "Cymba Conchae üzerinden transkutan parasempatik aktivasyon",
    f2: "Gerçek Zamanlı Biyofeedback", f2d: "Kalp atışı, HRV, cilt sıcaklığı, hareket — hepsi gerçek zamanlı",
    f3: "Hormon Takibi", f3d: "Yumurtlama, döngü fazları, östrojen ve progesteron biyosensör ile",
    f4: "Gizli İletişim", f4d: "Kemik iletimi ile aramalar ve mesajlar — özel ve görünmez",
    f5: "Yapay Zeka Ses Analizi", f5d: "Mikro titreşim ve konuşma ritmi ile stres tespiti",
    f6: "Kapalı Döngü Sistem", f6d: "Vital verilere göre otomatik stimülasyon ayarı",
    prodTitle: "Sistem", prodRing: "The Core — Akıllı Yüzük", prodRingD: "Vagus siniri stimülasyonu, kemik iletimi ve hareket kontrolü ile şık ear cuff.",
    prodPatch: "The Shield — Biyosensör Patch", prodPatchD: "Vital değerlerin, hormonların ve stres belirteçlerinin sürekli ölçümü.",
    techTitle: "Teknoloji",
    forTitle: "Kimler İçin?",
    for1: "Kendiniz İçin", for1d: "Stresi azaltın, uykuyu iyileştirin, hormonlarınızı anlayın",
    for2: "Yatırımcılar İçin", for2d: "Patentli kapalı döngü sistemi, büyüyen 50 milyar dolarlık pazar",
    for3: "Kurucu Ortaklar İçin", for3d: "Erken aşamada devrimci wellbeing teknolojisi girişimi",
    for4: "Partnerler İçin", for4d: "Klinikler, sigortalar ve wellness sağlayıcılar için API entegrasyonu",
    footerLine: "DECODING WELLNESS. EMPOWERING LIFE.",
  }
};

export default function NanilPulseApp() {
  const [lang, setLang] = useState("de");
  // Static pages: /vorpage.html → /main.html → / (this app)
  const [tab, setTab] = useState("session");
  const [sesState, setSesState] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(120);
  const [profile, setProfile] = useState("subtle");
  const [ringConn, setRingConn] = useState(true);
  const [patchConn, setPatchConn] = useState(true);
  const [ringBat, setRingBat] = useState(78);
  const [patchBat, setPatchBat] = useState(45);
  const [patchSig, setPatchSig] = useState("good");
  const [showCall, setShowCall] = useState(false);
  const [callPhase, setCallPhase] = useState("ringing");
  const [showMsg, setShowMsg] = useState(false);
  const [msgPhase, setMsgPhase] = useState("received");
  const [lastGesture, setLastGesture] = useState(null);
  const [eventLog, setEventLog] = useState([]);
  const [logoError, setLogoError] = useState(false);
  const [hrSim, setHrSim] = useState(72);
  const [hrvSim, setHrvSim] = useState(58);
  const [breathSim, setBreathSim] = useState(16);
  const [stressScore, setStressScore] = useState(35);
  const [skinTemp, setSkinTemp] = useState(36.4);
  const [motionLevel, setMotionLevel] = useState("low");
  const [voiceState, setVoiceState] = useState("idle");
  const [voiceResult, setVoiceResult] = useState(null);
  const [stressHistory, setStressHistory] = useState([42, 38, 45, 40, 35]);
  const [cycleDay, setCycleDay] = useState(14);
  const [basalTemps, setBasalTemps] = useState([36.2, 36.3, 36.2, 36.4, 36.3, 36.5, 36.6]);
  const sesTimerRef = useRef(null);
  const callTimerRef = useRef(null);
  const vitalsRef = useRef(null);

  const t = T[lang] || T.de;
  // LP translations used by static pages only
  const audio = useAudio();
  const TOTAL = 120;

  useEffect(() => {
    if (sesState === "active" && patchConn) {
      vitalsRef.current = setInterval(() => {
        const jitter = () => (Math.random() - 0.5) * 2;
        setHrSim(prev => Math.max(58, Math.min(95, prev + jitter() * 3)));
        setHrvSim(prev => Math.max(30, Math.min(95, prev + jitter() * 4)));
        setBreathSim(prev => Math.max(10, Math.min(22, prev + jitter() * 1.5)));
        setSkinTemp(prev => Math.max(35.5, Math.min(37.2, prev + jitter() * 0.1)));
        setMotionLevel(Math.random() > 0.8 ? "mod" : "low");
        setStressScore(prev => {
          const next = Math.max(5, Math.min(85, prev + jitter() * 5 - 0.8));
          setStressHistory(h => [...h.slice(-11), Math.round(next)]);
          return next;
        });
      }, 2500);
    } else {
      clearInterval(vitalsRef.current);
    }
    return () => clearInterval(vitalsRef.current);
  }, [sesState, patchConn]);

  const startVoiceAnalysis = () => {
    setVoiceState("running");
    setVoiceResult(null);
    setTimeout(() => {
      const r = Math.random();
      setVoiceResult(r < 0.4 ? "calm" : r < 0.75 ? "tense" : "stressed");
      setVoiceState("done");
      addLog(r < 0.4 ? t.log.voiceCalm : r < 0.75 ? t.log.voiceTense : t.log.voiceStress);
    }, 4000);
  };

  const addLog = (msg) =>
    setEventLog((p) => [{ msg, ts: new Date().toLocaleTimeString(lang === "de" ? "de-DE" : lang === "tr" ? "tr-TR" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) }, ...p].slice(0, 14));

  useEffect(() => {
    if (sesState === "active") {
      sesTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(sesTimerRef.current);
    }
    return () => clearInterval(sesTimerRef.current);
  }, [sesState]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const pct = (TOTAL - timeLeft) / TOTAL;
  const R = 80,
    C = 96,
    circ = 2 * Math.PI * R;

  const startSession = () => {
    setSesState("active");
    setTimeLeft(TOTAL);
    audio.play(profile);
    if (navigator.vibrate) navigator.vibrate([80, 50, 80]);
    addLog(t.log.sesStart);
  };
  const stopSession = () => {
    setSesState("idle");
    setTimeLeft(TOTAL);
    audio.kill();
    addLog(t.log.sesStop);
  };
  const endSession = () => {
    setSesState("completed");
    audio.kill();
    addLog(t.log.sesDone);
  };
  const resumeSession = () => {
    setSesState("active");
    audio.play(profile);
    addLog(t.log.sesResume);
  };

  const simMsg = () => {
    if (sesState === "active") setSesState("paused_msg");
    audio.play("message");
    setMsgPhase("received");
    setShowMsg(true);
    if (navigator.vibrate) navigator.vibrate([55, 65, 55, 65, 55]);
    addLog(t.log.msgIn);
  };
  const playMsg = () => {
    setMsgPhase("playing");
    audio.play("message");
    addLog(t.log.msgPlay);
    setTimeout(() => {
      setMsgPhase("done");
      setShowMsg(false);
      if (sesState === "paused_msg") resumeSession();
    }, 3500);
  };
  const dismissMsg = () => {
    setShowMsg(false);
    if (sesState === "paused_msg") resumeSession();
    addLog(t.log.msgClose);
  };

  const simCall = () => {
    if (sesState === "active") setSesState("paused_call");
    audio.play("call");
    setCallPhase("ringing");
    setShowCall(true);
    if (navigator.vibrate) navigator.vibrate([250, 100, 250, 100, 250]);
    addLog(t.log.callIn);
  };
  const acceptCall = () => {
    setCallPhase("active");
    audio.kill();
    addLog(t.log.callAcc);
    callTimerRef.current = setTimeout(() => {
      setCallPhase("ended");
      setTimeout(() => {
        setShowCall(false);
        if (sesState === "paused_call") resumeSession();
        addLog(t.log.callEnd);
      }, 2000);
    }, 6000);
  };
  const declineCall = () => {
    clearTimeout(callTimerRef.current);
    audio.kill();
    setShowCall(false);
    if (sesState === "paused_call") resumeSession();
    addLog(t.log.callDec);
  };
  const hangUp = () => {
    clearTimeout(callTimerRef.current);
    setCallPhase("ended");
    addLog(t.log.callHang);
    setTimeout(() => {
      setShowCall(false);
      if (sesState === "paused_call") resumeSession();
    }, 2000);
  };

  const doGesture = (type) => {
    setLastGesture(type);
    const v = { tap: 60, dtap: [60, 40, 60], lp: 200 };
    if (navigator.vibrate) navigator.vibrate(v[type]);
    if (type === "tap" && showMsg && msgPhase === "received") {
      playMsg();
      return;
    }
    if (type === "dtap" && showCall && callPhase === "ringing") {
      acceptCall();
      return;
    }
    const labels = { tap: t.gestures.tap, dtap: t.gestures.dtap, lp: t.gestures.lp };
    addLog(`${t.log.gesture}: ${labels[type]}`);
  };

  const simBattery = () => {
    setPatchBat(8);
    audio.play("battery");
    if (navigator.vibrate) navigator.vibrate(400);
    addLog(t.log.batCrit);
  };
  const simSigLoss = () => {
    setPatchSig("lost");
    addLog(t.log.sigLost);
    setTimeout(() => {
      setPatchSig("good");
      addLog(t.log.sigBack);
    }, 6000);
  };

  const sesColor = sesState === "active" ? B.teal : sesState === "completed" ? B.orange : B.textDim;
  const sesLabel =
    sesState === "active"
      ? t.session.title
      : sesState === "completed"
        ? t.session.completed
        : sesState === "paused_msg" || sesState === "paused_call"
          ? t.ui.paused
          : t.session.ready;

  const profiles = [
    { id: "subtle", icon: "🌿", label: t.sounds.subtle, desc: t.sounds.subtilDesc },
    { id: "premium", icon: "💎", label: t.sounds.premium, desc: t.sounds.premiumDesc },
    { id: "immersive", icon: "🌊", label: t.sounds.immersive, desc: t.sounds.immersivDesc },
    { id: "demo", icon: "🎯", label: t.sounds.demo, desc: t.sounds.demoDesc },
  ];

  const sigBars = [10, 15, 20, 26];

  return (
    <div
      style={{
        fontFamily: "'DM Sans','Outfit','Helvetica Neue',system-ui,sans-serif",
        background: `radial-gradient(ellipse 120% 80% at 50% 0%, rgba(75,80,95,0.4) 0%, ${B.navy} 70%)`,
        minHeight: "100vh",
        color: B.text,
        overscrollBehavior: "none",
      }}
    >
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px}
        @keyframes pulse_ring{0%,100%{box-shadow:0 0 0 0 rgba(0,196,170,0.5)}70%{box-shadow:0 0 0 22px rgba(0,196,170,0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes overlayFade{from{opacity:0}to{opacity:1}}
        @keyframes cardPop{from{opacity:0;transform:scale(0.93) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes wave{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}
        .pulse-active{animation:pulse_ring 2s cubic-bezier(0.4,0,0.6,1) infinite}
        .blink{animation:blink 1.2s ease-in-out infinite}
        .fade-up{animation:fadeUp 0.35s cubic-bezier(0.34,1.3,0.64,1)}
        .overlay{position:fixed;inset:0;background:rgba(20,20,28,0.88);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;z-index:300;animation:overlayFade 0.2s ease}
        .card-pop{animation:cardPop 0.32s cubic-bezier(0.34,1.2,0.64,1)}
        .card{background:rgba(55,55,65,0.9);border:1px solid rgba(255,255,255,0.075);border-radius:20px;padding:22px;margin-bottom:16px}
        .card-title{font-size:10px;font-weight:700;color:${B.textDim};letter-spacing:2.5px;text-transform:uppercase;margin-bottom:18px}
        .btn-primary{background:linear-gradient(135deg,${B.orange},${B.orangeD});color:#fff;border:none;border-radius:13px;padding:14px 30px;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.2s;font-family:inherit}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 34px rgba(224,112,48,0.4)}
        .btn-primary:disabled{opacity:0.35;cursor:not-allowed;transform:none}
        .btn-outline{background:transparent;color:${B.textMut};border:1px solid rgba(255,255,255,0.14);border-radius:13px;padding:13px 22px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;font-family:inherit}
        .btn-outline:hover{background:rgba(255,255,255,0.07);color:${B.text}}
        .btn-accept{background:linear-gradient(135deg,${B.teal},${B.tealD});color:#fff;border:none;border-radius:13px;padding:14px 28px;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit}
        .btn-decline{background:rgba(224,80,80,0.14);color:#e07070;border:1px solid rgba(224,80,80,0.35);border-radius:13px;padding:14px 28px;font-weight:700;cursor:pointer;font-family:inherit}
        .tab-btn{padding:9px 15px;border-radius:11px;font-size:12.5px;font-weight:600;cursor:pointer;border:1px solid transparent;background:none;color:${B.textDim};transition:all 0.18s;font-family:inherit}
        .tab-btn.active{color:${B.orange};background:${B.orangeDim};border-color:${B.orangeBrd}}
        .lang-btn{background:none;border:1px solid rgba(255,255,255,0.1);border-radius:7px;color:${B.textDim};padding:4px 9px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit}
        .lang-btn.active{border-color:${B.orangeBrd};color:${B.orange};background:${B.orangeDim}}
        .gesture-btn{width:100%;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:15px;padding:16px;cursor:pointer;transition:all 0.2s;color:${B.textMut};font-family:inherit;text-align:center}
        .gesture-btn:hover{background:${B.orangeDim};border-color:${B.orangeBrd};color:${B.orange}}
        .event-card{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-radius:16px;cursor:pointer;transition:all 0.2s;margin-bottom:12px;border:1px solid transparent}
        .event-card:hover{transform:translateY(-2px)}
        .log-row{display:flex;justify-content:space-between;align-items:center;padding:7px 12px;border-radius:9px;background:rgba(255,255,255,0.03);border-left:2.5px solid ${B.tealBrd};margin-bottom:5px}
        .sound-card{border-radius:16px;border:2px solid transparent;padding:14px;cursor:pointer;transition:all 0.2s;font-family:inherit;text-align:center;background:rgba(255,255,255,0.03)}
        .sound-card.active{border-color:${B.orangeBrd};background:${B.orangeDim}}
        .bat-track{height:6px;border-radius:4px;background:rgba(255,255,255,0.08);overflow:hidden;margin-top:5px}
        .wave-bar{width:4px;border-radius:3px;display:inline-block}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .lp-card{background:rgba(16,26,44,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px 22px;text-align:center;transition:all 0.3s}
        .lp-card:hover{border-color:${B.orangeBrd};transform:translateY(-4px);box-shadow:0 12px 40px rgba(224,112,48,0.15)}
        .lp-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,16,30,0.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.07);padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
        .page-btn{background:none;border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:${B.textDim};padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:inherit}
        .page-btn:hover,.page-btn.active{border-color:${B.tealBrd};color:${B.teal};background:${B.tealDim}}
      `}</style>

      {/* ═══ NAVIGATION BAR REMOVED — Static HTML pages handle Vorpage/Hauptpage ═══ */}
      {/* Static navigation handled by vorpage.html / main.html */}

      {/* Header mit Logo & Markenfarben */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(46,46,56,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13, flexShrink: 0 }}>
          {!logoError ? (
            <img
              src="/nanil-pulse-logo.png"
              alt="NANIL Pulse"
              onError={() => setLogoError(true)}
              style={{ height: 48, width: "auto", objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${B.teal}, ${B.tealD})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,196,170,0.35)",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 900, color: B.navy }}>N</span>
            </div>
          )}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.8px", color: B.orange }}>NANIL</span>
              <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.8px", color: B.teal }}>PULSE</span>
            </div>
            <div style={{ fontSize: 9, color: B.textDim, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 2 }}>
              {t.taglineBrand}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <a href="/vorpage.html" style={{ fontSize: 10, fontWeight: 700, color: B.textMut, textDecoration: "none", padding: "5px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>
            {lang === "de" ? "Vorseite" : lang === "tr" ? "Giriş" : "Intro"}
          </a>
          <a href="/main.html" style={{ fontSize: 10, fontWeight: 700, color: B.textMut, textDecoration: "none", padding: "5px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>
            {lang === "de" ? "Hauptseite" : lang === "tr" ? "Ana Sayfa" : "Main"}
          </a>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)", margin: "0 2px" }} />
          {Object.keys(T).map((l) => (
            <button key={l} className={`lang-btn${lang === l ? " active" : ""}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
          <button
            onClick={audio.toggleMute}
            style={{
              background: audio.muted ? "rgba(255,255,255,0.05)" : B.tealDim,
              border: `1px solid ${audio.muted ? "rgba(255,255,255,0.1)" : B.tealBrd}`,
              borderRadius: 10,
              padding: "6px 14px",
              color: audio.muted ? B.textDim : B.teal,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {audio.muted ? "🔇" : "🔊"}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 13px",
              borderRadius: 10,
              background: sesState === "active" ? B.tealDim : B.orangeDim,
              border: `1px solid ${sesState === "active" ? B.tealBrd : B.orangeBrd}`,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: sesColor, ...(sesState === "active" ? { animation: "blink 1s infinite" } : {}) }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: sesColor }}>{sesLabel}</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 5,
          padding: "12px 18px",
          overflowX: "auto",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(40,40,50,0.95)",
        }}
      >
        {[
          ["session", "🎯", t.tabs.session],
          ["vitals", "💓", t.vitals?.title?.split(" ")[0] || "Vitals"],
          ["vagus", "🧠", t.vagus?.title?.split(" ")[0] || "Vagus"],
          ["device", "📡", t.tabs.device],
          ["guide", "📋", t.tabs.guide],
          ["events", "⚡", t.tabs.events],
          ["sounds", "🔊", t.tabs.sounds],
        ].map(([id, icon, label]) => (
          <button key={id} className={`tab-btn${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
            {icon} {label}
          </button>
        ))}
      </div>

      <main style={{ padding: "18px 18px 120px", maxWidth: 900, margin: "0 auto" }}>
        {tab === "session" && (
          <>
            <div className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
              <p className="card-title">{t.session.title} · {t.session.duration}</p>
              <div style={{ position: "relative", width: 192, height: 192, margin: "0 auto 26px" }}>
                <svg width="192" height="192" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                  <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
                  <circle cx={C} cy={C} r={R} fill="none" stroke={sesState === "completed" ? B.orange : sesState === "active" ? B.teal : "rgba(255,255,255,0.12)"} strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear" }} />
                </svg>
                <div className={sesState === "active" ? "pulse-active" : ""} style={{ position: "absolute", inset: "20px", borderRadius: "50%", background: "rgba(46,46,56,0.98)", border: `2px solid ${sesState === "active" ? B.teal : "rgba(255,255,255,0.08)"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 38, fontWeight: 800, color: sesState === "active" ? B.teal : sesState === "completed" ? B.orange : B.textDim }}>{fmt(timeLeft)}</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: B.textDim }}>{sesState === "completed" ? "✓ " + t.session.completed : t.session.ready}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
                {(sesState === "idle" || sesState === "completed") && (
                  <button className="btn-primary" onClick={startSession} disabled={!ringConn}>{!ringConn ? t.session.notConn : t.session.start}</button>
                )}
                {sesState === "active" && <button className="btn-outline" onClick={stopSession}>{t.session.stop}</button>}
                {(sesState === "paused_msg" || sesState === "paused_call") && (
                  <>
                    <button className="btn-primary" onClick={resumeSession}>{t.session.resume}</button>
                    <button className="btn-outline" onClick={stopSession}>{t.session.stop}</button>
                  </>
                )}
              </div>
              {sesState === "active" && (
                <div className="fade-up" style={{ padding: "12px 20px", borderRadius: 12, background: B.tealDim, border: `1px solid ${B.tealBrd}`, fontSize: 13.5, color: "#70d8c8" }}>
                  🌬 {t.session.breath}
                </div>
              )}
            </div>
            <div className="card">
              <p className="card-title" style={{ marginBottom: 18 }}>{t.gestures.title}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[["tap", "◉", t.gestures.tap, t.gestures.tapDesc], ["dtap", "◉ ◉", t.gestures.dtap, t.gestures.dtapDesc], ["lp", "◉ ─", t.gestures.lp, t.gestures.lpDesc]].map(([id, sym, label, desc]) => (
                  <button key={id} className="gesture-btn" onClick={() => doGesture(id)}>
                    <div style={{ fontSize: 26, marginBottom: 8, color: B.orange }}>{sym}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: B.text }}>{label}</div>
                    <div style={{ fontSize: 11, color: B.textDim }}>{desc}</div>
                  </button>
                ))}
              </div>
            </div>
            {eventLog.length > 0 && (
              <div className="card">
                <p className="card-title">{t.ui.eventLog}</p>
                <div style={{ maxHeight: 200, overflowY: "auto" }}>
                  {eventLog.map((e, i) => (
                    <div key={i} className="log-row">
                      <span style={{ fontSize: 12.5, color: B.textMut }}>{e.msg}</span>
                      <span style={{ fontSize: 10, color: B.textDim }}>{e.ts}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === "vitals" && (
          <>
            {/* Stress Score */}
            <div className="card" style={{ textAlign: "center", padding: "28px 24px" }}>
              <p className="card-title">{t.vitals.stress}</p>
              <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 20px" }}>
                <svg width="180" height="180" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                  <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
                  <circle cx="90" cy="90" r="72" fill="none"
                    stroke={stressScore < 25 ? B.green : stressScore < 50 ? B.teal : stressScore < 70 ? B.orange : B.red}
                    strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 72}
                    strokeDashoffset={2 * Math.PI * 72 * (1 - stressScore / 100)}
                    style={{ transition: "stroke-dashoffset 2s ease, stroke 2s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: "18px", borderRadius: "50%", background: "rgba(46,46,56,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 42, fontWeight: 800, color: stressScore < 25 ? B.green : stressScore < 50 ? B.teal : stressScore < 70 ? B.orange : B.red }}>
                    {Math.round(stressScore)}
                  </div>
                  <div style={{ fontSize: 11, color: B.textDim, marginTop: 4 }}>
                    {stressScore < 25 ? t.vitals.stressLow : stressScore < 50 ? t.vitals.stressMid : stressScore < 70 ? t.vitals.stressHigh : t.vitals.stressCrit}
                  </div>
                </div>
              </div>
              {/* Mini Stress Trend */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, height: 40, marginBottom: 12 }}>
                {stressHistory.map((v, i) => (
                  <div key={i} style={{ width: 8, height: `${Math.max(4, v * 0.4)}px`, borderRadius: 3,
                    background: v < 25 ? B.green : v < 50 ? B.teal : v < 70 ? B.orange : B.red,
                    opacity: 0.5 + (i / stressHistory.length) * 0.5, transition: "height 1s ease" }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: B.textDim }}>{t.ui.trend}</div>
            </div>

            {/* Vital Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div className="card" style={{ textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: B.textDim, marginBottom: 6 }}>{t.vitals.hr}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: B.teal }}>{Math.round(hrSim)}</div>
                <div style={{ fontSize: 11, color: B.tealD }}>{t.vitals.hrUnit}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 8 }}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="wave-bar" style={{ height: `${10 + Math.sin(Date.now() / 300 + i) * 8}px`, background: B.teal, animation: `wave 0.5s ease-in-out ${i * 0.1}s infinite alternate` }} />
                  ))}
                </div>
              </div>
              <div className="card" style={{ textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: B.textDim, marginBottom: 6 }}>{t.vitals.hrv}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: hrvSim > 60 ? B.green : hrvSim > 40 ? B.orange : B.red }}>{Math.round(hrvSim)}</div>
                <div style={{ fontSize: 11, color: B.textDim }}>{t.vitals.hrvUnit}</div>
                <div style={{ marginTop: 8 }}>
                  <div className="bat-track" style={{ height: 8 }}>
                    <div style={{ height: "100%", width: `${Math.min(100, hrvSim)}%`, background: hrvSim > 60 ? `linear-gradient(90deg,${B.green},${B.tealLt})` : hrvSim > 40 ? `linear-gradient(90deg,${B.orange},${B.orangeLt})` : B.red, borderRadius: 4, transition: "width 2s" }} />
                  </div>
                </div>
              </div>
              <div className="card" style={{ textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: B.textDim, marginBottom: 6 }}>{t.vitals.breath}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: B.orange }}>{Math.round(breathSim)}</div>
                <div style={{ fontSize: 11, color: B.textDim }}>{t.vitals.breathUnit}</div>
              </div>
              <div className="card" style={{ textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: B.textDim, marginBottom: 6 }}>{t.vitals.skinTemp}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#f0a050" }}>{skinTemp.toFixed(1)}</div>
                <div style={{ fontSize: 11, color: B.textDim }}>{t.vitals.skinTempUnit}</div>
              </div>
            </div>

            {/* Closed Loop Status */}
            <div className="card" style={{ padding: 18 }}>
              <p className="card-title">{t.vitals.loop}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14,
                background: sesState === "active" ? B.tealDim : "rgba(255,255,255,0.03)",
                border: `1px solid ${sesState === "active" ? B.tealBrd : "rgba(255,255,255,0.08)"}` }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: sesState === "active" ? B.tealDim : "rgba(255,255,255,0.05)",
                  border: `2px solid ${sesState === "active" ? B.teal : B.textDim}` }}>
                  <span style={{ fontSize: 20 }}>{sesState === "active" ? "🔄" : "⏸"}</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: sesState === "active" ? B.teal : B.textDim }}>
                    {sesState === "active" ? t.vitals.loopActive : t.vitals.loopIdle}
                  </div>
                  <div style={{ fontSize: 12, color: B.textDim, marginTop: 4 }}>{t.vitals.loopDesc}</div>
                </div>
              </div>
            </div>

            {/* General Hormone Tracking - for everyone */}
            <div className="card" style={{ padding: "20px 18px" }}>
              <p className="card-title">🧬 {t.vitals.hormoneGeneral}</p>
              <div style={{ fontSize: 12, color: B.textDim, marginBottom: 16, lineHeight: 1.5 }}>{t.vitals.voiceForAll}</div>
              {[
                { label: t.vitals.cortisolLevel, level: stressScore < 30 ? 25 : stressScore < 60 ? 55 : 82, color: stressScore < 30 ? B.green : stressScore < 60 ? B.orange : B.red, icon: "⚡" },
                { label: t.vitals.testosteroneLevel, level: 48 + Math.round(Math.sin(Date.now() / 50000) * 15), color: B.teal, icon: "💪" },
                { label: t.vitals.thyroidLevel, level: 62 + Math.round(Math.cos(Date.now() / 70000) * 10), color: B.orange, icon: "🦋" },
                { label: t.vitals.melatoninLevel, level: new Date().getHours() > 20 || new Date().getHours() < 6 ? 75 : 20, color: "#9b59b6", icon: "🌙" },
              ].map((h, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: B.textMut }}>{h.icon} {h.label}</span>
                    <span style={{ color: h.color, fontWeight: 700 }}>{h.level}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                    <div style={{ width: `${h.level}%`, height: "100%", borderRadius: 3, background: h.color, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Hormone & Cycle Tracking */}
            {(() => {
              const phase = cycleDay <= 5 ? "menstrual" : cycleDay <= 13 ? "follicular" : cycleDay <= 16 ? "ovulation" : "luteal";
              const phaseLabel = t.vitals[phase];
              const phaseColor = phase === "ovulation" ? "#ff6b9d" : phase === "menstrual" ? B.red : phase === "follicular" ? B.teal : B.orange;
              const fertility = phase === "ovulation" ? "high" : (phase === "follicular" && cycleDay >= 10) ? "med" : "low";
              const fertColor = fertility === "high" ? "#ff6b9d" : fertility === "med" ? B.orange : B.textDim;
              const fertLabel = fertility === "high" ? t.vitals.fertilityHigh : fertility === "med" ? t.vitals.fertilityMed : t.vitals.fertilityLow;
              const estLevel = phase === "ovulation" ? 92 : phase === "follicular" ? 55 + cycleDay * 3 : phase === "luteal" ? 45 : 20;
              const progLevel = phase === "luteal" ? 75 : phase === "ovulation" ? 30 : 10;
              const lhLevel = phase === "ovulation" ? 95 : (phase === "follicular" && cycleDay >= 12) ? 40 : 8;
              return (
                <div className="card" style={{ padding: "20px 18px" }}>
                  <p className="card-title" style={{ marginBottom: 6 }}>{t.vitals.hormone}</p>
                  <div style={{ fontSize: 12, color: B.textDim, marginBottom: 18, lineHeight: 1.5 }}>{t.vitals.hormoneDesc}</div>

                  {/* Cycle SVG Visualization */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                    <svg viewBox="0 0 200 200" width="180" height="180">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                      {/* Menstrual phase (days 1-5) */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke={B.red} strokeWidth="12" strokeDasharray={`${(5/28)*502.6} ${502.6}`} strokeDashoffset="0" transform="rotate(-90 100 100)" opacity="0.5" />
                      {/* Follicular phase (days 6-13) */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke={B.teal} strokeWidth="12" strokeDasharray={`${(8/28)*502.6} ${502.6}`} strokeDashoffset={`${-(5/28)*502.6}`} transform="rotate(-90 100 100)" opacity="0.5" />
                      {/* Ovulation (days 14-16) */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#ff6b9d" strokeWidth="12" strokeDasharray={`${(3/28)*502.6} ${502.6}`} strokeDashoffset={`${-(13/28)*502.6}`} transform="rotate(-90 100 100)" opacity="0.7" />
                      {/* Luteal phase (days 17-28) */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke={B.orange} strokeWidth="12" strokeDasharray={`${(12/28)*502.6} ${502.6}`} strokeDashoffset={`${-(16/28)*502.6}`} transform="rotate(-90 100 100)" opacity="0.5" />
                      {/* Current day marker */}
                      {(() => {
                        const angle = ((cycleDay - 1) / 28) * 360 - 90;
                        const rad = (angle * Math.PI) / 180;
                        const x = 100 + 80 * Math.cos(rad);
                        const y = 100 + 80 * Math.sin(rad);
                        return <circle cx={x} cy={y} r="8" fill={phaseColor} stroke="#fff" strokeWidth="2" />;
                      })()}
                      <text x="100" y="85" textAnchor="middle" fill={B.text} fontSize="28" fontWeight="800">{cycleDay}</text>
                      <text x="100" y="105" textAnchor="middle" fill={B.textDim} fontSize="10">{t.vitals.cycleDay}</text>
                      <text x="100" y="125" textAnchor="middle" fill={phaseColor} fontSize="11" fontWeight="700">{phaseLabel}</text>
                    </svg>
                  </div>

                  {/* Phase & Fertility cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 11, color: B.textDim, marginBottom: 4 }}>{t.vitals.phase}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: phaseColor }}>{phaseLabel}</div>
                      <div style={{ fontSize: 11, color: B.textDim }}>{t.vitals.cycleDay} {cycleDay} {t.vitals.cycleDayUnit}</div>
                    </div>
                    <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 11, color: B.textDim, marginBottom: 4 }}>{t.vitals.fertility}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: fertColor }}>{fertility === "high" ? "●●●" : fertility === "med" ? "●●○" : "●○○"} {fertLabel}</div>
                    </div>
                  </div>

                  {/* Hormone Level Bars */}
                  <div style={{ marginBottom: 16 }}>
                    {[
                      { label: t.vitals.estrogen, level: estLevel, color: "#ff6b9d" },
                      { label: t.vitals.progesterone, level: progLevel, color: B.orange },
                      { label: t.vitals.lh, level: lhLevel, color: B.teal },
                    ].map((h, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                          <span style={{ color: B.textMut }}>{h.label}</span>
                          <span style={{ color: h.color, fontWeight: 700 }}>{h.level}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                          <div style={{ width: `${h.level}%`, height: "100%", borderRadius: 3, background: h.color, transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ovulation Alert */}
                  {phase === "ovulation" && (
                    <div className="fade-up" style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(255,107,157,0.1)", border: "1px solid rgba(255,107,157,0.3)", marginBottom: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#ff6b9d", marginBottom: 4 }}>🌸 {t.vitals.ovulationAlert}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,107,157,0.7)" }}>{t.vitals.ovulationDesc}</div>
                    </div>
                  )}

                  {/* Basal Temperature Trend */}
                  <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ fontSize: 12, color: B.textDim, marginBottom: 10 }}>{t.vitals.tempTrend}</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
                      {basalTemps.map((temp, i) => {
                        const h = ((temp - 35.8) / 1.6) * 50;
                        const isToday = i === basalTemps.length - 1;
                        return (
                          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                            <span style={{ fontSize: 9, color: isToday ? "#ff6b9d" : B.textDim }}>{temp.toFixed(1)}</span>
                            <div style={{ width: "100%", height: Math.max(4, h), borderRadius: 3, background: isToday ? "#ff6b9d" : temp >= 36.5 ? B.orange : B.teal, opacity: isToday ? 1 : 0.5 }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hormone Dashboard Image */}
                  <div style={{ marginTop: 18, borderRadius: 14, overflow: "hidden" }}>
                    <img src="/hormone-dashboard.png" alt="Hormone Balance Dashboard"
                      style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 14, display: "block" }} />
                  </div>
                </div>
              );
            })()}

            {/* Voice Analysis & Biomarkers */}
            <div className="card">
              <p className="card-title">{t.vitals.voice}</p>
              <div style={{ fontSize: 13, color: B.textMut, marginBottom: 14 }}>{t.vitals.voiceDesc}</div>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14, fontSize: 12, color: B.textDim }}>
                🎤 {t.vitals.voiceTip}
              </div>
              {voiceState === "done" && voiceResult && (
                <>
                  <div className="fade-up" style={{ padding: "14px 18px", borderRadius: 14, marginBottom: 14,
                    background: voiceResult === "calm" ? B.greenDim : voiceResult === "tense" ? B.orangeDim : B.redDim,
                    border: `1px solid ${voiceResult === "calm" ? "rgba(64,200,128,0.35)" : voiceResult === "tense" ? B.orangeBrd : B.redBrd}` }}>
                    <div style={{ fontSize: 12, color: B.textDim, marginBottom: 4 }}>{t.vitals.voiceResult}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: voiceResult === "calm" ? B.green : voiceResult === "tense" ? B.orange : B.red }}>
                      {voiceResult === "calm" ? "✓ " + t.vitals.voiceCalm : voiceResult === "tense" ? "⚠ " + t.vitals.voiceTense : "🔴 " + t.vitals.voiceStressed}
                    </div>
                  </div>
                  {/* Hormone indicators from voice */}
                  <div className="fade-up" style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(93,154,168,0.08)", border: `1px solid ${B.tealBrd}`, marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: B.teal, marginBottom: 12 }}>🧬 {t.vitals.voiceHormone}</div>
                    {[
                      { label: t.vitals.voiceCortisol, level: voiceResult === "calm" ? 22 : voiceResult === "tense" ? 58 : 85, color: voiceResult === "calm" ? B.green : voiceResult === "tense" ? B.orange : B.red },
                      { label: t.vitals.voiceTestosterone, level: voiceResult === "calm" ? 65 : voiceResult === "tense" ? 50 : 35, color: B.teal },
                      { label: t.vitals.voiceEnergy, level: voiceResult === "calm" ? 78 : voiceResult === "tense" ? 55 : 30, color: B.orange },
                    ].map((h, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                          <span style={{ color: B.textMut }}>{h.label}</span>
                          <span style={{ color: h.color, fontWeight: 700 }}>{h.level}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                          <div style={{ width: `${h.level}%`, height: "100%", borderRadius: 3, background: h.color, transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button className="btn-primary" style={{ width: "100%", fontSize: 14, padding: "14px", marginBottom: 16 }}
                onClick={startVoiceAnalysis} disabled={voiceState === "running"}>
                {voiceState === "running" ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ display: "flex", gap: 3 }}>
                      {[...Array(5)].map((_, i) => <div key={i} className="wave-bar" style={{ height: 14, background: "#fff", animation: `wave 0.5s ease-in-out ${i * 0.08}s infinite alternate` }} />)}
                    </span>
                    {t.vitals.voiceRunning}
                  </span>
                ) : `🎤 ${t.vitals.voiceStart}`}
              </button>

              {/* For Everyone badge */}
              <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(201,162,39,0.08)", border: `1px solid ${B.orangeBrd}`, marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: B.orange, marginBottom: 4 }}>👤 {t.vitals.voiceNotJustWomen}</div>
                <div style={{ fontSize: 12, color: B.textDim, lineHeight: 1.5 }}>{t.vitals.voiceForAll}</div>
              </div>

              {/* Scientific Studies */}
              <div style={{ padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: B.text, marginBottom: 12 }}>📚 {t.vitals.voiceStudies}</div>
                {[t.vitals.voiceStudy1, t.vitals.voiceStudy2, t.vitals.voiceStudy3, t.vitals.voiceStudy4].map((s, i) => (
                  <div key={i} style={{ fontSize: 11, color: B.textDim, lineHeight: 1.5, marginBottom: 8, paddingLeft: 12, borderLeft: `2px solid ${i === 0 ? B.teal : i === 1 ? B.orange : i === 2 ? "#ff6b9d" : B.green}` }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "vagus" && (
          <>
            {/* Vagus Nerve Anatomy */}
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: B.text, marginBottom: 4 }}>{t.vagus.title}</div>
              <div style={{ fontSize: 13, color: B.textDim, marginBottom: 20 }}>{t.vagus.subtitle}</div>

              <div style={{ borderRadius: 14, overflow: "hidden", background: "#0a1220", marginBottom: 20 }}>
                <EarRingSVG active={sesState === "active"} activeLabel={t.ui.active} />
              </div>

              <div style={{ padding: "16px 18px", borderRadius: 14, background: B.tealDim, border: `1px solid ${B.tealBrd}`, marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: B.teal, marginBottom: 6 }}>◎ {t.vagus.cymba}</div>
                <div style={{ fontSize: 13, color: "#88d8cc", lineHeight: 1.6 }}>{t.vagus.cymbaDesc}</div>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <div className="card">
              <p className="card-title">{t.vagus.howTo}</p>
              {[
                { n: "1", title: t.vagus.step1, desc: t.vagus.step1d, icon: "👆" },
                { n: "2", title: t.vagus.step2, desc: t.vagus.step2d, icon: "💍" },
                { n: "3", title: t.vagus.step3, desc: t.vagus.step3d, icon: "🤲" },
                { n: "4", title: t.vagus.step4, desc: t.vagus.step4d, icon: "▶" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: B.orangeDim, border: `1px solid ${B.orangeBrd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: B.orange }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: B.text, marginBottom: 4 }}>{s.icon} {s.title}</div>
                    <div style={{ fontSize: 13, color: B.textMut, lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
              <div className="fade-up" style={{ padding: "12px 16px", borderRadius: 12, background: B.redDim, border: `1px solid ${B.redBrd}`, fontSize: 13, color: "#e07070", marginTop: 14 }}>
                ⚠ {t.vagus.warning}
              </div>
            </div>

            {/* Ring Placement Illustration */}
            <div className="card" style={{ padding: "24px" }}>
              <p className="card-title">{t.vagus.placement}</p>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <svg viewBox="0 0 280 220" width="100%" style={{ maxWidth: 340, height: "auto" }}>
                  {/* Ear outline */}
                  <ellipse cx="130" cy="110" rx="75" ry="95" fill="none" stroke={B.textDim} strokeWidth="2.5" opacity="0.5" />
                  {/* Inner ear detail - helix */}
                  <path d="M 130 20 C 185 25, 195 75, 175 110 C 165 135, 150 150, 130 170" fill="none" stroke={B.textDim} strokeWidth="2" opacity="0.4" />
                  {/* Tragus */}
                  <ellipse cx="105" cy="115" rx="12" ry="18" fill="none" stroke={B.textDim} strokeWidth="1.8" opacity="0.4" />
                  {/* Anti-tragus */}
                  <path d="M 100 140 C 95 145, 90 150, 95 155" fill="none" stroke={B.textDim} strokeWidth="1.5" opacity="0.3" />
                  {/* Ear canal */}
                  <ellipse cx="118" cy="112" rx="8" ry="10" fill="rgba(46,46,56,0.8)" stroke={B.textDim} strokeWidth="1.5" opacity="0.6" />
                  {/* Cymba Conchae - highlighted area */}
                  <ellipse cx="140" cy="82" rx="22" ry="16" fill={B.tealDim} stroke={B.teal} strokeWidth="2" strokeDasharray="4 2" />
                  <text x="140" y="86" textAnchor="middle" fill={B.teal} fontSize="8" fontWeight="700">CYMBA</text>
                  {/* Ring on cymba conchae */}
                  <ellipse cx="140" cy="78" rx="14" ry="8" fill="none" stroke={B.orange} strokeWidth="3" />
                  <circle cx="140" cy="72" r="3" fill={B.orange} opacity="0.8" />
                  {/* Pulsing stimulation point */}
                  <circle cx="140" cy="82" r="4" fill={B.teal} opacity="0.6">
                    <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Finger holding ring - index finger */}
                  <path d="M 220 50 C 200 55, 175 60, 155 70 C 150 72, 148 75, 152 78 C 155 80, 160 78, 165 73 C 175 65, 195 58, 210 55 Z"
                    fill="rgba(220,180,140,0.35)" stroke="rgba(220,180,140,0.5)" strokeWidth="1.5" />
                  {/* Finger tip detail */}
                  <ellipse cx="155" cy="74" rx="8" ry="5" fill="rgba(220,180,140,0.25)" stroke="rgba(220,180,140,0.4)" strokeWidth="1" transform="rotate(-25 155 74)" />
                  {/* Fingernail */}
                  <path d="M 218 50 C 216 48, 212 48, 210 50" fill="none" stroke="rgba(220,180,140,0.4)" strokeWidth="1" />
                  {/* Arrow showing direction */}
                  <path d="M 200 42 L 165 62" fill="none" stroke={B.orange} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                  <polygon points="165,62 170,56 173,64" fill={B.orange} opacity="0.7" />
                  {/* 15-25° angle indicator */}
                  <path d="M 140 95 L 140 110" fill="none" stroke={B.textDim} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                  <path d="M 140 95 L 148 108" fill="none" stroke={B.orange} strokeWidth="1.2" opacity="0.6" />
                  <text x="152" y="107" fill={B.orange} fontSize="8" opacity="0.8">15-25°</text>
                  {/* Labels */}
                  <text x="35" y="80" fill={B.teal} fontSize="9" fontWeight="600" opacity="0.7">{lang === "de" ? "Ohrmuschel" : lang === "tr" ? "Kulak" : "Ear"}</text>
                  <text x="195" y="38" fill={B.orange} fontSize="9" fontWeight="600" opacity="0.8">{lang === "de" ? "Zeigefinger" : lang === "tr" ? "İşaret parmağı" : "Index finger"}</text>
                  <text x="170" y="90" fill={B.orange} fontSize="8" fontWeight="700">Ring</text>
                </svg>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: B.orangeDim, border: `1px solid ${B.orangeBrd}`, fontSize: 13, color: "#c08848", lineHeight: 1.6 }}>
                💍 {t.vagus.placementDesc}
              </div>
            </div>

            {/* Discreet Usage */}
            <div className="card">
              <p className="card-title">{t.vagus.discreet}</p>
              <div style={{ fontSize: 13, color: B.textMut, marginBottom: 16 }}>{t.vagus.discreetDesc}</div>

              {/* Bone Conduction Image */}
              <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
                <img src="/bone-conduction.png" alt="Bone Conduction via Smart Ring"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover", display: "block", borderRadius: 14 }} />
              </div>

              <div style={{ padding: "16px 18px", borderRadius: 14, background: B.tealDim, border: `1px solid ${B.tealBrd}`, marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: B.teal, marginBottom: 6 }}>📞 {t.vagus.discreetCall}</div>
                <div style={{ fontSize: 13, color: "#88d8cc", lineHeight: 1.5 }}>{t.vagus.discreetCallDesc}</div>
              </div>

              <div style={{ padding: "16px 18px", borderRadius: 14, background: B.orangeDim, border: `1px solid ${B.orangeBrd}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: B.orange, marginBottom: 6 }}>💬 {t.vagus.discreetMsg}</div>
                <div style={{ fontSize: 13, color: "#c08848", lineHeight: 1.5 }}>{t.vagus.discreetMsgDesc}</div>
              </div>
            </div>

            {/* Effects */}
            <div className="card">
              <p className="card-title">{t.vagus.effects}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "🧘", title: t.vagus.effect1, desc: t.vagus.effect1d, color: B.teal, bg: B.tealDim, brd: B.tealBrd },
                  { icon: "📉", title: t.vagus.effect2, desc: t.vagus.effect2d, color: B.green, bg: B.greenDim, brd: "rgba(64,200,128,0.35)" },
                  { icon: "💓", title: t.vagus.effect3, desc: t.vagus.effect3d, color: B.orange, bg: B.orangeDim, brd: B.orangeBrd },
                  { icon: "🧠", title: t.vagus.effect4, desc: t.vagus.effect4d, color: "#90a0ff", bg: "rgba(100,150,255,0.08)", brd: "rgba(100,150,255,0.28)" },
                ].map((e, i) => (
                  <div key={i} style={{ padding: "16px 14px", borderRadius: 14, background: e.bg, border: `1px solid ${e.brd}`, textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{e.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: e.color, marginBottom: 4 }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: B.textDim, lineHeight: 1.4 }}>{e.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Science */}
            <div className="card" style={{ padding: 18 }}>
              <p className="card-title">{t.vagus.science}</p>
              <div style={{ fontSize: 13, color: B.textMut, lineHeight: 1.6 }}>{t.vagus.scienceDesc}</div>
            </div>
          </>
        )}

        {tab === "device" && (
          <>
            {/* System Overview */}
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
              <img src="/system-symbiosis.png" alt="NANIL Pulse System" style={{ width: "100%", maxHeight: 240, objectFit: "contain", display: "block" }} />
            </div>
            <div className="card">
              <p className="card-title">{t.device.ring}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div className={sesState === "active" && ringConn ? "pulse-active" : ""} style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `3px solid ${ringConn ? B.orange : "rgba(255,255,255,0.12)"}` }}>
                  <img src="/gold-ring.jpg" alt="Pulse Ring" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: B.text }}>Pulse Ring</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: ringConn ? B.teal : B.red }} />
                    <span style={{ fontSize: 13, color: ringConn ? B.teal : "#e07070", fontWeight: 600 }}>{ringConn ? t.device.conn : t.device.disc}</span>
                  </div>
                </div>
                <button className={ringConn ? "btn-decline" : "btn-accept"} style={{ padding: "10px 18px", fontSize: 13 }} onClick={() => { setRingConn(!ringConn); addLog(ringConn ? t.log.ringOff : t.log.ringOn); }}>
                  {ringConn ? t.device.disconnect : t.device.connect}
                </button>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: B.textDim }}>{t.device.battery}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ringBat < 20 ? B.red : B.teal }}>{ringBat}%</span>
                </div>
                <div className="bat-track">
                  <div style={{ height: "100%", width: `${ringBat}%`, background: ringBat < 20 ? B.red : `linear-gradient(90deg,${B.teal},${B.tealLt})`, borderRadius: 4, transition: "width 0.6s" }} />
                </div>
              </div>
            </div>
            <div className="card">
              <p className="card-title">{t.device.patch}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 64, height: 48, borderRadius: 12, background: patchConn ? "#1a3a50" : "#1a2234", border: `2px solid ${patchConn ? B.tealBrd : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: patchConn ? B.teal : "#3a5060", opacity: 0.8 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: B.text }}>Pulse Core</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: patchConn ? B.teal : B.red }} />
                    <span style={{ fontSize: 13, color: patchConn ? B.teal : "#e07070", fontWeight: 600 }}>{patchConn ? t.device.conn : t.device.disc}</span>
                  </div>
                </div>
                <button className={patchConn ? "btn-decline" : "btn-accept"} style={{ padding: "10px 18px", fontSize: 13 }} onClick={() => { setPatchConn(!patchConn); addLog(patchConn ? t.log.patchOff : t.log.patchOn); }}>
                  {patchConn ? t.device.disconnect : t.device.connect}
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: B.textDim }}>{t.device.signal}</span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
                  {sigBars.map((h, i) => (
                    <div key={i} style={{ width: 8, height: h, borderRadius: 3, background: i <= (patchSig === "good" ? 3 : patchSig === "weak" ? 1 : -1) ? (patchSig === "good" ? B.teal : patchSig === "weak" ? "#e0a030" : B.red) : "rgba(255,255,255,0.1)" }} />
                  ))}
                  <span style={{ fontSize: 12, fontWeight: 700, color: patchSig === "good" ? B.teal : patchSig === "weak" ? "#e0a030" : B.red, marginLeft: 4 }}>{patchSig === "good" ? t.device.sigGood : patchSig === "weak" ? t.device.sigWeak : t.device.sigLost}</span>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: B.textDim }}>{t.device.battery}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: patchBat < 20 ? B.red : B.teal }}>{patchBat}%</span>
                </div>
                <div className="bat-track">
                  <div style={{ height: "100%", width: `${patchBat}%`, background: patchBat < 20 ? B.red : `linear-gradient(90deg,${B.teal},${B.tealLt})`, borderRadius: 4, transition: "width 0.6s" }} />
                </div>
              </div>
              {patchSig === "lost" && (
                <div className="fade-up" style={{ padding: "12px 16px", borderRadius: 12, background: B.redDim, border: `1px solid ${B.redBrd}`, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <span style={{ fontSize: 13, color: "#e07070" }}>⚠ {t.device.sigLost}</span>
                  <button onClick={() => setPatchSig("good")} style={{ background: B.red, color: "#fff", border: "none", borderRadius: 9, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{t.device.reattach}</button>
                </div>
              )}
            </div>
          </>
        )}

        {tab === "guide" && (
          <>
            <div className="card">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: B.text }}>◎ {t.guide.ring}</div>
                <div style={{ fontSize: 12, color: B.textDim }}>{t.guide.ringSub}</div>
              </div>
              <div style={{ borderRadius: 14, overflow: "hidden", background: "#0a1220", marginBottom: 18 }}>
                <EarRingSVG active={sesState === "active"} activeLabel={t.ui.active} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {t.guide.ringSteps.map((s, i) => (
                  <div key={i} style={{ padding: 12, textAlign: "center", borderRadius: 13, background: B.orangeDim, border: `1px solid ${B.orangeBrd}` }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: B.orange, color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{i + 1}</div>
                    <div style={{ fontSize: 11.5, color: B.textMut }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "11px 16px", borderRadius: 12, background: B.orangeDim, border: `1px solid ${B.orangeBrd}`, fontSize: 12, color: "#c07830", marginTop: 14 }}>⚠ {t.guide.safety}</div>
            </div>
            <div className="card">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: B.text }}>⬡ {t.guide.patch}</div>
                <div style={{ fontSize: 12, color: B.textDim }}>{t.guide.patchSub}</div>
              </div>
              <div style={{ borderRadius: 14, overflow: "hidden", background: "#0a1220", marginBottom: 18 }}>
                <PatchChestSVG connected={patchConn} signal={patchSig} connLabel={t.device.conn} discLabel={t.device.disc} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {t.guide.patchSteps.map((s, i) => (
                  <div key={i} style={{ padding: 12, textAlign: "center", borderRadius: 13, background: B.tealDim, border: `1px solid ${B.tealBrd}` }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: B.teal, color: B.navy, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{i + 1}</div>
                    <div style={{ fontSize: 11.5, color: B.textMut }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: B.textDim, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8, marginTop: 14 }}>{t.guide.patchNot}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {t.guide.avoidList.map((a, i) => (
                  <div key={i} style={{ padding: "10px 12px", borderRadius: 12, background: B.redDim, border: `1px solid ${B.redBrd}`, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18, color: B.red }}>✕</span>
                    <span style={{ fontSize: 11.5, color: "#c06060" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "events" && (
          <>
            <div className="card">
              <p className="card-title">{t.events.title}</p>
              {[
                { icon: "💬", label: t.events.msg, sub: t.events.msgSub, bg: B.orangeDim, brd: B.orangeBrd, fn: simMsg },
                { icon: "📞", label: t.events.call, sub: t.events.callSub, bg: B.tealDim, brd: B.tealBrd, fn: simCall },
                { icon: "🔋", label: t.events.bat, sub: t.events.batSub, bg: B.redDim, brd: B.redBrd, fn: simBattery },
                { icon: "📡", label: t.events.sig, sub: t.events.sigSub, bg: "rgba(100,150,255,0.08)", brd: "rgba(100,150,255,0.28)", fn: simSigLoss },
              ].map((ev, i) => (
                <div key={i} className="event-card" onClick={ev.fn} style={{ background: ev.bg, border: `1px solid ${ev.brd}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 32 }}>{ev.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: B.text }}>{ev.label}</div>
                      <div style={{ fontSize: 12, color: B.textDim }}>{ev.sub}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 22, color: B.orange }}>▶</span>
                </div>
              ))}
              <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", fontSize: 12, color: B.textDim, marginTop: 4 }}>ℹ {t.events.info}</div>
            </div>
            {eventLog.length > 0 && (
              <div className="card">
                <p className="card-title">{t.ui.eventLog}</p>
                <div style={{ maxHeight: 240, overflowY: "auto" }}>
                  {eventLog.map((e, i) => (
                    <div key={i} className="log-row">
                      <span style={{ fontSize: 12.5, color: B.textMut }}>{e.msg}</span>
                      <span style={{ fontSize: 10, color: B.textDim }}>{e.ts}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === "sounds" && (
          <div className="card">
            <p className="card-title">{t.sounds.title}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              {profiles.map((p) => (
                <button key={p.id} className={`sound-card${profile === p.id ? " active" : ""}`} onClick={() => { setProfile(p.id); if (sesState === "active") audio.play(p.id); }}>
                  <div style={{ fontSize: 34, marginBottom: 8 }}>{p.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: profile === p.id ? B.orange : B.text }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: B.textDim }}>{p.desc}</div>
                </button>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%", fontSize: 14, padding: "14px" }} onClick={() => audio.play(profile)} disabled={sesState === "active"}>
              ▶ {t.sounds.test}
            </button>
          </div>
        )}

        {/* Contact Card — always visible */}
        <div className="card" style={{ marginTop: 24, padding: "24px 20px", textAlign: "center", background: `linear-gradient(135deg, rgba(93,154,168,0.08), rgba(201,162,39,0.08))`, border: `1px solid ${B.tealBrd}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: B.text, marginBottom: 6 }}>{t.ui.contact}</div>
          <div style={{ fontSize: 13, color: B.textMut, marginBottom: 18 }}>{t.ui.contactSub}</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/491776480485" target="_blank" rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 13,
                background: "#25d366", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "transform 0.2s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.ui.whatsapp}
            </a>
            <a href="mailto:info@nanilpulse.art"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 13,
                background: B.orangeDim, border: `1px solid ${B.orangeBrd}`, color: B.orange, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              ✉ {t.ui.email}
            </a>
          </div>
        </div>
      </main>

      {/* Call Overlay */}
      {showCall && (
        <div className="overlay">
          <div className="card-pop" style={{ background: "rgba(46,46,56,0.99)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 26, padding: 38, maxWidth: 360, width: "92%", textAlign: "center" }}>
            {callPhase === "ringing" && (
              <>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: B.tealDim, border: `2px solid ${B.tealBrd}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 42 }}>📞</div>
                <div style={{ fontSize: 10, color: B.textDim, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8 }}>{t.call.incoming}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: B.text }}>Max Müller</div>
                <div style={{ fontSize: 13, color: B.orange, marginBottom: 24 }}>⏸ {t.call.paused}</div>
                <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                  <button className="btn-decline" onClick={declineCall}>{t.call.decline}</button>
                  <button className="btn-accept" onClick={acceptCall}>{t.call.accept}</button>
                </div>
              </>
            )}
            {callPhase === "active" && (
              <>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: B.tealDim, border: `2px solid ${B.tealBrd}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: 40 }}>📱</div>
                <div style={{ fontSize: 10, color: B.teal, letterSpacing: "2.5px", textTransform: "uppercase" }}>{t.call.active}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: B.text, marginBottom: 22 }}>Max Müller</div>
                <button className="btn-decline" onClick={hangUp}>📵 {t.ui.hangUp}</button>
              </>
            )}
            {callPhase === "ended" && (
              <>
                <div style={{ fontSize: 52, marginBottom: 18 }}>✅</div>
                <div style={{ fontSize: 10, color: B.textDim, textTransform: "uppercase" }}>{t.call.ended}</div>
                <div style={{ fontSize: 15, color: B.teal, fontWeight: 600 }}>{t.call.resuming}</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Message Overlay */}
      {showMsg && (
        <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget && msgPhase !== "playing") dismissMsg(); }}>
          <div className="card-pop" style={{ background: "rgba(46,46,56,0.99)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 26, padding: 38, maxWidth: 360, width: "92%", textAlign: "center" }}>
            <div style={{ width: 96, height: 96, borderRadius: "50%", background: B.orangeDim, border: `2px solid ${B.orangeBrd}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: 42 }}>{msgPhase === "playing" ? "🔊" : "💬"}</div>
            <div style={{ fontSize: 10, color: B.textDim, letterSpacing: "2.5px", textTransform: "uppercase" }}>{t.msg.bone}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: B.text }}>{t.msg.incoming}</div>
            <div style={{ fontSize: 13, color: B.textMut, marginBottom: 20 }}>{msgPhase === "received" ? t.msg.hint : msgPhase === "playing" ? t.msg.playing : "✓ " + t.msg.done}</div>
            {msgPhase === "received" && (
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button className="btn-outline" onClick={dismissMsg}>{t.msg.close}</button>
                <button className="btn-primary" onClick={playMsg}>▶ {t.msg.play}</button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "9px 20px", textAlign: "center", background: "rgba(46,46,56,0.98)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 10, color: B.textDim }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <span>{t.footer}</span>
          <a href="/vorpage.html" style={{ color: B.teal, fontSize: 10, textDecoration: "none", fontWeight: 600 }}>
            ← {lang === "de" ? "Startseite" : lang === "tr" ? "Giriş" : "Intro"}
          </a>
          <a href="/main.html" style={{ color: B.orange, fontSize: 10, textDecoration: "none", fontWeight: 600 }}>
            {lang === "de" ? "Hauptseite" : lang === "tr" ? "Ana Sayfa" : "Main"}
          </a>
          <a href="https://wa.me/491776480485" target="_blank" rel="noopener" style={{ color: "#25d366", fontSize: 10, textDecoration: "none", fontWeight: 600 }}>
            {t.ui.contact}
          </a>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/491776480485" target="_blank" rel="noopener"
        style={{ position: "fixed", bottom: 90, right: 24, width: 52, height: 52, borderRadius: "50%",
          background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)", zIndex: 199, textDecoration: "none", transition: "transform 0.2s" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Voice AI - available on all pages */}
      <VoiceAI lang={lang} t={t} />
    </div>
  );
}
