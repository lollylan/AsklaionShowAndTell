import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const BODEN = 500;

function Gleich({ x }: { x: number }) {
  return (
    <path
      d={`M${x - 18} 388 L${x + 18} 388 M${x - 18} 408 L${x + 18} 408`}
      fill="none"
      stroke={F.kupfer}
      strokeWidth="6"
      strokeLinecap="round"
    />
  );
}

/** Bier, Wein und Schnaps nebeneinander – jedes ein Standardglas. */
export default function Alkohol() {
  return (
    <Zeichnung titel="Ein kleines Bier, ein kleines Glas Wein und ein Schnaps enthalten etwa gleich viel Alkohol, je ein Standardglas">
      <line x1="60" y1={BODEN + 2} x2="660" y2={BODEN + 2} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Bier */}
      <path d="M109 296 L191 296 L185 494 L115 494 Z" fill={F.petrolHell} />
      <path d="M108 268 Q118 250 134 262 Q150 246 166 262 Q182 250 192 268 L188 298 L112 298 Z" fill={F.creme} />
      <path d="M104 250 L196 250 L186 500 L114 500 Z" {...KONTUR} />

      {/* Wein */}
      <path d="M318 334 L402 334 Q398 384 360 388 Q322 384 318 334 Z" fill={F.petrolHell} />
      <path d="M310 290 L410 290 Q410 392 360 396 Q310 392 310 290 Z" {...KONTUR} />
      <path d="M360 396 L360 492" {...KONTUR} />
      <path d="M318 498 Q360 486 402 498" {...KONTUR} />

      {/* Schnaps */}
      <path d="M543 426 L597 426 L594 494 L546 494 Z" fill={F.petrolHell} />
      <path d="M536 404 L604 404 L598 500 L542 500 Z" {...KONTUR} />

      <Gleich x={253} />
      <Gleich x={467} />

      <Etikett x={150} y={560} anker="middle">
        Bier 0,25 l
      </Etikett>
      <Etikett x={360} y={560} anker="middle">
        Wein 0,1 l
      </Etikett>
      <Etikett x={570} y={560} anker="middle">
        Schnaps 4 cl
      </Etikett>

      <Etikett x={360} y={90} anker="middle">
        Jedes enthält gleich viel Alkohol
      </Etikett>
      <Unterzeile x={360} y={124} anker="middle">
        je ein Standardglas, etwa 10 bis 12 Gramm
      </Unterzeile>

      <Etikett x={360} y={650} anker="middle" farbe={F.kupferHell}>
        Je weniger, desto besser
      </Etikett>
    </Zeichnung>
  );
}
