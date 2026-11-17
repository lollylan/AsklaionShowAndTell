import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const WINKEL = [-150, -120, -90, -60, -30];
/** Lage der Hirnwindungen, als Anteil der Halbachsen. */
const WINDUNGEN: [number, number][] = [
  [-0.78, -0.42],
  [-0.62, 0.0],
  [-0.8, 0.4],
  [-0.5, 0.7],
  [0.16, -0.5],
  [0.36, -0.08],
  [0.22, 0.36],
  [0.12, 0.72],
];

/** Schädel im Querschnitt von vorn, Mittelpunkt (0, 0). Je kleiner das Gehirn, desto länger und straffer die Brückenvenen. */
function Schaedel({ rx, ry, alt }: { rx: number; ry: number; alt: boolean }) {
  const dura = { rx: 136, ry: 130 };
  const unten = alt ? 16 : 0;
  return (
    <g>
      <ellipse cx="0" cy="0" rx="156" ry="150" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <ellipse cx="0" cy="0" rx="140" ry="134" fill={F.tief} stroke={F.leise} strokeWidth="2" />
      <ellipse cx="0" cy="0" rx={dura.rx} ry={dura.ry} fill="none" stroke={F.petrolHell} strokeWidth="5" />

      {/* Gehirn mit zwei Hälften, im Alter etwas abgesunken */}
      <g transform={`translate(0 ${unten})`}>
        <ellipse cx="0" cy="0" rx={rx} ry={ry} {...KONTUR} fill={F.petrol} />
        <line x1="0" y1={-ry} x2="0" y2={ry * 0.3} stroke={F.tief} strokeWidth={alt ? 8 : 4} strokeLinecap="round" />
        <g fill="none" stroke={alt ? F.tief : F.leise} strokeWidth={alt ? 5 : 3} strokeLinecap="round">
          {WINDUNGEN.map(([x, y]) => (
            <path
              key={`${x}-${y}`}
              d={`M${x * rx} ${y * ry} c${rx * 0.06} -10 ${rx * 0.12} 10 ${rx * 0.18} 0 s${rx * 0.12} 10 ${rx * 0.18} 0`}
            />
          ))}
        </g>
      </g>

      {/* Brückenvenen zwischen Gehirn und harter Hirnhaut */}
      <g stroke={alt ? F.kupferHell : F.creme} strokeWidth="4" strokeLinecap="round">
        {WINKEL.map((w) => {
          const c = Math.cos((w * Math.PI) / 180);
          const s = Math.sin((w * Math.PI) / 180);
          return <line key={w} x1={rx * c} y1={ry * s + unten} x2={dura.rx * c} y2={dura.ry * s} />;
        })}
      </g>
    </g>
  );
}

/** Jüngeres Gehirn füllt den Schädel, im Alter ist es kleiner und die Brückenvenen sind gespannt. */
export default function SubduralhaematomAlter() {
  return (
    <Zeichnung titel="Zwei Schädel im Querschnitt: links füllt ein jüngeres Gehirn den Schädel, die Brückenvenen sind kurz. Rechts ist das Gehirn im Alter kleiner, zwischen Gehirn und harter Hirnhaut ist mehr Platz und die Brückenvenen sind lang und gespannt">
      <Etikett x={184} y={110} anker="middle">
        Jüngeres Gehirn
      </Etikett>
      <Etikett x={536} y={110} anker="middle" farbe={F.kupferHell}>
        Im Alter
      </Etikett>

      <g transform="translate(184 320)">
        <Schaedel rx={124} ry={118} alt={false} />
      </g>
      <g transform="translate(536 320)">
        <Schaedel rx={96} ry={94} alt />
      </g>

      <Etikett x={184} y={530} anker="middle">
        Füllt den Schädel
      </Etikett>
      <Unterzeile x={184} y={562} anker="middle">
        Brückenvenen kurz
      </Unterzeile>

      <Etikett x={536} y={530} anker="middle" farbe={F.kupferHell}>
        Mehr Platz
      </Etikett>
      <Unterzeile x={536} y={562} anker="middle">
        Brückenvenen gespannt
      </Unterzeile>

      <Etikett x={360} y={650} anker="middle">
        Schon ein kleiner Sturz kann reichen
      </Etikett>
      <Unterzeile x={360} y={684} anker="middle">
        Eine Vene reißt, es blutet langsam
      </Unterzeile>
    </Zeichnung>
  );
}
