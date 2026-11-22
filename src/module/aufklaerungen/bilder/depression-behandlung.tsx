import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const STIMMUNG = 'M80 400 L200 396 C270 392 300 290 380 250 C430 228 520 226 660 224';

/** Zeitverlauf mit Antidepressivum: Wirkung nach 2–4 Wochen, danach noch Monate weiter einnehmen. */
export default function DepressionBehandlung() {
  return (
    <Zeichnung titel="Zeitachse: Die Stimmung bleibt in den ersten zwei bis vier Wochen mit dem Medikament noch gedrückt und hellt sich dann auf; das Medikament läuft auch nach der Besserung noch mehrere Monate weiter, als Schutz vor einem Rückfall">
      <Etikett x={360} y={70} anker="middle">
        Antidepressiva brauchen Zeit
      </Etikett>

      <Unterzeile x={80} y={160}>
        Stimmung
      </Unterzeile>
      <line x1="80" y1="180" x2="80" y2="440" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Wartezeit */}
      <rect x="80" y="180" width="200" height="260" fill={F.leise} fillOpacity="0.1" />
      <line x1="280" y1="180" x2="280" y2="540" stroke={F.leise} strokeWidth="2" strokeDasharray="4 8" />
      <line x1="400" y1="180" x2="400" y2="540" stroke={F.leise} strokeWidth="2" strokeDasharray="4 8" />

      <path d={STIMMUNG} fill="none" stroke={F.linie} strokeWidth="7" strokeLinecap="round" />
      <Etikett x={420} y={200}>
        Besserung
      </Etikett>

      {/* Medikament */}
      <rect x="80" y="470" width="580" height="56" rx="28" fill={F.petrolHell} />
      <rect x="400" y="470" width="260" height="56" rx="28" fill={F.kupfer} />
      <rect x="400" y="470" width="40" height="56" fill={F.kupfer} />
      <Etikett x={110} y={507} farbe={F.linie}>
        Medikament
      </Etikett>

      <Etikett x={180} y={584} anker="middle">
        2–4 Wochen
      </Etikett>
      <Unterzeile x={180} y={616} anker="middle">
        bis es wirkt
      </Unterzeile>

      <Etikett x={530} y={584} anker="middle" farbe={F.kupferHell}>
        noch Monate weiter
      </Etikett>
      <Unterzeile x={530} y={616} anker="middle">
        schützt vor Rückfall
      </Unterzeile>
    </Zeichnung>
  );
}
