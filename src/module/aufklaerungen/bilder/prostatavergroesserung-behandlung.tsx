import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Blase, Prostata und Harnröhre im Schnitt (wie prostatavergroesserung.tsx, etwas tiefer). */
function Blasenbild({ cx, verkleinert }: { cx: number; verkleinert: boolean }) {
  return (
    <g>
      <path
        d={`M${cx - 20} 356 C${cx - 110} 350 ${cx - 125} 280 ${cx - 120} 230 C${cx - 112} 160 ${cx - 60} 132 ${cx} 132 C${cx + 60} 132 ${cx + 112} 160 ${cx + 120} 230 C${cx + 125} 280 ${cx + 110} 350 ${cx + 20} 356 Z`}
        {...KONTUR}
        fill={F.petrol}
      />

      {verkleinert ? (
        <g>
          {/* frühere Größe gestrichelt, jetzt kleiner */}
          <ellipse cx={cx} cy={418} rx="90" ry="68" fill="none" stroke={F.leise} strokeWidth="3" strokeDasharray="6 7" />
          <ellipse cx={cx} cy={410} rx="64" ry="52" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
        </g>
      ) : (
        <ellipse cx={cx} cy={418} rx="90" ry="68" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      )}

      {/* Harnröhre: in beiden Fällen wieder offener */}
      <path
        d={`M${cx - 8} 350 L${cx - 8} 540 L${cx + 8} 540 L${cx + 8} 350 Z`}
        fill={F.tief}
        stroke={F.linie}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Pfeil d={`M${cx} 556 L${cx} 606`} farbe={F.petrolHell} breite={8} />
    </g>
  );
}

/** Zwei Wirkweisen der Tabletten: Muskeln entspannen (Tage) oder Prostata verkleinern (Monate). */
export default function ProstatavergroesserungBehandlung() {
  return (
    <Zeichnung titel="Zwei Wirkweisen der Tabletten: Links entspannt Tamsulosin die Muskeln, die Harnröhre wird weiter, das wirkt nach wenigen Tagen. Rechts verkleinert Finasterid die Prostata langsam, das braucht einige Monate">
      <Blasenbild cx={190} verkleinert={false} />
      <Blasenbild cx={530} verkleinert />

      {/* Entspannung: Pfeile nach außen an der Harnröhre */}
      <Pfeil d="M168 418 L140 418" farbe={F.linie} breite={4} />
      <Pfeil d="M212 418 L240 418" farbe={F.linie} breite={4} />

      <Etikett x={190} y={66} anker="middle">
        Tamsulosin
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        entspannt die Muskeln
      </Unterzeile>
      <Etikett x={530} y={66} anker="middle">
        Finasterid
      </Etikett>
      <Unterzeile x={530} y={98} anker="middle">
        verkleinert die Prostata
      </Unterzeile>

      <Etikett x={190} y={660} anker="middle">
        nach wenigen Tagen
      </Etikett>
      <Etikett x={530} y={660} anker="middle">
        nach einigen Monaten
      </Etikett>
    </Zeichnung>
  );
}
