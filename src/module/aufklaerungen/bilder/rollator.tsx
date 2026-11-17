import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Rad, Rohre, Silhouette } from './gehhilfen';

const BODEN = 600;

/** Figur geht aufrecht im Rollator, Hinterräder etwa auf Höhe der Füße. */
export default function Rollator() {
  return (
    <Zeichnung titel="Figur geht aufrecht im Rollator, die Hände an den Griffen. Vor dem Hinsetzen die Bremsen feststellen, an Bordsteinen mit dem Fuß auf die Kipphilfe treten">
      <line x1="150" y1={BODEN + 2} x2="620" y2={BODEN + 2} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Rollator, hintere Seite */}
      <Rad x={370} y={566} r={26} hinten />
      <Rad x={554} y={570} r={22} hinten />
      <Rohre pfade={['M370 566 L366 382', 'M550 552 L372 398']} farbe={F.petrolDunkel} />

      {/* Figur */}
      <Silhouette
        farbe={F.petrolDunkel}
        glieder={[
          { p: [[266, 350], [252, 464], [228, 574]], b: 32 },
          { p: [[228, 582], [252, 590]], b: 18 },
        ]}
      />
      <Silhouette
        glieder={[
          { p: [[270, 350], [284, 466], [272, 578]], b: 32 },
          { p: [[272, 586], [288, 590]], b: 18 },
          { p: [[268, 210], [268, 342]], b: 58 },
        ]}
        kreise={[{ x: 278, y: 152, r: 32 }]}
      />

      {/* Rollator, vordere Seite */}
      <Rohre pfade={['M356 574 L352 392 Q352 370 332 370 L304 370', 'M536 556 L356 404']} />
      <Rohre pfade={['M354 440 L432 440']} b={16} />
      {/* Kipphilfe */}
      <Rohre pfade={['M352 552 L316 552']} b={8} farbe={F.kupfer} />
      <circle cx="314" cy="552" r="9" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      {/* Bremse: Gehäuse am Griff und Hebel darunter */}
      <path d="M346 384 Q330 392 310 388" fill="none" stroke={F.linie} strokeWidth="14" strokeLinecap="round" />
      <path d="M346 384 Q330 392 310 388" fill="none" stroke={F.kupfer} strokeWidth="6" strokeLinecap="round" />
      <rect x="342" y="364" width="22" height="26" rx="6" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <path d="M536 556 L540 572" fill="none" stroke={F.linie} strokeWidth="14" strokeLinecap="round" />
      <Rad x={356} y={574} r={26} />
      <Rad x={540} y={578} r={22} />

      {/* Arm mit Hand am Griff */}
      <Silhouette glieder={[{ p: [[274, 218], [284, 300], [318, 364]], b: 22 }]} />

      <Etikett x={360} y={60} anker="middle">
        Aufrecht im Rollator gehen
      </Etikett>
      <Unterzeile x={360} y={94} anker="middle">
        nicht weit dahinter
      </Unterzeile>

      <Zeiger von={[410, 302]} nach={[362, 368]} />
      <Etikett x={690} y={290} anker="end">
        Bremsen feststellen
      </Etikett>
      <Unterzeile x={690} y={320} anker="end">
        vor dem Hinsetzen
      </Unterzeile>

      <Zeiger von={[312, 626]} nach={[312, 562]} />
      <Etikett x={312} y={654} anker="middle">
        Kipphilfe
      </Etikett>
      <Unterzeile x={312} y={684} anker="middle">
        für Bordsteine
      </Unterzeile>
    </Zeichnung>
  );
}
