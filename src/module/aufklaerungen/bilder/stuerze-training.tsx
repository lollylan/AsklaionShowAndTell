import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';
import { Rohre, Silhouette } from './gehhilfen';

const BODEN = 600;

/** Zwei Übungen: Aufstehen vom Stuhl ohne Hände (Kraft) und Stehen auf einem Bein mit Halt (Gleichgewicht). */
export default function StuerzeTraining() {
  return (
    <Zeichnung titel="Zwei Übungen von der Seite: links aufstehen vom Stuhl, ohne die Hände zu benutzen, für die Kraft. Rechts auf einem Bein stehen und sich an der Stuhllehne festhalten, für das Gleichgewicht">
      <Etikett x={180} y={92} anker="middle">
        Kraft
      </Etikett>
      <Unterzeile x={180} y={124} anker="middle">
        aufstehen ohne Hände
      </Unterzeile>
      <Etikett x={530} y={92} anker="middle">
        Gleichgewicht
      </Etikett>
      <Unterzeile x={530} y={124} anker="middle">
        auf einem Bein, mit Halt
      </Unterzeile>

      {/* Linker Stuhl, Lehne hinten */}
      <Rohre pfade={['M100 320 L100 600', 'M100 468 L210 468 L210 600']} b={10} farbe={F.petrolHell} />
      {/* Sitzende Figur, Arme vor der Brust verschränkt */}
      <Silhouette
        glieder={[
          { p: [[140, 446], [230, 446], [232, 586]], b: 38 },
          { p: [[232, 590], [262, 592]], b: 22 },
          { p: [[164, 282], [164, 300]], b: 26 },
        ]}
        flaechen={[{ d: 'M128 456 C120 400 130 330 150 304 L182 304 C196 330 190 400 176 456 Z' }]}
        kreise={[{ x: 168, y: 254, r: 30 }]}
      />
      <Silhouette glieder={[{ p: [[160, 320], [206, 356], [178, 378]], b: 22, farbe: F.petrolHell }]} />
      <Pfeil d="M290 400 L290 300" farbe={F.kupferHell} breite={6} />

      {/* Rechte Figur auf einem Bein, Hand auf der Lehne */}
      <Silhouette
        glieder={[
          { p: [[470, 450], [470, 586]], b: 38 },
          { p: [[470, 590], [500, 592]], b: 22 },
          { p: [[476, 450], [520, 490], [506, 540]], b: 36, farbe: F.kupfer },
          { p: [[468, 282], [468, 300]], b: 26 },
        ]}
        flaechen={[{ d: 'M448 460 C440 400 446 330 454 304 L488 304 C498 330 500 400 494 460 Z' }]}
        kreise={[{ x: 472, y: 254, r: 30 }]}
      />
      <Silhouette glieder={[{ p: [[472, 330], [524, 384], [570, 394]], b: 22, farbe: F.petrolHell }]} />
      {/* Rechter Stuhl, Lehne zur Figur */}
      <Rohre pfade={['M584 390 L584 600', 'M584 480 L670 480 L670 600']} b={10} farbe={F.petrolHell} />

      <line x1="40" y1={BODEN + 8} x2="680" y2={BODEN + 8} stroke={F.leise} strokeWidth="4" strokeLinecap="round" />
      <Unterzeile x={360} y={672} anker="middle">
        Jeden Tag ein paar Minuten, am besten angeleitet
      </Unterzeile>
    </Zeichnung>
  );
}
