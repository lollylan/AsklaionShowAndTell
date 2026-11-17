import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';
import { BLOCK, Hautblock } from './wunden';

const SPALTEN = [146, 360, 574]; // Mitte je Grad

/** Haut im Schnitt mit drei Verbrennungsgraden nebeneinander: Rötung, Blase, tiefe Zerstörung. */
export default function WundenVerbrennung() {
  const { links, rechts, oben, unten, oberhaut, fett } = BLOCK;
  const [g1, g2, g3] = SPALTEN;
  const grenze1 = 253;
  const grenze2 = 467;
  return (
    <Zeichnung titel="Haut im Schnitt mit drei Verbrennungsgraden nebeneinander: Grad 1 ist nur oben gerötet, bei Grad 2 hebt sich die Oberhaut als Blase ab und die Lederhaut ist gerötet, bei Grad 3 sind Oberhaut und Lederhaut ganz zerstört, weiß und lederartig">
      {/* Blase bei Grad 2: Oberhaut hebt sich ab */}
      <path
        d={`M${g2 - 80} ${oben + 2} C${g2 - 70} ${oben - 60} ${g2 + 70} ${oben - 60} ${g2 + 80} ${oben + 2} Z`}
        fill={F.creme}
        fillOpacity="0.35"
      />
      <path
        d={`M${g2 - 80} ${oben + 2} C${g2 - 70} ${oben - 60} ${g2 + 70} ${oben - 60} ${g2 + 80} ${oben + 2}`}
        fill="none"
        stroke={F.petrolHell}
        strokeWidth="12"
        strokeLinecap="round"
      />

      <Hautblock id="wunden-verbrennung-haut">
        {/* Grad 1: nur die Oberhaut gerötet */}
        <rect x={links} y={oben} width={grenze1 - links} height={oberhaut - oben + 10} fill={F.kupferHell} />

        {/* Grad 2: Oberhaut fehlt unter der Blase, Lederhaut oben gerötet */}
        <path
          d={`M${grenze1} ${oben} L${grenze2} ${oben} L${grenze2} ${oberhaut + 50} C${g2 + 40} ${oberhaut + 80} ${g2 - 40} ${oberhaut + 80} ${grenze1} ${oberhaut + 50} Z`}
          fill={F.kupfer}
        />

        {/* Grad 3: bis ins Fett zerstört, weiß und lederartig */}
        <path
          d={`M${grenze2} ${oben} L${rechts} ${oben} L${rechts} ${fett + 20} C${g3 + 40} ${fett + 34} ${g3 - 40} ${fett + 34} ${grenze2} ${fett + 20} Z`}
          fill={F.creme}
          fillOpacity="0.85"
        />
        <path d={`M${grenze2} ${fett + 20} C${g3 - 40} ${fett + 34} ${g3 + 40} ${fett + 34} ${rechts} ${fett + 20}`} fill="none" stroke={F.kupfer} strokeWidth="8" />
        <g stroke={F.leise} strokeWidth="3" strokeLinecap="round">
          <line x1={g3 - 60} y1={oben + 40} x2={g3 - 30} y2={oben + 70} />
          <line x1={g3 + 10} y1={oben + 90} x2={g3 + 50} y2={oben + 110} />
          <line x1={g3 - 30} y1={oben + 130} x2={g3} y2={oben + 150} />
        </g>
      </Hautblock>

      {/* Trennlinien zwischen den Graden */}
      {[grenze1, grenze2].map((x) => (
        <line key={x} x1={x} y1={oben - 70} x2={x} y2={unten + 30} stroke={F.leise} strokeWidth="2" strokeDasharray="8 8" />
      ))}

      <Etikett x={g1} y={120} anker="middle" farbe={F.kupferHell}>
        Grad 1
      </Etikett>
      <Unterzeile x={g1} y={152} anker="middle">
        rot, schmerzt
      </Unterzeile>
      <Etikett x={g2} y={120} anker="middle" farbe={F.kupferHell}>
        Grad 2
      </Etikett>
      <Unterzeile x={g2} y={152} anker="middle">
        Blasen
      </Unterzeile>
      <Etikett x={g3} y={120} anker="middle" farbe={F.kupferHell}>
        Grad 3
      </Etikett>
      <Unterzeile x={g3} y={152} anker="middle">
        weiß, lederartig
      </Unterzeile>
    </Zeichnung>
  );
}
