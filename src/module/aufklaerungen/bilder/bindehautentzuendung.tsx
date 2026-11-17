import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

const LIDSPALTE = 'M-130 0 C-80 -80 80 -80 130 0 C80 80 -80 80 -130 0 Z';

/** Feine, gerötete Äderchen auf dem Weißen im Auge. */
const AEDERCHEN = [
  'M-128 0 C-110 -8 -96 4 -78 -6',
  'M-120 -18 C-104 -26 -92 -20 -74 -30',
  'M-118 20 C-100 26 -90 18 -72 28',
  'M128 0 C110 -8 96 4 78 -6',
  'M120 -18 C104 -26 92 -20 74 -30',
  'M118 20 C100 26 90 18 72 28',
  'M-96 -10 C-90 -16 -86 -14 -82 -20',
  'M96 12 C90 18 86 16 82 22',
];

/** Auge von vorn, Mitte (0, 0). */
function Auge({ krank }: { krank: boolean }) {
  return (
    <g>
      {/* Lidfalte */}
      <path d="M-128 -38 C-70 -112 70 -112 128 -38" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      {krank && <path d={LIDSPALTE} fill="none" stroke={F.kupfer} strokeWidth="18" strokeLinejoin="round" />}
      <path d={LIDSPALTE} fill={krank ? F.kupferHell : F.creme} />
      <g clipPath="url(#bindehautentzuendung-lidspalte)">
        {krank && (
          <g fill="none" stroke={F.kupfer} strokeWidth="3" strokeLinecap="round">
            {AEDERCHEN.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )}
        <circle cx="0" cy="0" r="52" fill={F.petrol} stroke={F.linie} strokeWidth="3" />
        <circle cx="0" cy="0" r="22" fill={F.tief} />
        <circle cx="-14" cy="-14" r="8" fill={F.creme} />
      </g>
      <path d={LIDSPALTE} fill="none" stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      {krank && (
        <path
          d="M-70 82 C-78 96 -82 104 -82 110 A12 12 0 0 0 -58 110 C-58 104 -62 96 -70 82 Z"
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/** Zwei Augen nebeneinander: links gesund, rechts mit geröteter, entzündeter Bindehaut. */
export default function Bindehautentzuendung() {
  return (
    <Zeichnung titel="Zwei Augen von vorn: links gesund mit weißer Bindehaut, rechts bei Bindehautentzündung mit geröteter Bindehaut, feinen roten Äderchen, gerötetem Lidrand und einer Träne">
      <defs>
        <clipPath id="bindehautentzuendung-lidspalte">
          <path d={LIDSPALTE} />
        </clipPath>
      </defs>

      <g transform="translate(185 340)">
        <Auge krank={false} />
      </g>
      <g transform="translate(535 340)">
        <Auge krank />
      </g>

      <Etikett x={185} y={150} anker="middle">
        Gesund
      </Etikett>
      <Unterzeile x={185} y={182} anker="middle">
        weiß und klar
      </Unterzeile>
      <Etikett x={535} y={150} anker="middle" farbe={F.kupferHell}>
        Bindehautentzündung
      </Etikett>
      <Unterzeile x={535} y={182} anker="middle">
        gerötet und tränend
      </Unterzeile>

      <Zeiger von={[150, 560]} nach={[90, 345]} />
      <Etikett x={150} y={596} anker="middle">
        Bindehaut
      </Etikett>

      <Unterzeile x={360} y={672} anker="middle">
        Das Sehen bleibt normal
      </Unterzeile>
    </Zeichnung>
  );
}
