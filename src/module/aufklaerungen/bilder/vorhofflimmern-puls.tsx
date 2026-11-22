import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

const REGEL = [270, 330, 390, 450, 510, 570, 630];
const UNREGEL = [270, 304, 384, 412, 500, 538, 640];

/** Puls am Handgelenk fühlen und erkennen, ob er regelmäßig ist. */
export default function VorhofflimmernPuls() {
  return (
    <Zeichnung titel="Unterarm mit offener Handfläche nach oben, zwei Finger der anderen Hand liegen auf der Daumenseite des Handgelenks. Darunter zwei Reihen Pulsschläge: regelmäßig mit gleichen Abständen und unregelmäßig mit wechselnden Abständen">
      {/* Unterarm und Hand, Handfläche nach oben */}
      <rect x="40" y="150" width="450" height="100" rx="44" {...KONTUR} fill={F.petrol} />
      <rect x="532" y="88" width="30" height="80" rx="15" transform="rotate(38 547 128)" {...KONTUR} fill={F.petrol} />
      {[148, 174, 200, 226].map((y) => (
        <rect key={y} x="590" y={y} width="88" height="24" rx="12" {...KONTUR} fill={F.petrol} />
      ))}
      <path d="M470 142 C520 132 590 136 620 150 L620 250 C590 264 520 268 470 258 Z" {...KONTUR} fill={F.petrol} />

      {/* Schlagader an der Daumenseite */}
      <path d="M150 170 L480 166" stroke={F.kupferHell} strokeWidth="4" strokeDasharray="10 8" strokeLinecap="round" />

      {/* Zwei Finger der anderen Hand */}
      <rect x="372" y="20" width="34" height="160" rx="17" {...KONTUR} fill={F.petrolHell} />
      <rect x="414" y="26" width="34" height="156" rx="17" {...KONTUR} fill={F.petrolHell} />

      <Etikett x={40} y={312}>
        Zwei Finger auf die Daumenseite
      </Etikett>
      <Unterzeile x={40} y={344}>
        30 Sekunden zählen, mal zwei nehmen
      </Unterzeile>

      <line x1="40" y1="392" x2="680" y2="392" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />

      <Etikett x={40} y={470}>
        Regelmäßig
      </Etikett>
      {REGEL.map((x) => (
        <circle key={x} cx={x} cy={462} r="13" fill={F.petrolHell} />
      ))}

      <Etikett x={40} y={570} farbe={F.kupferHell}>
        Unregelmäßig
      </Etikett>
      {UNREGEL.map((x) => (
        <circle key={x} cx={x} cy={562} r="13" fill={F.kupfer} />
      ))}

      <Unterzeile x={360} y={660} anker="middle" farbe={F.linie}>
        Unregelmäßig? Dann bitte zum EKG zu uns kommen
      </Unterzeile>
    </Zeichnung>
  );
}
