import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Fingerkuppe von der Handfläche aus, oben rund, unten offen. */
const FINGER = 'M90 650 L90 262 A100 100 0 0 1 290 262 L290 650';

export default function BlutzuckerMessen() {
  return (
    <Zeichnung titel="Große Fingerkuppe von der Handfläche aus: gestochen wird seitlich an der Kuppe, nicht in der Mitte; daneben eine Stechhilfe und ein Messgerät mit Teststreifen, an dem ein Blutstropfen hängt, das Gerät zeigt 112 mg/dl">
      <defs>
        <clipPath id="blutzucker-messen-finger">
          <path d={`${FINGER} Z`} />
        </clipPath>
      </defs>

      {/* Finger */}
      <path d={`${FINGER} Z`} fill={F.creme} />
      <g clipPath="url(#blutzucker-messen-finger)" fill="none" stroke={F.leise} strokeWidth="2.5">
        {[22, 40, 58, 76, 94].map((r) => (
          <ellipse key={r} cx="190" cy="300" rx={r} ry={r * 1.25} />
        ))}
      </g>
      <path d="M112 478 Q190 496 268 478" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <path d={FINGER} fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Mitte meiden */}
      <circle cx="190" cy="270" r="26" fill={F.creme} stroke={F.petrol} strokeWidth="5" />
      <path d="M174 254 L206 286 M206 254 L174 286" stroke={F.petrol} strokeWidth="6" strokeLinecap="round" />

      {/* Gute Stechstellen seitlich */}
      <ellipse cx="114" cy="290" rx="13" ry="32" fill={F.kupfer} />
      <ellipse cx="266" cy="290" rx="13" ry="32" fill={F.kupfer} />

      <Etikett x={40} y={60} farbe={F.kupferHell}>
        seitlich stechen
      </Etikett>
      <Zeiger von={[100, 80]} nach={[114, 276]} />
      <Zeiger von={[250, 80]} nach={[266, 276]} />

      {/* Stechhilfe */}
      <rect x="560" y="154" width="40" height="18" rx="6" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <rect x="420" y="168" width="220" height="46" rx="22" fill={F.petrol} stroke={F.linie} strokeWidth="4" />
      <rect x="380" y="176" width="46" height="30" rx="10" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <line x1="378" y1="191" x2="362" y2="191" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Etikett x={510} y={130} anker="middle">
        Stechhilfe
      </Etikett>

      {/* Messgerät mit Teststreifen und Tropfen */}
      <rect x="374" y="420" width="104" height="20" rx="3" fill={F.creme} stroke={F.linie} strokeWidth="3" />
      <rect x="380" y="425" width="14" height="10" fill={F.kupferHell} />
      <path d="M362 408 C352 422 348 430 348 438 A14 14 0 0 0 376 438 C376 430 372 422 362 408 Z" fill={F.kupfer} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />
      <rect x="470" y="400" width="200" height="200" rx="24" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x="488" y="420" width="164" height="82" rx="8" fill={F.tief} stroke={F.leise} strokeWidth="2" />
      <text x="570" y="472" textAnchor="middle" fontSize="30" fontWeight="700" fill={F.kupferHell}>
        112 mg/dl
      </text>
      <circle cx="540" cy="550" r="16" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <circle cx="600" cy="550" r="16" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />

      <Etikett x={370} y={384}>
        Teststreifen
      </Etikett>
      <Etikett x={570} y={646} anker="middle">
        Messgerät
      </Etikett>

      <Unterzeile x={40} y={696}>
        vorher Hände warm waschen
      </Unterzeile>
    </Zeichnung>
  );
}
