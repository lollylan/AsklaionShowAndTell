import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Harnleiter als Röhre: helle Kontur, darin der Urin. */
function Harnleiter({ d, breite }: { d: string; breite: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={F.linie} strokeWidth={breite + 8} />
      <path d={d} stroke={F.petrolHell} strokeWidth={breite} />
    </g>
  );
}

/** Niere, Harnleiter mit eingeklemmtem Stein und Blase; oberhalb des Steins staut sich der Urin. */
export default function Nierensteine() {
  return (
    <Zeichnung titel="Niere, Harnleiter und Blase von vorn: Ein Stein klemmt im Harnleiter, darüber ist der Harnleiter vom gestauten Urin erweitert; der Schmerz sitzt in der Flanke und zieht bis in die Leiste">
      {/* Harnleiter: oberhalb des Steins gestaut und weit, darunter schmal */}
      <Harnleiter d="M292 232 C340 260 360 330 368 404" breite={24} />
      <Harnleiter d="M374 436 C384 490 400 520 424 540" breite={10} />

      {/* Niere, Einbuchtung nach rechts zum Harnleiter */}
      <g transform="translate(250 220)">
        <path
          d="M20 -100 C-40 -125 -85 -70 -80 0 C-75 75 -30 120 25 100 C60 88 62 55 45 30 C32 12 32 -12 45 -30 C62 -55 58 -85 20 -100 Z"
          {...KONTUR}
          fill={F.petrol}
        />
        {/* Gestautes Nierenbecken */}
        <path
          d="M48 -34 C10 -46 -28 -24 -28 0 C-28 24 10 46 48 34 Z"
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Stein */}
      <path
        d="M354 404 L374 398 L390 410 L392 428 L378 442 L360 438 L350 422 Z"
        fill={F.kupfer}
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Blase */}
      <ellipse cx="440" cy="600" rx="120" ry="72" {...KONTUR} fill={F.petrol} />

      {/* Schmerz in der Flanke */}
      <g stroke={F.kupferHell} strokeWidth="5" strokeLinecap="round">
        <path d="M150 160 L110 140" />
        <path d="M144 214 L100 214" />
        <path d="M150 268 L110 288" />
      </g>

      <Zeiger von={[110, 92]} nach={[210, 140]} />
      <Etikett x={40} y={86}>
        Niere
      </Etikett>

      <Zeiger von={[412, 292]} nach={[346, 300]} />
      <Etikett x={420} y={300}>
        Harnleiter
      </Etikett>

      <Zeiger von={[422, 424]} nach={[392, 420]} />
      <Etikett x={430} y={432} farbe={F.kupferHell}>
        Stein klemmt
      </Etikett>
      <Unterzeile x={430} y={464}>
        Urin staut sich
      </Unterzeile>

      <Etikett x={440} y={610} anker="middle">
        Blase
      </Etikett>

      <Unterzeile x={40} y={396}>
        Schmerz in der Flanke,
      </Unterzeile>
      <Unterzeile x={40} y={428}>
        zieht bis in die Leiste
      </Unterzeile>
    </Zeichnung>
  );
}
