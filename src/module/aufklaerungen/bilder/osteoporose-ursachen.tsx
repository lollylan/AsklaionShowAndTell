import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** x-Achse: Alter 0–90 Jahre auf 100–660. */
const ax = (jahre: number) => 100 + jahre * 6.22;

const FRAUEN = 'M100 560 C170 420 220 230 287 220 L411 232 C440 240 450 290 473 330 C500 375 560 430 640 470';
const MAENNER = 'M100 560 C170 420 220 200 287 190 L411 200 C470 215 560 290 640 340';

/** Knochenmasse über das Leben: Höchststand um 30, bei Frauen nach den Wechseljahren rascher Verlust. */
export default function OsteoporoseUrsachen() {
  return (
    <Zeichnung titel="Kurve der Knochenmasse über das Leben: Sie steigt bis etwa 30 Jahre an und sinkt dann langsam; bei Frauen fällt sie nach den Wechseljahren schneller und erreicht im Alter den Bereich, in dem Knochen leicht brechen">
      <Etikett x={360} y={70} anker="middle">
        Knochenmasse im Lauf des Lebens
      </Etikett>

      {/* Bereich erhöhter Bruchgefahr */}
      <rect x="100" y="400" width="560" height="190" fill={F.kupfer} fillOpacity="0.16" />
      <line x1="100" y1="400" x2="660" y2="400" stroke={F.kupfer} strokeWidth="3" strokeDasharray="10 8" />
      <Etikett x={650} y={572} anker="end" farbe={F.kupferHell}>
        Bruchgefahr
      </Etikett>

      {/* Achsen */}
      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      {[20, 50, 80].map((j) => (
        <g key={j}>
          <line x1={ax(j)} y1="590" x2={ax(j)} y2="602" stroke={F.leise} strokeWidth="3" />
          <Unterzeile x={ax(j)} y={630} anker="middle">
            {`${j} Jahre`}
          </Unterzeile>
        </g>
      ))}

      {/* Wechseljahre */}
      <line x1={ax(50)} y1="160" x2={ax(50)} y2="590" stroke={F.leise} strokeWidth="2" strokeDasharray="4 8" />
      <Zeiger von={[500, 158]} nach={[452, 268]} />
      <Etikett x={470} y={146}>
        Wechseljahre
      </Etikett>

      <path d={MAENNER} fill="none" stroke={F.leise} strokeWidth="5" strokeDasharray="14 10" strokeLinecap="round" />
      <path d={FRAUEN} fill="none" stroke={F.linie} strokeWidth="7" strokeLinecap="round" />

      <Unterzeile x={656} y={372} anker="end">
        Männer
      </Unterzeile>
      <Etikett x={656} y={508} anker="end">
        Frauen
      </Etikett>
    </Zeichnung>
  );
}
