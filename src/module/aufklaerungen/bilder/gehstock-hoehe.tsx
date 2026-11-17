import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';
import { Gehstock, Silhouette } from './gehhilfen';

const BODEN = 600;
const HANDGELENK = 372;

/** Rumpf, vorderes Bein und Kopf einer stehenden Figur von der Seite (Blick nach rechts), Mitte x. */
function Stehend({ x }: { x: number }) {
  return (
    <>
      <Silhouette
        farbe={F.petrolDunkel}
        glieder={[
          { p: [[x - 8, 356], [x - 10, 468], [x - 12, 578]], b: 32 },
          { p: [[x - 12, 586], [x + 12, 590]], b: 18 },
        ]}
      />
      <Silhouette
        glieder={[
          { p: [[x + 4, 356], [x + 6, 468], [x + 4, 578]], b: 32 },
          { p: [[x + 2, 586], [x + 34, 590]], b: 18 },
          { p: [[x, 214], [x, 346]], b: 56 },
        ]}
        kreise={[{ x: x + 6, y: 161, r: 31 }]}
      />
    </>
  );
}

/** Links: Arme hängen, Griff auf Höhe des Handgelenks. Rechts: beim Aufstützen ist der Ellenbogen leicht gebeugt. */
export default function GehstockHoehe() {
  return (
    <Zeichnung titel="Richtige Höhe des Gehstocks: Bei locker hängenden Armen ist der Griff auf Höhe des Handgelenks, beim Aufstützen ist der Ellenbogen leicht gebeugt">
      <line x1="60" y1={BODEN + 2} x2="660" y2={BODEN + 2} stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Links: Arm hängt locker, Stock daneben */}
      <Stehend x={150} />
      <Silhouette glieder={[{ p: [[152, 222], [154, 304], [156, HANDGELENK], [158, 394]], b: 22 }]} />
      <Gehstock griff={[262, HANDGELENK]} spitze={[262, BODEN]} vor={34} />
      <line
        x1="176"
        y1={HANDGELENK}
        x2="240"
        y2={HANDGELENK}
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />

      {/* Rechts: aufgestützt */}
      <Stehend x={470} />
      <Gehstock griff={[516, HANDGELENK + 6]} spitze={[532, BODEN]} vor={34} />
      <Silhouette glieder={[{ p: [[472, 222], [464, 302], [512, 372], [520, 380]], b: 22 }]} />
      <path d="M446 316 Q452 336 474 330" fill="none" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" />

      <Unterzeile x={180} y={70} anker="middle">
        Arme hängen locker
      </Unterzeile>
      <Unterzeile x={520} y={70} anker="middle">
        beim Aufstützen
      </Unterzeile>

      <Etikett x={180} y={650} anker="middle">
        Griff auf Höhe
      </Etikett>
      <Etikett x={180} y={682} anker="middle">
        des Handgelenks
      </Etikett>
      <Etikett x={520} y={650} anker="middle">
        Ellenbogen
      </Etikett>
      <Etikett x={520} y={682} anker="middle">
        leicht gebeugt
      </Etikett>
    </Zeichnung>
  );
}
