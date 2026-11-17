import { Etikett, F, Unterzeile, Zeichnung, Zeiger } from './bausteine';

type P = [number, number];

/** Gliedmaße als Strecke mit runden Enden. */
interface Glied {
  von: P;
  nach: P;
  dicke: number;
}

/** Zeichnet Teile als eine Fläche mit gemeinsamer Kontur: erst alle Konturen, dann alle Füllungen. */
function Koerper({ glieder, flaechen, fuellung = F.petrol }: { glieder: Glied[]; flaechen: string[]; fuellung?: string }) {
  const linie = (g: Glied, farbe: string, dicke: number, k: number) => (
    <line key={k} x1={g.von[0]} y1={g.von[1]} x2={g.nach[0]} y2={g.nach[1]} stroke={farbe} strokeWidth={dicke} strokeLinecap="round" />
  );
  return (
    <g>
      {flaechen.map((d) => (
        <path key={`k${d}`} d={d} fill={F.linie} stroke={F.linie} strokeWidth="8" strokeLinejoin="round" />
      ))}
      {glieder.map((g, k) => linie(g, F.linie, g.dicke + 8, k))}
      {flaechen.map((d) => (
        <path key={`f${d}`} d={d} fill={fuellung} />
      ))}
      {glieder.map((g, k) => linie(g, fuellung, g.dicke, k))}
    </g>
  );
}

const ROHR = 'M224 270 C224 240 228 222 248 212 L290 210 C312 228 322 260 322 300 C322 360 328 420 318 462 L250 470 C232 470 224 460 224 444 Z';
const KOPF = 'M272 116 a44 44 0 1 1 -0.1 0 Z M312 148 L328 166 L312 172 Z';

const SCHULTER: P = [276, 256];
const ELLE: P = [304, 374];

export default function BlutdruckMessen() {
  // Manschette auf dem Oberarm, ein Stück unter der Schulter
  const t0 = 0.28;
  const t1 = 0.64;
  const auf = (t: number): P => [SCHULTER[0] + (ELLE[0] - SCHULTER[0]) * t, SCHULTER[1] + (ELLE[1] - SCHULTER[1]) * t];
  const [m0, m1] = [auf(t0), auf(t1)];
  return (
    <Zeichnung titel="Person sitzt seitlich an einem Tisch: Rücken an der Stuhllehne, Füße flach auf dem Boden, Unterarm liegt locker auf dem Tisch, die Manschette sitzt am Oberarm auf Herzhöhe und ist mit dem Messgerät auf dem Tisch verbunden">
      {/* Boden */}
      <line x1="40" y1="652" x2="680" y2="652" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />

      {/* Stuhl */}
      <g fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" strokeLinejoin="round">
        <rect x="194" y="236" width="22" height="244" rx="8" />
        <rect x="194" y="478" width="210" height="20" rx="8" />
        <rect x="198" y="498" width="14" height="152" />
        <rect x="384" y="498" width="14" height="152" />
      </g>

      {/* Tisch */}
      <g fill={F.petrolDunkel} stroke={F.leise} strokeWidth="3" strokeLinejoin="round">
        <rect x="470" y="414" width="14" height="236" />
        <rect x="668" y="414" width="14" height="236" />
        <rect x="350" y="396" width="350" height="20" rx="6" />
      </g>

      {/* Körper: Kopf, Hals, Rumpf, Oberschenkel, Unterschenkel, Fuß */}
      <Koerper
        flaechen={[ROHR, KOPF]}
        glieder={[
          { von: [266, 196], nach: [268, 222], dicke: 32 },
          { von: [262, 450], nach: [424, 452], dicke: 58 },
          { von: [428, 456], nach: [432, 612], dicke: 48 },
          { von: [420, 634], nach: [494, 636], dicke: 26 },
        ]}
      />

      {/* Arm mit Hand, liegt auf dem Tisch */}
      <Koerper
        flaechen={['M470 368 C486 364 500 370 500 378 C500 388 486 392 470 390 Z']}
        glieder={[
          { von: SCHULTER, nach: ELLE, dicke: 42 },
          { von: ELLE, nach: [470, 378], dicke: 34 },
        ]}
      />

      {/* Manschette */}
      <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke={F.linie} strokeWidth="64" />
      <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke={F.kupfer} strokeWidth="56" />

      {/* Schlauch zum Gerät */}
      <path d="M318 316 C380 330 400 286 460 290 C510 294 530 330 566 344" fill="none" stroke={F.leise} strokeWidth="4" strokeLinecap="round" />

      {/* Messgerät */}
      <rect x="560" y="298" width="124" height="98" rx="14" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      <rect x="572" y="310" width="100" height="46" rx="6" fill={F.tief} stroke={F.leise} strokeWidth="2" />
      <Etikett x={622} y={343} anker="middle" farbe={F.kupferHell}>
        128/82
      </Etikett>
      <circle cx="622" cy="376" r="9" fill={F.petrolHell} stroke={F.linie} strokeWidth="2" />

      {/* Beschriftungen */}
      <Etikett x={40} y={58}>
        5 Minuten Ruhe
      </Etikett>
      <Unterzeile x={40} y={88}>
        nicht sprechen
      </Unterzeile>

      <Zeiger von={[480, 132]} nach={[300, 318]} />
      <Etikett x={690} y={120} anker="end" farbe={F.kupferHell}>
        Manschette auf Herzhöhe
      </Etikett>

      <Zeiger von={[166, 338]} nach={[204, 338]} />
      <Etikett x={30} y={330}>
        Rücken
      </Etikett>
      <Etikett x={30} y={362}>
        angelehnt
      </Etikett>

      <Zeiger von={[520, 452]} nach={[440, 382]} />
      <Etikett x={502} y={478}>
        Arm liegt
      </Etikett>
      <Etikett x={502} y={510}>
        locker
      </Etikett>

      <Etikett x={360} y={698} anker="middle">
        Füße flach auf dem Boden
      </Etikett>
    </Zeichnung>
  );
}
