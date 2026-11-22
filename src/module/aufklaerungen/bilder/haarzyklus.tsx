import { Etikett, F, Folge, KONTUR, Pfeil, Unterzeile, Wachsen, Zeichnung } from './bausteine';

const HAUT = 236;

/** Haarbalg als offene Tasche von der Hautoberfläche bis zur Tiefe `bis`. */
function Balg({ x, bis }: { x: number; bis: number }) {
  return (
    <path
      d={`M${x - 15} ${HAUT} L${x - 15} ${bis - 8} Q${x} ${bis + 22} ${x + 15} ${bis - 8} L${x + 15} ${HAUT}`}
      {...KONTUR}
      stroke={F.leise}
      strokeWidth={3}
    />
  );
}

/** Balken: Anteil der wachsenden (Petrol) und der ruhenden Haare (Kupfer). */
function Anteil({ y, ruhend, klasse }: { y: number; ruhend: number; klasse?: string }) {
  const breite = 640;
  const grenze = breite * (1 - ruhend);
  return (
    <g>
      <rect x="40" y={y} width={breite} height="28" rx="14" fill={F.petrolHell} />
      <path
        d={`M${40 + grenze} ${y} L${40 + breite - 14} ${y} A14 14 0 0 1 ${40 + breite - 14} ${y + 28} L${40 + grenze} ${y + 28} Z`}
        fill={F.kupfer}
        className={klasse}
      />
    </g>
  );
}

/** Der Haarzyklus: wachsen, umbauen, ruhen – und was eine Belastung daran verschiebt. */
export default function Haarzyklus() {
  return (
    <Zeichnung titel="Der Haarzyklus in drei Schritten: Das Haar wächst mehrere Jahre, dann bildet sich die Wurzel zurück, das Haar ruht etwa drei Monate und fällt aus, während darunter ein neues nachwächst. Darunter zwei Balken: normal ruht etwa jedes zehnte Haar, nach einer Belastung ruhen viele gleichzeitig">
      <Etikett x={130} y={52} anker="middle">
        Wachsen
      </Etikett>
      <Unterzeile x={130} y={82} anker="middle">
        2 bis 6 Jahre
      </Unterzeile>
      <Etikett x={360} y={52} anker="middle">
        Umbau
      </Etikett>
      <Unterzeile x={360} y={82} anker="middle">
        2 bis 3 Wochen
      </Unterzeile>
      <Etikett x={590} y={52} anker="middle" farbe={F.kupferHell}>
        Ruhen
      </Etikett>
      <Unterzeile x={590} y={82} anker="middle">
        etwa 3 Monate
      </Unterzeile>

      {/* Haut im Schnitt */}
      <rect x="40" y={HAUT} width="640" height="180" fill={F.petrolDunkel} />
      <path d={`M40 ${HAUT} L680 ${HAUT}`} {...KONTUR} />

      {/* Wachsen: tiefe, aktive Wurzel */}
      <Balg x={130} bis={384} />
      <Wachsen d="M130 384 L130 112" farbe={F.petrolHell} breite={11} ab={0.4} dauer={1.6} />
      <circle cx="130" cy="384" r="17" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />

      {/* Umbau: Die Wurzel löst sich und wandert nach oben */}
      <Folge ab={2.2}>
      <Balg x={360} bis={384} />
      <path d={`M360 112 L360 326`} stroke={F.petrolHell} strokeWidth="11" strokeLinecap="round" />
      <circle className="haarzyklus-wurzel" cx="360" cy="330" r="12" fill={F.leise} stroke={F.linie} strokeWidth="3" />
      <path d="M360 348 L360 384" stroke={F.leise} strokeWidth="3" strokeDasharray="3 7" strokeLinecap="round" />
      </Folge>

      {/* Ruhen: Das alte Haar sitzt locker, darunter wächst das neue */}
      <Folge ab={4}>
      <Balg x={590} bis={384} />
      <path d={`M604 122 L590 288`} stroke={F.kupferHell} strokeWidth="11" strokeLinecap="round" />
      <circle cx="590" cy="292" r="10" fill={F.kupferHell} stroke={F.linie} strokeWidth="3" />
      <circle cx="590" cy="384" r="13" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      </Folge>
      <Wachsen d="M590 370 L590 342" farbe={F.petrolHell} breite={8} ab={4.6} dauer={1} />

      <Folge ab={1.8} von={0}>
        <Pfeil d="M190 160 L296 160" farbe={F.leise} />
      </Folge>
      <Folge ab={3.6} von={0}>
        <Pfeil d="M424 160 L530 160" farbe={F.leise} />
      </Folge>

      {/* Was sich nach einer Belastung verschiebt */}
      <Etikett x={40} y={480}>
        Normal: etwa jedes zehnte Haar ruht
      </Etikett>
      <Anteil y={494} ruhend={0.1} />
      <Etikett x={40} y={582} farbe={F.kupferHell}>
        Nach Belastung: viele ruhen zugleich
      </Etikett>
      <Anteil y={596} ruhend={0.42} klasse="haarzyklus-belastung" />
      <Unterzeile x={40} y={664}>
        Zwei bis vier Monate später fallen sie gemeinsam aus
      </Unterzeile>
    </Zeichnung>
  );
}
