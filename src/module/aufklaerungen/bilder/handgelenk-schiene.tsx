import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

// Unterarm und Hand von der Seite (Handrücken oben, Handfläche unten), Finger zeigen nach rechts.
// Handgelenk bei (0, 0).

const UNTERARM = 'M-280 -44 C-200 -42 -80 -34 0 -29 L0 31 C-80 36 -200 46 -280 48 Z';
const HAND =
  'M-6 -29 C30 -33 74 -36 110 -32 C134 -30 156 -24 180 -18 C200 -13 216 -6 222 4 ' +
  'C226 13 217 20 206 17 C186 12 162 12 138 15 C122 18 110 24 98 30 C70 40 30 42 -6 34 Z';
/** Daumen von der Speichenseite, vor der Hand. */
const DAUMEN = 'M14 22 C44 38 84 48 124 46 C140 45 142 31 128 28 C100 22 70 18 38 10 Z';
const MANSCHETTE =
  'M-176 -48 C-110 -43 -50 -36 0 -35 C34 -37 62 -38 86 -35 L86 38 C62 38 34 37 0 37 ' +
  'C-60 39 -120 46 -176 52 Z';

const non = { vectorEffect: 'non-scaling-stroke' } as const;

function Arm({ knick = 0, schiene = false, nerv }: { knick?: number; schiene?: boolean; nerv?: 'eng' | 'frei' }) {
  const hand = `rotate(${knick})`;
  return (
    <g>
      {/* erst Konturen, dann Flächen: Unterarm und Hand verschmelzen */}
      <path d={UNTERARM} fill={F.linie} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" {...non} />
      <path d={HAND} transform={hand} fill={F.linie} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" {...non} />
      <circle cx="0" cy="1" r="31" fill={F.linie} />
      <path d={UNTERARM} fill={F.petrol} />
      <path d={HAND} transform={hand} fill={F.petrol} />
      <circle cx="0" cy="1" r="27" fill={F.petrol} />
      {/* Linker Schnittrand ohne Kontur */}
      <rect x="-285" y="-52" width="9" height="104" fill={F.petrol} />
      {/* Fingerfurchen */}
      <path d="M140 -6 C166 -4 190 0 210 6 M136 -18 C160 -14 184 -8 204 -2" transform={hand} fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" {...non} />

      {/* Nerv an der Handflächenseite */}
      {schiene && (
        <g>
          <path d={MANSCHETTE} fill={F.kupfer} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" {...non} />
          {[-136, -50, 46].map((x) => (
            <rect key={x} x={x - 13} y={x < 0 ? -50 + x * -0.02 : -42} width="26" height={x < 0 ? 104 : 86} rx="7" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" {...non} />
          ))}
        </g>
      )}
      {nerv && (
        <g fill="none" stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round" {...non}>
          <path d="M-270 26 C-180 22 -80 16 0 14" {...non} />
          <path d="M0 14 L22 14" transform={hand} {...non} />
        </g>
      )}

      <path d={DAUMEN} transform={hand} fill={F.petrol} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" {...non} />
    </g>
  );
}

/** Mondsichel, Mitte (x, y). */
function Mond({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <defs>
        <mask id="handgelenk-schiene-mond">
          <circle cx={x} cy={y} r="18" fill="#fff" />
          <circle cx={x + 9} cy={y - 6} r="15" fill="#000" />
        </mask>
      </defs>
      <circle cx={x} cy={y} r="18" fill={F.kupferHell} mask="url(#handgelenk-schiene-mond)" />
    </g>
  );
}

export default function HandgelenkSchiene() {
  return (
    <Zeichnung titel="Unterarm und Hand von der Seite mit einer Schiene, die das Handgelenk nachts gerade hält. Darunter der Vergleich: nachts abgeknickt wird der Nerv im Handgelenk eingeengt, mit der Schiene gerade gehalten ist er entlastet">
      <Etikett x={360} y={66} anker="middle">
        Schiene hält das Handgelenk gerade
      </Etikett>
      <Mond x={282} y={94} />
      <Unterzeile x={312} y={102}>
        vor allem nachts
      </Unterzeile>

      <g transform="translate(372 236)">
        <Arm schiene />
      </g>

      <line x1="60" y1="340" x2="660" y2="340" stroke={F.leise} strokeWidth="2" strokeOpacity="0.5" />

      {/* Vergleich: abgeknickt / gerade */}
      <g transform="translate(212 430) scale(0.6)">
        <Arm knick={58} nerv="eng" />
        <g fill={F.kupfer}>
          <circle cx="2" cy="22" r="44" fillOpacity="0.25" />
          <circle cx="2" cy="22" r="24" fillOpacity="0.4" />
        </g>
      </g>
      <g transform="translate(546 430) scale(0.6)">
        <Arm nerv="frei" schiene />
      </g>

      <Etikett x={190} y={596} anker="middle" farbe={F.kupferHell}>
        nachts abgeknickt
      </Etikett>
      <Unterzeile x={190} y={630} anker="middle">
        Nerv eingeengt
      </Unterzeile>
      <Etikett x={530} y={596} anker="middle">
        gerade
      </Etikett>
      <Unterzeile x={530} y={630} anker="middle">
        Nerv entlastet
      </Unterzeile>
    </Zeichnung>
  );
}
