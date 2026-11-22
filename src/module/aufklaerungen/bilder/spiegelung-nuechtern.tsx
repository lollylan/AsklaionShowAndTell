import { Etikett, F, Folge, Unterzeile, Wachsen, Zeichnung } from './bausteine';

// Zeitachse: x = 600 − Stunden vor der Untersuchung × 73.
const SECHS = 162;
const ZWEI = 454;
const NULL = 600;

/** Nüchtern vor einer Magen- oder Lungenspiegelung: Essen bis sechs, klares Wasser bis zwei Stunden vorher. */
export default function SpiegelungNuechtern() {
  return (
    <Zeichnung titel="Zeitleiste vor einer Spiegelung. Essen ist bis sechs Stunden vorher erlaubt, klares Wasser oder Tee ohne Milch bis zwei Stunden vorher. Danach bleibt man bis zur Untersuchung nüchtern">
      <Etikett x={360} y={78} anker="middle">
        Nüchtern zur Spiegelung
      </Etikett>
      <Unterzeile x={360} y={112} anker="middle">
        Es gilt das Merkblatt Ihrer Praxis
      </Unterzeile>

      {/* Hilfslinien zu den Zeitpunkten */}
      <path
        d={`M${SECHS} 284 L${SECHS} 326 M${SECHS} 424 L${SECHS} 560 M${ZWEI} 424 L${ZWEI} 560`}
        stroke={F.leise}
        strokeWidth="2"
        strokeDasharray="6 8"
      />

      {/* Essen */}
      <Etikett x={60} y={216}>
        Essen
      </Etikett>
      <path d={`M${SECHS} 256 L${NULL} 256`} stroke={F.leise} strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
      <Wachsen d={`M60 256 L${SECHS} 256`} farbe={F.petrolHell} breite={30} kappe="butt" dauer={1} ab={0.6} />
      <Folge ab={1.6} von={0}>
        <path d={`M${SECHS} 232 L${SECHS} 280`} stroke={F.kupfer} strokeWidth="8" strokeLinecap="round" />
      </Folge>

      {/* Klare Getränke */}
      <Etikett x={60} y={356}>
        Wasser, Tee ohne Milch
      </Etikett>
      <path d={`M${ZWEI} 396 L${NULL} 396`} stroke={F.leise} strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
      <Wachsen d={`M60 396 L${ZWEI} 396`} farbe={F.petrolHell} breite={30} kappe="butt" dauer={2} ab={1.8} />
      <Folge ab={3.8} von={0}>
        <path d={`M${ZWEI} 372 L${ZWEI} 420`} stroke={F.kupfer} strokeWidth="8" strokeLinecap="round" />
      </Folge>

      {/* Zeitachse */}
      <path d={`M40 560 L${NULL} 560`} stroke={F.linie} strokeWidth="4" strokeLinecap="round" />
      <circle cx={SECHS} cy="560" r="8" fill={F.linie} />
      <circle cx={ZWEI} cy="560" r="8" fill={F.linie} />
      <Etikett x={SECHS} y={604} anker="middle">
        6 Std. vorher
      </Etikett>
      <Etikett x={ZWEI} y={604} anker="middle">
        2 Std. vorher
      </Etikett>

      <Folge ab={4.4} von={0.3}>
        <circle cx={NULL} cy="560" r="16" fill={F.kupfer} stroke={F.creme} strokeWidth="4" />
        <Etikett x={NULL} y={516} anker="middle" farbe={F.kupferHell}>
          Spiegelung
        </Etikett>
      </Folge>

      <Unterzeile x={360} y={676} anker="middle">
        Tabletten mit einem Schluck Wasser, wenn besprochen
      </Unterzeile>
    </Zeichnung>
  );
}
