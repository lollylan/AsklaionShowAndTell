import { Etikett, F, KONTUR, Zeichnung, Zeiger } from './bausteine';

type Punkt = [number, number];

const SCHNECKE: Punkt = [510, 340];
const DREHUNGEN = 2.5;
const BOGEN = DREHUNGEN * 2 * Math.PI;

/** Punkt auf der Spirale der Hörschnecke, außen beginnend (t = 0) bis innen (t = BOGEN). */
function spiralpunkt(t: number): Punkt {
  const r = 90 - (t / BOGEN) * 70;
  const winkel = Math.PI + t;
  return [SCHNECKE[0] + r * Math.cos(winkel), SCHNECKE[1] + r * Math.sin(winkel)];
}

const SPIRALE = (() => {
  const teile: string[] = [];
  for (let t = 0; t <= BOGEN; t += 0.1) {
    const [x, y] = spiralpunkt(t);
    teile.push(`${teile.length ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return teile.join(' ');
})();

/** Sinneszellen entlang der Schnecke; die äußeren (hohe Töne) sind abgenutzt. */
const ZELLEN: { p: Punkt; alt: boolean }[] = [];
for (let t = 0.3; t < BOGEN - 0.4; t += 0.42) {
  ZELLEN.push({ p: spiralpunkt(t), alt: t < 4 });
}

/** Ohr im Schnitt: Gehörgang mit Ohrenschmalz, Trommelfell und Hörschnecke mit Sinneszellen. */
export default function Schwerhoerigkeit() {
  return (
    <Zeichnung titel="Ohr im Schnitt: Ohrmuschel, Gehörgang mit einem Pfropf aus Ohrenschmalz, Trommelfell, Gehörknöchelchen und die Hörschnecke, in der die Sinneszellen für hohe Töne abgenutzt sind">
      {/* Schallwellen */}
      <path d="M44 310 Q30 345 44 380 M66 296 Q48 345 66 394" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Gehörgang */}
      <rect x="180" y="328" width="182" height="44" fill={F.petrolDunkel} />
      <path d="M180 328 L362 328 M180 372 L362 372" {...KONTUR} />
      <ellipse cx="276" cy="360" rx="24" ry="12" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />

      {/* Ohrmuschel */}
      <path
        d="M186 330 L186 262 C170 232 110 222 88 280 C74 320 92 360 98 392 C104 430 112 460 140 470 C166 478 184 462 186 438 L186 372"
        {...KONTUR}
        fill={F.creme}
      />
      <path d="M160 270 C130 262 112 290 120 320" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Trommelfell und Gehörknöchelchen */}
      <ellipse cx="364" cy="350" rx="7" ry="34" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <path d="M372 346 L394 334 L420 342" fill="none" stroke={F.leise} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

      {/* Hörschnecke */}
      <path d={SPIRALE} fill="none" stroke={F.petrolHell} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      {ZELLEN.map(({ p: [x, y], alt }) => (
        <circle key={`${x.toFixed(0)}-${y.toFixed(0)}`} cx={x} cy={y} r="4.5" fill={alt ? F.kupfer : F.linie} />
      ))}

      <Etikett x={360} y={80} anker="middle">
        Wo das Hören nachlässt
      </Etikett>

      <Zeiger von={[340, 262]} nach={[362, 314]} />
      <Etikett x={320} y={250} anker="middle">
        Trommelfell
      </Etikett>

      <Zeiger von={[562, 232]} nach={[528, 262]} />
      <Etikett x={600} y={222} anker="middle">
        Hörschnecke
      </Etikett>

      <Zeiger von={[560, 464]} nach={[578, 368]} />
      <Etikett x={500} y={492} anker="middle" farbe={F.kupferHell}>
        Sinneszellen nutzen sich ab
      </Etikett>

      <Zeiger von={[276, 516]} nach={[276, 372]} />
      <Etikett x={276} y={548} anker="middle" farbe={F.kupferHell}>
        Ohrenschmalz
      </Etikett>
    </Zeichnung>
  );
}
