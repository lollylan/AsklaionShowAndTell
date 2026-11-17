import { Etikett, F, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';
import { Gehstock, Silhouette } from './gehhilfen';

/** Rumpf von vorn, Mitte bei x = 360. */
const RUMPF =
  'M330 160 C306 164 292 174 290 196 L298 300 C302 330 308 350 310 378 L410 378 ' +
  'C412 350 418 330 422 300 L430 196 C428 174 414 164 390 160 Z';

/** Figur von vorn: krankes rechtes Bein (im Bild links) in Kupfer, Stock in der linken Hand (gesunde Seite). */
export default function GehstockSeite() {
  return (
    <Zeichnung titel="Figur von vorn: Das kranke Bein ist hervorgehoben, der Stock ist in der Hand der gesunden Seite. Stock und krankes Bein gehen gleichzeitig nach vorn">
      <Gehstock griff={[470, 356]} spitze={[494, 596]} vor={14} />
      <Silhouette
        glieder={[
          { p: [[336, 370], [330, 476], [324, 578]], b: 40, farbe: F.kupfer },
          { p: [[324, 584], [324, 596]], b: 36, farbe: F.kupfer },
          { p: [[386, 370], [390, 468], [392, 554]], b: 40 },
          { p: [[392, 560], [392, 570]], b: 34 },
          { p: [[296, 190], [278, 286], [270, 376]], b: 26 },
          { p: [[424, 190], [454, 278], [470, 350]], b: 26 },
          { p: [[360, 136], [360, 168]], b: 30 },
        ]}
        flaechen={[{ d: RUMPF }]}
        kreise={[{ x: 360, y: 104, r: 36 }]}
      />

      {/* Gleichzeitig nach vorn */}
      <line x1="352" y1="612" x2="478" y2="612" stroke={F.kupferHell} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
      <Pfeil d="M324 624 L324 650" farbe={F.kupferHell} />
      <Pfeil d="M494 616 L494 650" farbe={F.kupferHell} />

      <Zeiger von={[214, 470]} nach={[324, 476]} />
      <Etikett x={30} y={478}>
        Krankes Bein
      </Etikett>

      <Zeiger von={[590, 254]} nach={[482, 460]} />
      <Etikett x={700} y={206} anker="end">
        Stock auf der
      </Etikett>
      <Etikett x={700} y={238} anker="end">
        gesunden Seite
      </Etikett>

      <Unterzeile x={360} y={692} anker="middle">
        Stock und krankes Bein gleichzeitig vor
      </Unterzeile>
    </Zeichnung>
  );
}
