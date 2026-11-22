import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Rohre, Silhouette } from './gehhilfen';

const AUGE: [number, number] = [262, 236];
const OBERKANTE: [number, number] = [530, 236];

/** Arbeitsplatz von der Seite: Oberkante des Bildschirms auf Augenhöhe, Kopf aufrecht. */
export default function VertebragenerSchwindelBildschirm() {
  return (
    <Zeichnung titel="Arbeitsplatz von der Seite: Eine Person sitzt aufrecht am Tisch, die Oberkante des Bildschirms liegt auf Augenhöhe. Darunter der Rat: regelmäßig kurze Pausen, Schultern kreisen und den Kopf langsam drehen">
      {/* Stuhl */}
      <Rohre pfade={['M150 300 L150 580', 'M150 450 L270 450 L270 580']} b={10} farbe={F.petrolHell} />
      {/* Tisch */}
      <Rohre pfade={['M330 400 L660 400', 'M640 400 L640 580']} b={12} farbe={F.petrolHell} />
      {/* Bildschirm von der Seite mit Fuß */}
      <rect x="520" y="230" width="22" height="126" rx="5" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <path d="M531 356 L531 392 M500 394 L566 394" stroke={F.linie} strokeWidth="6" strokeLinecap="round" />

      <Silhouette
        glieder={[
          { p: [[196, 430], [300, 432], [306, 572]], b: 36 },
          { p: [[306, 576], [338, 578]], b: 22 },
          { p: [[228, 270], [228, 290]], b: 26 },
        ]}
        flaechen={[{ d: 'M180 442 C172 390 180 320 200 294 L248 294 C262 320 258 390 240 442 Z' }]}
        kreise={[{ x: 236, y: 236, r: 32 }]}
      />
      <Silhouette glieder={[{ p: [[224, 310], [270, 380], [350, 390]], b: 22, farbe: F.petrolHell }]} />

      {/* Blicklinie */}
      <line x1={AUGE[0]} y1={AUGE[1]} x2={OBERKANTE[0] - 6} y2={OBERKANTE[1]} stroke={F.kupferHell} strokeWidth="4" strokeDasharray="10 9" strokeLinecap="round" />
      <circle cx={AUGE[0] - 4} cy={AUGE[1]} r="5" fill={F.linie} />

      <Zeiger von={[600, 170]} nach={[536, 232]} />
      <Etikett x={690} y={120} anker="end">
        Oberkante auf
      </Etikett>
      <Etikett x={690} y={152} anker="end">
        Augenhöhe
      </Etikett>

      <Etikett x={360} y={640} anker="middle">
        Regelmäßig kurze Pausen
      </Etikett>
      <Unterzeile x={360} y={672} anker="middle">
        Schultern kreisen, Kopf langsam drehen
      </Unterzeile>
    </Zeichnung>
  );
}
