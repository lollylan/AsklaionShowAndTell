import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Arm als dicker Strich mit heller Kontur. */
function Arm({ von, nach }: { von: [number, number]; nach: [number, number] }) {
  const d = `M${von[0]} ${von[1]} L${nach[0]} ${nach[1]}`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={F.linie} strokeWidth={36} />
      <path d={d} stroke={F.petrol} strokeWidth={28} />
    </g>
  );
}

const HERZ =
  'M0 -14 C-6 -30 -34 -30 -34 -6 C-34 14 -12 26 0 40 C12 26 34 14 34 -6 C34 -30 6 -30 0 -14 Z';

/** Oberkörper mit den Organen, die ein jahrelang hoher Blutdruck schädigt. */
export default function BluthochdruckFolgen() {
  return (
    <Zeichnung titel="Oberkörper mit vier hervorgehobenen Organen, die ein jahrelang zu hoher Blutdruck schädigen kann: Gehirn, Augen, Herz und Nieren">
      {/* Arme, Rumpf, Hals, Kopf */}
      <Arm von={[272, 268]} nach={[246, 520]} />
      <Arm von={[448, 268]} nach={[474, 520]} />
      <path d="M262 254 Q360 228 458 254 L444 586 Q360 600 276 586 Z" {...KONTUR} fill={F.petrol} />
      <rect x="340" y="200" width="40" height="44" {...KONTUR} fill={F.petrol} />
      <circle cx="360" cy="148" r="64" {...KONTUR} fill={F.petrol} />

      {/* Gehirn */}
      <path
        d="M318 140 C312 112 336 96 360 100 C384 96 408 112 402 140 C396 150 324 150 318 140 Z"
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="3"
      />
      {/* Augen */}
      <circle cx="340" cy="170" r="8" fill={F.kupferHell} />
      <circle cx="380" cy="170" r="8" fill={F.kupferHell} />

      {/* Herz */}
      <g transform="translate(388 334) scale(1.15)">
        <path d={HERZ} fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      </g>

      {/* Nieren */}
      <ellipse cx="320" cy="462" rx="17" ry="28" transform="rotate(-12 320 462)" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />
      <ellipse cx="400" cy="462" rx="17" ry="28" transform="rotate(12 400 462)" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="3" />

      <Zeiger von={[152, 118]} nach={[330, 124]} />
      <Etikett x={40} y={112}>
        Gehirn
      </Etikett>
      <Unterzeile x={40} y={142}>
        Schlaganfall
      </Unterzeile>

      <Zeiger von={[548, 176]} nach={[388, 170]} />
      <Etikett x={560} y={170}>
        Augen
      </Etikett>
      <Unterzeile x={560} y={200}>
        Sehstörungen
      </Unterzeile>

      <Zeiger von={[124, 318]} nach={[372, 330]} />
      <Etikett x={40} y={310}>
        Herz
      </Etikett>
      <Unterzeile x={40} y={340}>
        Herzinfarkt,
      </Unterzeile>
      <Unterzeile x={40} y={368}>
        Herzschwäche
      </Unterzeile>

      <Zeiger von={[526, 454]} nach={[414, 460]} />
      <Etikett x={536} y={450}>
        Nieren
      </Etikett>
      <Unterzeile x={536} y={480}>
        werden schwach
      </Unterzeile>

      <Etikett x={360} y={648} anker="middle">
        Der hohe Druck schädigt über Jahre
      </Etikett>
      <Unterzeile x={360} y={682} anker="middle">
        lange ohne dass man etwas spürt
      </Unterzeile>
    </Zeichnung>
  );
}
