import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Arm oder Hals als dicker Strich mit heller Kontur. */
function Glied({ von, nach, dicke }: { von: [number, number]; nach: [number, number]; dicke: number }) {
  const d = `M${von[0]} ${von[1]} L${nach[0]} ${nach[1]}`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={F.linie} strokeWidth={dicke + 8} />
      <path d={d} stroke={F.petrol} strokeWidth={dicke} />
    </g>
  );
}

/** Weicher Kupferschein über einer schmerzenden Stelle. */
function Schmerzzone({ cx, cy, rx, ry, drehung = 0 }: { cx: number; cy: number; rx: number; ry: number; drehung?: number }) {
  return (
    <g fill={F.kupfer} transform={`rotate(${drehung} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fillOpacity="0.25" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.72} fillOpacity="0.3" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.42} ry={ry * 0.42} fillOpacity="0.4" />
    </g>
  );
}

/** Oberkörper von vorn: Druck hinter dem Brustbein, der in Hals, linken Arm und Oberbauch ausstrahlt. */
export default function HerzinfarktZeichen() {
  return (
    <Zeichnung titel="Oberkörper von vorn: Druck und Enge hinter dem Brustbein, der Schmerz strahlt in Hals und Kiefer, in den linken Arm und in den Oberbauch aus. Hält er länger als fünf Minuten an, sofort 112 rufen">
      {/* Arme, Hals, Rumpf, Kopf */}
      <Glied von={[288, 225]} nach={[226, 520]} dicke={40} />
      <Glied von={[432, 225]} nach={[494, 520]} dicke={40} />
      <Glied von={[360, 160]} nach={[360, 200]} dicke={40} />
      <path
        d="M285 205 Q360 188 435 205 C450 260 446 420 440 560 L280 560 C274 420 270 260 285 205 Z"
        {...KONTUR}
        fill={F.petrol}
      />
      <circle cx="360" cy="120" r="50" {...KONTUR} fill={F.petrol} />

      {/* Schmerz und Ausstrahlung */}
      <Schmerzzone cx={360} cy={320} rx={66} ry={56} />
      <Schmerzzone cx={360} cy={170} rx={44} ry={22} />
      <Schmerzzone cx={465} cy={380} rx={26} ry={80} drehung={-12} />
      <Schmerzzone cx={360} cy={470} rx={50} ry={26} />
      <Pfeil d="M360 268 L360 204" farbe={F.kupferHell} breite={4} />
      <Pfeil d="M405 300 L446 328" farbe={F.kupferHell} breite={4} />
      <Pfeil d="M360 378 L360 440" farbe={F.kupferHell} breite={4} />

      <Zeiger von={[200, 122]} nach={[345, 172]} />
      <Etikett x={30} y={110}>
        Hals und Kiefer
      </Etikett>

      <Zeiger von={[190, 320]} nach={[330, 330]} />
      <Etikett x={30} y={300}>
        Druck
      </Etikett>
      <Unterzeile x={30} y={330}>
        Enge, Brennen
      </Unterzeile>

      <Zeiger von={[600, 312]} nach={[468, 390]} />
      <Etikett x={690} y={300} anker="end">
        Linker Arm
      </Etikett>

      <Zeiger von={[560, 472]} nach={[386, 472]} />
      <Etikett x={690} y={480} anker="end">
        Oberbauch
      </Etikett>

      <Etikett x={360} y={630} anker="middle" farbe={F.kupferHell}>
        Länger als fünf Minuten: 112
      </Etikett>
      <Unterzeile x={360} y={664} anker="middle">
        oft mit kaltem Schweiß, Übelkeit, Luftnot
      </Unterzeile>
    </Zeichnung>
  );
}
