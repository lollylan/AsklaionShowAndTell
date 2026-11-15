import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from '../../aufklaerungen/bilder/bausteine';

/* Zwei Lendenwirbel von der Seite, Bauch links, Rücken rechts. Oberer Wirbel ab y = 0, unterer ab y = 154. */
const DORN = 'M114 20 L160 16 C186 20 220 38 240 54 C248 64 240 76 230 74 C206 70 180 64 160 62 L114 66 Z';

/** Nervenstrang hinter den Wirbeln: gerade oder an der Bandscheibe nach hinten gedrückt. */
const NERV_GERADE = 'M128 -40 L128 300 L152 300 L152 -40 Z';
const NERV_GEDRUECKT =
  'M128 -40 L128 96 C128 112 152 114 152 132 C152 150 128 152 128 168 L128 300 L152 300 L152 168 C152 152 172 150 172 132 C172 114 152 112 152 96 L152 -40 Z';
const NERV_DELLE =
  'M128 96 C128 112 152 114 152 132 C152 150 128 152 128 168 L152 168 C152 152 172 150 172 132 C172 114 152 112 152 96 Z';
/** Nervenwurzel, die nach unten vorn ins Bein zieht. */
const WURZEL = 'M138 236 C134 276 108 300 72 330';

function Segment({ vorfall }: { vorfall: boolean }) {
  return (
    <g>
      <path d={DORN} {...KONTUR} fill={F.creme} />
      <path d={DORN} transform="translate(0 154)" {...KONTUR} fill={F.creme} />

      {/* Bandscheibe: Faserring mit Gallertkern */}
      <rect x="-4" y="104" width="128" height="56" rx="22" {...KONTUR} fill={F.petrol} />
      <rect x="0" y="0" width="120" height="110" rx="14" {...KONTUR} fill={F.creme} />
      <rect x="0" y="154" width="120" height="110" rx="14" {...KONTUR} fill={F.creme} />
      <path d="M8 124 C40 118 80 118 112 124 M8 140 C40 146 80 146 112 140" fill="none" stroke={F.leise} strokeWidth="2" />
      {vorfall ? (
        <path
          d="M34 132 C34 122 56 120 78 124 C98 126 116 120 134 118 C150 118 156 144 136 147 C116 148 98 140 78 142 C56 144 34 142 34 132 Z"
          {...KONTUR}
          fill={F.kupfer}
        />
      ) : (
        <ellipse cx="58" cy="132" rx="26" ry="11" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      )}

      <path d={WURZEL} {...KONTUR} strokeWidth="16" />
      <path d={WURZEL} {...KONTUR} stroke={vorfall ? F.kupferHell : F.leise} strokeWidth="9" />
      <path d={vorfall ? NERV_GEDRUECKT : NERV_GERADE} {...KONTUR} fill={F.leise} />
      {vorfall && <path d={NERV_DELLE} {...KONTUR} fill={F.kupferHell} />}
    </g>
  );
}

/** Lendenwirbel von der Seite mit Bandscheibe und Nervenstrang; erkrankt tritt der Kern nach hinten aus. */
export default function Bandscheibenvorfall() {
  return (
    <Zeichnung titel="Zwei Lendenwirbel von der Seite mit der Bandscheibe dazwischen, dahinter der Nerv: links gesund mit dem Gallertkern mittig im Faserring, rechts beim Bandscheibenvorfall tritt der Kern nach hinten aus und drückt auf den Nerv, der Schmerz zieht ins Bein">
      <g transform="translate(70 190)">
        <Segment vorfall={false} />
      </g>
      <g transform="translate(410 190)">
        <Segment vorfall />
      </g>

      <Etikett x={190} y={66} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={190} y={98} anker="middle">
        Kern liegt mittig
      </Unterzeile>
      <Etikett x={530} y={66} anker="middle" farbe={F.kupferHell}>
        Bandscheibenvorfall
      </Etikett>
      <Unterzeile x={530} y={98} anker="middle">
        Kern drückt auf den Nerv
      </Unterzeile>

      <Zeiger von={[110, 168]} nach={[120, 222]} />
      <Etikett x={70} y={160}>
        Wirbel
      </Etikett>
      <Zeiger von={[44, 610]} nach={[68, 322]} />
      <Etikett x={24} y={644}>
        Bandscheibe
      </Etikett>
      <Zeiger von={[178, 548]} nach={[150, 518]} />
      <Etikett x={160} y={580}>
        Nerv
      </Etikett>

      <Zeiger von={[500, 548]} nach={[490, 518]} />
      <Etikett x={430} y={580} farbe={F.kupferHell}>
        Schmerz ins Bein
      </Etikett>
    </Zeichnung>
  );
}
