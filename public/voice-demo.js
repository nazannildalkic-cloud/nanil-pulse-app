/**
 * NANIL Pulse – Voice Demo with Speech Synthesis
 * Shared across all landing pages (vorpage, index1, en, tr)
 * Usage: Set window.VOICE_DEMO_LANG before loading, or defaults to 'de'
 */
(function() {
    var lang = (window.VOICE_DEMO_LANG || 'de');

    var phrases = {
        de: [
            'Guten Morgen! Ich habe wunderbar geschlafen und fühle mich richtig erholt. Die Sonne scheint, ich bin bereit für den Tag.',
            'Puh, das Meeting war anstrengend. Drei Stunden Diskussion, viele offene Punkte. Ich muss mich erstmal sammeln.',
            'Ich kann nicht mehr. Alles auf einmal, Deadlines, Telefonate, nichts klappt heute. Mir ist alles zu viel.',
            'Gleich geht es ins Training! Ich bin motiviert und voller Energie. Das wird ein gutes Workout heute.',
            'Ich fühle mich so ruhig nach der Meditation. Mein Atem fließt gleichmäßig. Einfach nur Frieden.',
            'Was für ein langer Tag. Ich bin total erschöpft, meine Schultern sind verspannt. Ich brauche dringend Ruhe.'
        ],
        en: [
            'Good morning! I slept wonderfully and feel truly refreshed. The sun is shining, I am ready for the day.',
            'Phew, that meeting was exhausting. Three hours of discussion, many open points. I need to collect myself first.',
            'I cannot take it anymore. Everything at once, deadlines, phone calls, nothing is working today. It is all too much.',
            'Time for training! I am motivated and full of energy. This is going to be a great workout today.',
            'I feel so calm after meditation. My breath flows evenly. Just pure peace.',
            'What a long day. I am completely exhausted, my shoulders are tense. I desperately need rest.'
        ],
        tr: [
            'Günaydın! Harika uyudum ve kendimi gerçekten dinlenmiş hissediyorum. Güneş parlıyor, güne hazırım.',
            'Of, toplantı çok yorucuydu. Üç saat tartışma, birçok açık nokta. Önce kendimi toparlamam lazım.',
            'Artık dayanamıyorum. Her şey bir anda, teslim tarihleri, telefonlar, bugün hiçbir şey yolunda gitmiyor.',
            'Spora gidiyorum! Motiveyim ve enerji doluyum. Bugün harika bir antrenman olacak.',
            'Meditasyondan sonra çok huzurlu hissediyorum. Nefesim düzenli akıyor. Sadece huzur.',
            'Ne uzun bir gündü. Tamamen tükendim, omuzlarım gergin. Acilen dinlenmeye ihtiyacım var.'
        ]
    };

    var results = {
        de: {
            calm: {
                label: '💚 Entspannt & Ausgeglichen', color: '#22c55e',
                tips: [
                    '💚 Ihr System ist im Gleichgewicht – vertrauen Sie Ihrem Rhythmus.',
                    '🧘 Ideal für Meditation oder kreatives Arbeiten.',
                    '📝 Notieren Sie: Was hat Sie heute ruhig gehalten?'
                ],
                cortisol: 'Niedrig', energy: 'Hoch', hrv: '62ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:', ctaText: '🎙️ Volle Analyse in der App testen'
            },
            tense: {
                label: '⚡ Leichte Anspannung', color: '#f59e0b',
                tips: [
                    '⚡ Leichte Anspannung erkannt – atmen Sie 3 Minuten tief durch.',
                    '🫁 4-7-8 Atemtechnik: 4s einatmen, 7s halten, 8s ausatmen.',
                    '🚶 Kurze Gehpause – schon 5 Minuten machen den Unterschied.'
                ],
                cortisol: 'Mittel', energy: 'Mittel', hrv: '45ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:', ctaText: '🎙️ Volle Analyse in der App testen'
            },
            stressed: {
                label: '🔴 Hoher Stresslevel', color: '#ef4444',
                tips: [
                    '🔴 Ihr Stresslevel ist hoch – gönnen Sie sich eine Pause.',
                    '💧 Trinken Sie Wasser und atmen Sie 5 Minuten langsam.',
                    '🎵 Beruhigende Musik – achten Sie auf Herzrhythmus und Atemtiefe.'
                ],
                cortisol: 'Hoch', energy: 'Niedrig', hrv: '28ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:', ctaText: '🎙️ Volle Analyse in der App testen'
            }
        },
        en: {
            calm: {
                label: '💚 Calm & Balanced', color: '#22c55e',
                tips: [
                    '💚 Your system is balanced – trust your rhythm.',
                    '🧘 Ideal for meditation or creative work.',
                    '📝 Note down: What kept you calm today?'
                ],
                cortisol: 'Low', energy: 'High', hrv: '62ms',
                cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Try full analysis in the app'
            },
            tense: {
                label: '⚡ Slight Tension', color: '#f59e0b',
                tips: [
                    '⚡ Slight tension detected – breathe deeply for 3 minutes.',
                    '🫁 Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.',
                    '🚶 Take a short walk – even 5 minutes make a difference.'
                ],
                cortisol: 'Medium', energy: 'Medium', hrv: '45ms',
                cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Try full analysis in the app'
            },
            stressed: {
                label: '🔴 High Stress Level', color: '#ef4444',
                tips: [
                    '🔴 Your stress level is high – take a break.',
                    '💧 Drink water and breathe slowly for 5 minutes.',
                    '🎵 Listen to calming music – notice your heart rhythm.'
                ],
                cortisol: 'High', energy: 'Low', hrv: '28ms',
                cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Try full analysis in the app'
            }
        },
        tr: {
            calm: {
                label: '💚 Rahat & Dengeli', color: '#22c55e',
                tips: [
                    '💚 Sisteminiz dengeli – ritminize güvenin.',
                    '🧘 Meditasyon veya yaratıcı çalışma için ideal.',
                    '📝 Not edin: Bugün sizi sakin tutan neydi?'
                ],
                cortisol: 'Düşük', energy: 'Yüksek', hrv: '62ms',
                cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada tam analizi deneyin'
            },
            tense: {
                label: '⚡ Hafif Gerginlik', color: '#f59e0b',
                tips: [
                    '⚡ Hafif gerginlik tespit edildi – 3 dakika derin nefes alın.',
                    '🫁 4-7-8 tekniği: 4sn nefes alın, 7sn tutun, 8sn verin.',
                    '🚶 Kısa bir yürüyüş – 5 dakika bile fark yaratır.'
                ],
                cortisol: 'Orta', energy: 'Orta', hrv: '45ms',
                cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada tam analizi deneyin'
            },
            stressed: {
                label: '🔴 Yüksek Stres', color: '#ef4444',
                tips: [
                    '🔴 Stres seviyeniz yüksek – kısa bir mola verin.',
                    '💧 Su için ve 5 dakika yavaşça nefes alın.',
                    '🎵 Sakinleştirici müzik dinleyin – kalp ritminize dikkat edin.'
                ],
                cortisol: 'Yüksek', energy: 'Düşük', hrv: '28ms',
                cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada tam analizi deneyin'
            }
        }
    };

    // NEU: Hormon & Vaskulär Phrasen
    var hvPhrases = {
        de: [
            'Ich fühle mich heute irgendwie anders. Wärmer, energiegeladener. Mein Körper fühlt sich lebendig an, fast wie ein Kribbeln. Ich glaube mein Zyklus spielt da mit.',
            'Ich bin heute richtig fokussiert und energisch. War gerade beim Training, fühle mich stark. Alles läuft wie am Schnürchen, ich könnte Bäume ausreißen.',
            'Mein Kopf fühlt sich eng an, wie unter Druck. Ich merke die Anspannung im ganzen Körper. Mein Nacken ist hart wie Beton, alles ist verkrampft.',
            'Ich bin so tiefenentspannt gerade. Mein Körper fühlt sich warm und weit an. Die Meditation hat richtig gut getan, alles fließt.'
        ],
        en: [
            'I feel somehow different today. Warmer, more energized. My body feels alive, almost tingling. I think my cycle is playing a role.',
            'I am really focused and energetic today. Just came from training, feeling strong. Everything is running smoothly, I could move mountains.',
            'My head feels tight, like under pressure. I notice the tension throughout my whole body. My neck is hard as concrete, everything is cramped.',
            'I am so deeply relaxed right now. My body feels warm and open. The meditation really helped, everything flows.'
        ],
        tr: [
            'Bugün kendimi farklı hissediyorum. Daha sıcak, daha enerjik. Vücudum canlı hissediyor, neredeyse karıncalanma gibi. Döngümün etkisi olduğunu düşünüyorum.',
            'Bugün gerçekten odaklı ve enerjiyim. Antrenmandan yeni geldim, güçlü hissediyorum. Her şey yolunda, dağları yerinden oynatabilirdim.',
            'Başım sıkışmış gibi, basınç altında. Tüm vücudumda gerilimi hissediyorum. Boynum beton gibi sert, her şey kasılmış.',
            'Şu an çok derin bir rahatlama içindeyim. Vücudum sıcak ve açık hissediyor. Meditasyon çok iyi geldi, her şey akıyor.'
        ]
    };

    // NEU: Hormon & Vaskulär Ergebnisse
    var hvResults = {
        de: {
            hormone_ovulation: {
                label: '🔴 Östrogen-Peak · Eisprung-Fenster', color: '#e07030',
                tips: [
                    '🔴 Östrogen-Peak erkannt — deine Gefäße sind weiter, PWV sinkt. Optimale Phase für Kreativität und soziale Energie.',
                    '🧬 Dein vaskulärer Tonus zeigt zyklusbedingte Entspannung — arterielle Balance im grünen Bereich.',
                    '💡 NANIL erkennt hormonelle Phasen an vaskulären Mustern + Stimmanalyse — kein Bluttest nötig.'
                ],
                cortisol: 'Niedrig', energy: 'Hoch', hrv: '68ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:',
                ctaText: '🎙️ Volle Hormon-Analyse in der App',
                extra: '<div style="margin-top:16px;padding:14px;border-radius:12px;background:rgba(224,112,48,0.08);border:1px solid rgba(224,112,48,0.2);"><div style="font-size:12px;font-weight:700;color:#e07030;margin-bottom:8px;">🧬 HORMON-KONTEXT</div><div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#e07030;">↑</div><div style="font-size:11px;color:#9ca3af;">Östrogen</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#40c880;">↓</div><div style="font-size:11px;color:#9ca3af;">PWV</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#40c880;">Weit</div><div style="font-size:11px;color:#9ca3af;">Gefäße</div></div></div></div>'
            },
            hormone_testosterone: {
                label: '💪 Testosteron hoch · Peak-Phase', color: '#00c4aa',
                tips: [
                    '💪 Erhöhter Testosteron erkannt — arterieller Tonus steigt, Gefäße straffer. Peak-Modus für Leistung.',
                    '🫀 Dein vaskuläres Muster zeigt erhöhte Gefäßspannung — typisch bei hohem Testosteron-Level.',
                    '🏋️ Perfekter Moment für Kraft-Training — Testosteron-Cortisol-Ratio optimal.'
                ],
                cortisol: 'Niedrig', energy: 'Sehr hoch', hrv: '58ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:',
                ctaText: '🎙️ Volle Hormon-Analyse in der App',
                extra: '<div style="margin-top:16px;padding:14px;border-radius:12px;background:rgba(0,196,170,0.08);border:1px solid rgba(0,196,170,0.2);"><div style="font-size:12px;font-weight:700;color:#00c4aa;margin-bottom:8px;">🧬 HORMON-KONTEXT</div><div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#00c4aa;">↑↑</div><div style="font-size:11px;color:#9ca3af;">Testosteron</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#c9a227;">↑</div><div style="font-size:11px;color:#9ca3af;">PWV</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#00c4aa;">Straff</div><div style="font-size:11px;color:#9ca3af;">Gefäße</div></div></div></div>'
            },
            vascular_tense: {
                label: '🫀 Vaskuläre Anspannung · Cortisol-Stress', color: '#f59e0b',
                tips: [
                    '😤 Cortisol-Stress erkannt — deine Gefäße sind verengt, arterieller Tonus erhöht.',
                    '🫀 PWV erhöht (8.2 m/s) — vaskuläres Muster zeigt anhaltende Anspannung seit 2 Tagen.',
                    '🧘 Starte eine Vagusnerv-Session — parasympathische Aktivierung weitet die Gefäße wieder.'
                ],
                cortisol: 'Hoch', energy: 'Niedrig', hrv: '32ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:',
                ctaText: '🎙️ Vaskuläre Analyse in der App',
                extra: '<div style="margin-top:16px;padding:14px;border-radius:12px;background:rgba(201,162,39,0.08);border:1px solid rgba(201,162,39,0.2);"><div style="font-size:12px;font-weight:700;color:#c9a227;margin-bottom:8px;">🫀 VASKULÄR-KONTEXT</div><div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#f59e0b;">8.2</div><div style="font-size:11px;color:#9ca3af;">PWV m/s</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#e05050;">Eng</div><div style="font-size:11px;color:#9ca3af;">Gefäße</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#e05050;">↑↑</div><div style="font-size:11px;color:#9ca3af;">Kortisol</div></div></div></div>'
            },
            vascular_relaxed: {
                label: '🌊 Vaskuläre Balance · Gefäße entspannt', color: '#22c55e',
                tips: [
                    '🌊 Vaskuläre Balance — PWV optimal (6.4 m/s), Gefäße weit und elastisch.',
                    '💚 Dein arterieller Tonus zeigt tiefe Entspannung — Stimmanalyse bestätigt innere Ruhe.',
                    '🧬 Cortisol niedrig, HRV hoch, Gefäßmuster stabil — dein Körper regeneriert optimal.'
                ],
                cortisol: 'Niedrig', energy: 'Hoch', hrv: '72ms',
                cortisolLabel: 'Kortisol', energyLabel: 'Energie', analyzedLabel: 'Analysierter Satz:',
                ctaText: '🎙️ Vaskuläre Analyse in der App',
                extra: '<div style="margin-top:16px;padding:14px;border-radius:12px;background:rgba(64,200,128,0.08);border:1px solid rgba(64,200,128,0.2);"><div style="font-size:12px;font-weight:700;color:#40c880;margin-bottom:8px;">🫀 VASKULÄR-KONTEXT</div><div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#40c880;">6.4</div><div style="font-size:11px;color:#9ca3af;">PWV m/s</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#40c880;">Weit</div><div style="font-size:11px;color:#9ca3af;">Gefäße</div></div><div style="flex:1;min-width:80px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#40c880;">↓</div><div style="font-size:11px;color:#9ca3af;">Kortisol</div></div></div></div>'
            }
        },
        en: {
            hormone_ovulation: { label: '🔴 Estrogen Peak · Ovulation Window', color: '#e07030', tips: ['🔴 Estrogen peak detected — your vessels are wider, PWV drops. Optimal phase for creativity and social energy.', '🧬 Your vascular tonus shows cycle-related relaxation — arterial balance in the green zone.', '💡 NANIL detects hormonal phases through vascular patterns + voice analysis — no blood test needed.'], cortisol: 'Low', energy: 'High', hrv: '68ms', cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Full hormone analysis in the app', extra: '' },
            hormone_testosterone: { label: '💪 Testosterone High · Peak Phase', color: '#00c4aa', tips: ['💪 Elevated testosterone detected — arterial tonus rises, vessels tighter. Peak mode for performance.', '🫀 Your vascular pattern shows increased vessel tension — typical for high testosterone levels.', '🏋️ Perfect moment for strength training — testosterone-cortisol ratio optimal.'], cortisol: 'Low', energy: 'Very high', hrv: '58ms', cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Full hormone analysis in the app', extra: '' },
            vascular_tense: { label: '🫀 Vascular Tension · Cortisol Stress', color: '#f59e0b', tips: ['😤 Cortisol stress detected — your vessels are constricted, arterial tonus elevated.', '🫀 PWV elevated (8.2 m/s) — vascular pattern shows sustained tension for 2 days.', '🧘 Start a vagus nerve session — parasympathetic activation widens vessels again.'], cortisol: 'High', energy: 'Low', hrv: '32ms', cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Vascular analysis in the app', extra: '' },
            vascular_relaxed: { label: '🌊 Vascular Balance · Vessels Relaxed', color: '#22c55e', tips: ['🌊 Vascular balance — PWV optimal (6.4 m/s), vessels wide and elastic.', '💚 Your arterial tonus shows deep relaxation — voice analysis confirms inner calm.', '🧬 Cortisol low, HRV high, vascular pattern stable — your body recovers optimally.'], cortisol: 'Low', energy: 'High', hrv: '72ms', cortisolLabel: 'Cortisol', energyLabel: 'Energy', analyzedLabel: 'Analyzed phrase:', ctaText: '🎙️ Vascular analysis in the app', extra: '' }
        },
        tr: {
            hormone_ovulation: { label: '🔴 Östrojen Zirvesi · Yumurtlama', color: '#e07030', tips: ['🔴 Östrojen zirvesi tespit edildi — damarların genişliyor, PWV düşüyor.', '🧬 Vasküler tonusun döngüye bağlı rahatlama gösteriyor.', '💡 NANIL hormonal fazları vasküler paternler + ses analizi ile tespit eder.'], cortisol: 'Düşük', energy: 'Yüksek', hrv: '68ms', cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada hormon analizi', extra: '' },
            hormone_testosterone: { label: '💪 Testosteron Yüksek · Zirve Faz', color: '#00c4aa', tips: ['💪 Yüksek testosteron tespit edildi — arteriyel tonus artıyor.', '🫀 Vasküler paternin yüksek damar gerilimi gösteriyor.', '🏋️ Güç antrenmanı için mükemmel an.'], cortisol: 'Düşük', energy: 'Çok yüksek', hrv: '58ms', cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada hormon analizi', extra: '' },
            vascular_tense: { label: '🫀 Vasküler Gerilim · Kortizol Stresi', color: '#f59e0b', tips: ['😤 Kortizol stresi tespit edildi — damarların daralmış.', '🫀 PWV yüksek (8.2 m/s) — 2 gündür süren gerilim.', '🧘 Vagus siniri seansı başlat.'], cortisol: 'Yüksek', energy: 'Düşük', hrv: '32ms', cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada vasküler analiz', extra: '' },
            vascular_relaxed: { label: '🌊 Vasküler Denge · Rahat', color: '#22c55e', tips: ['🌊 Vasküler denge — PWV optimal (6.4 m/s).', '💚 Arteriyel tonusun derin rahatlama gösteriyor.', '🧬 Kortizol düşük, HRV yüksek, stabil patern.'], cortisol: 'Düşük', energy: 'Yüksek', hrv: '72ms', cortisolLabel: 'Kortizol', energyLabel: 'Enerji', analyzedLabel: 'Analiz edilen cümle:', ctaText: '🎙️ Uygulamada vasküler analiz', extra: '' }
        }
    };

    var speechLangs = { de: 'de-DE', en: 'en-US', tr: 'tr-TR' };
    var btnResults = ['calm', 'tense', 'stressed', 'calm', 'calm', 'tense'];

    // Pick the most natural/human-sounding voice for a language
    // Prioritizes: Online/Natural/Neural voices > named premium voices > any match
    var naturalKeywords = ['natural', 'neural', 'premium', 'enhanced', 'online', 'wavenet', 'studio'];
    var preferredVoices = {
        'de': ['Anna', 'Petra', 'Vicki', 'Marlene', 'Hannah', 'Katja'],
        'en': ['Samantha', 'Karen', 'Moira', 'Fiona', 'Ava', 'Allison', 'Susan', 'Zira'],
        'tr': ['Filiz', 'Yelda']
    };

    function pickBestVoice(voices, speechLang) {
        var langCode = speechLang.split('-')[0];
        var matching = voices.filter(function(v) {
            return v.lang && (v.lang === speechLang || v.lang.startsWith(langCode));
        });
        if (matching.length === 0) return null;
        if (matching.length === 1) return matching[0];

        // 1st priority: voices with "Natural" / "Neural" / "Online" in name (these sound human)
        var natural = matching.filter(function(v) {
            var name = v.name.toLowerCase();
            return naturalKeywords.some(function(kw) { return name.indexOf(kw) !== -1; });
        });
        if (natural.length > 0) return natural[0];

        // 2nd priority: known high-quality voice names per language
        var preferred = preferredVoices[langCode] || [];
        for (var i = 0; i < preferred.length; i++) {
            var found = matching.find(function(v) { return v.name.indexOf(preferred[i]) !== -1; });
            if (found) return found;
        }

        // 3rd priority: non-local (server-side) voices tend to sound better
        var remote = matching.filter(function(v) { return !v.localService; });
        if (remote.length > 0) return remote[0];

        // Fallback: first matching voice
        return matching[0];
    }

    function speakText(text, speechLang, rate, pitch, onEnd) {
        if (!('speechSynthesis' in window)) { if (onEnd) onEnd(); return; }
        window.speechSynthesis.cancel();

        // Split text into sentences for more natural pauses
        var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        var voices = window.speechSynthesis.getVoices();
        var bestVoice = pickBestVoice(voices, speechLang);
        var idx = 0;

        function speakNext() {
            if (idx >= sentences.length) { if (onEnd) onEnd(); return; }
            var sentence = sentences[idx].trim();
            idx++;
            if (!sentence) { speakNext(); return; }

            var utter = new SpeechSynthesisUtterance(sentence);
            utter.lang = speechLang;
            // Slightly slower than default = more natural, human pacing
            utter.rate = (rate || 1.0) * 0.92;
            utter.pitch = pitch || 1.0;
            utter.volume = 1;
            if (bestVoice) utter.voice = bestVoice;

            utter.onend = function() {
                // Natural pause between sentences (200-400ms, like real speech)
                setTimeout(speakNext, 200 + Math.random() * 200);
            };
            utter.onerror = function() {
                setTimeout(speakNext, 100);
            };
            window.speechSynthesis.speak(utter);
        }
        speakNext();
    }

    // Preload voices (important: some browsers load async)
    var voicesReady = false;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = function() {
            voicesReady = true;
            window.speechSynthesis.getVoices();
        };
    }

    var btns = document.querySelectorAll('.voice-demo-btn');
    var analyzingEl = document.getElementById('voice-analyzing');
    var resultEl = document.getElementById('voice-result');
    var analyzingText = analyzingEl ? analyzingEl.querySelector('p') : null;
    var isRunning = false;

    var localPhrases = phrases[lang] || phrases.de;
    var localResults = results[lang] || results.de;
    var localSpeechLang = speechLangs[lang] || 'de-DE';
    var analyzingMsg = lang === 'en' ? '🔊 Analyzing voice...' : lang === 'tr' ? '🔊 Ses analiz ediliyor...' : '🔊 Stimme wird analysiert...';

    // NEU: Merge HV results into local results
    var localHvPhrases = hvPhrases[lang] || hvPhrases.de;
    var localHvResults = hvResults[lang] || hvResults.de;
    var hvBtnResults = ['hormone_ovulation', 'hormone_testosterone', 'vascular_tense', 'vascular_relaxed'];
    Object.keys(localHvResults).forEach(function(k) { localResults[k] = localHvResults[k]; });

    btns.forEach(function(btn, index) {
        btn.addEventListener('click', function() {
            if (isRunning) return;
            isRunning = true;
            var resultKey = btn.getAttribute('data-result') || btnResults[index] || 'calm';
            // Check if this is a HV button
            var isHV = hvBtnResults.indexOf(resultKey) !== -1;
            var hvIndex = hvBtnResults.indexOf(resultKey);
            var phrase = isHV ? (localHvPhrases[hvIndex] || localHvPhrases[0]) : (localPhrases[index] || localPhrases[0]);

            // Natural human speech parameters per mood
            // calm: slow, warm, deep — like a relaxed person
            // tense: slightly faster, slightly higher — mild nervousness
            // stressed: faster but not robotic, higher pitch — audible strain
            var rate = resultKey === 'calm' ? 0.88 : resultKey === 'tense' ? 0.98 : 1.06;
            var pitch = resultKey === 'calm' ? 0.9 : resultKey === 'tense' ? 1.0 : 1.08;

            resultEl.style.display = 'none';
            analyzingEl.style.display = 'block';
            if (analyzingText) analyzingText.innerHTML = '🎤 <em>"' + phrase.substring(0, 45) + '..."</em>';
            analyzingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

            speakText(phrase, localSpeechLang, rate, pitch, function() {
                if (analyzingText) analyzingText.innerHTML = analyzingMsg;
                setTimeout(function() {
                    analyzingEl.style.display = 'none';
                    var r = localResults[resultKey];
                    resultEl.innerHTML =
                        '<div style="font-size:1.4rem;font-weight:700;color:' + r.color + ';margin-bottom:15px;">' + r.label + '</div>' +
                        '<div style="background:rgba(255,255,255,0.03);padding:12px 16px;border-radius:10px;margin-bottom:16px;border-left:3px solid ' + r.color + ';">' +
                            '<div style="font-size:0.8rem;color:#a0a8b4;margin-bottom:4px;">' + r.analyzedLabel + '</div>' +
                            '<div style="font-size:0.95rem;color:#e0e3e8;font-style:italic;">"' + phrase + '"</div>' +
                        '</div>' +
                        '<div style="display:flex;justify-content:center;gap:20px;margin-bottom:20px;flex-wrap:wrap;">' +
                            '<div style="background:rgba(255,255,255,0.05);padding:10px 16px;border-radius:10px;"><div style="font-size:0.8rem;color:#c8cdd5;">' + r.cortisolLabel + '</div><div style="font-weight:600;color:' + r.color + ';">' + r.cortisol + '</div></div>' +
                            '<div style="background:rgba(255,255,255,0.05);padding:10px 16px;border-radius:10px;"><div style="font-size:0.8rem;color:#c8cdd5;">' + r.energyLabel + '</div><div style="font-weight:600;color:' + r.color + ';">' + r.energy + '</div></div>' +
                            '<div style="background:rgba(255,255,255,0.05);padding:10px 16px;border-radius:10px;"><div style="font-size:0.8rem;color:#c8cdd5;">HRV</div><div style="font-weight:600;color:' + r.color + ';">' + r.hrv + '</div></div>' +
                        '</div>' +
                        r.tips.map(function(t) { return '<div style="background:rgba(255,255,255,0.04);padding:12px 16px;border-radius:10px;margin-bottom:8px;text-align:left;color:#e0e3e8;font-size:0.95rem;">' + t + '</div>'; }).join('') +
                        (r.extra || '') +
                        '<a href="/app" style="display:inline-block;margin-top:20px;padding:12px 28px;background:linear-gradient(135deg,#00c4aa,#00a89d);color:#fff;border-radius:10px;text-decoration:none;font-weight:600;">' + r.ctaText + '</a>';
                    resultEl.style.display = 'block';
                    resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    isRunning = false;
                }, 2000);
            });
        });
    });
})();
