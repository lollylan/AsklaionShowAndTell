import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Sonne mit Strahlen. */
function Sonne({ x, y }: { x: number; y: number }) {
  const strahlen = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);
  return (
    <g transform={`translate(${x} ${y})`}>
      {strahlen.map((w) => (
        <line
          key={w}
          x1={Math.cos(w) * 54}
          y1={Math.sin(w) * 54}
          x2={Math.cos(w) * 72}
          y2={Math.sin(w) * 72}
          stroke={F.kupferHell}
          strokeWidth="5"
          strokeLinecap="round"
        />
      ))}
      <circle r="40" fill={F.kupferHell} stroke={F.linie} strokeWidth="4" />
    </g>
  );
}

/** Mondsichel. */
function Mond({ x, y }: { x: number; y: number }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M14 -52 C-28 -46 -46 -6 -34 26 C-22 56 18 66 44 48 C6 46 -16 14 -10 -16 C-6 -34 2 -46 14 -52 Z"
      {...KONTUR}
      fill={F.leise}
    />
  );
}

/** Tagsüber abhusten, nachts bei Bedarf ein Hustenstiller – nie zusammen mit einem Schleimlöser. */
export default function BronchitisNacht() {
  return (
    <Zeichnung titel="Links eine Sonne: Tagsüber den Schleim abhusten, pflanzliche Mittel können lindern. Rechts ein Mond: Nachts kann ein Hustenstiller helfen, wenn der Husten den Schlaf raubt. Unten der Hinweis: Hustenstiller und Schleimlöser nicht zusammen nehmen, sonst bleibt der Schleim in der Lunge">
      <Etikett x={360} y={60} anker="middle">
        Hustenmittel richtig einsetzen
      </Etikett>
      <path d="M360 110 L360 440" stroke={F.leise} strokeWidth="2" strokeDasharray="6 10" />

      <Sonne x={185} y={210} />
      <Etikett x={185} y={340} anker="middle">
        Tagsüber
      </Etikett>
      <Unterzeile x={185} y={376} anker="middle" farbe={F.linie}>
        Schleim abhusten
      </Unterzeile>
      <Unterzeile x={185} y={410} anker="middle">
        Efeu, Thymian möglich
      </Unterzeile>

      <Mond x={540} y={210} />
      <Etikett x={540} y={340} anker="middle">
        Nachts
      </Etikett>
      <Unterzeile x={540} y={376} anker="middle" farbe={F.linie}>
        Hustenstiller
      </Unterzeile>
      <Unterzeile x={540} y={410} anker="middle">
        nur wenn er den Schlaf raubt
      </Unterzeile>

      <rect x="60" y="490" width="600" height="150" rx="20" fill="none" stroke={F.kupfer} strokeWidth="4" />
      <Etikett x={360} y={548} anker="middle" farbe={F.kupferHell}>
        Hustenstiller und Schleimlöser
      </Etikett>
      <Etikett x={360} y={582} anker="middle" farbe={F.kupferHell}>
        nie zusammen
      </Etikett>
      <Unterzeile x={360} y={618} anker="middle">
        Sonst bleibt der gelöste Schleim in der Lunge
      </Unterzeile>
    </Zeichnung>
  );
}
