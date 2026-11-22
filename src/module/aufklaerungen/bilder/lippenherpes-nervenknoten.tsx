import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Kopf im Profil, Blick nach links. */
const KOPF =
  'M470 570 L462 440 C496 410 512 360 512 290 C512 180 446 104 350 104 C270 104 222 160 218 230 ' +
  'L216 262 C210 276 196 300 186 332 C182 344 192 350 206 352 L208 366 C200 372 202 380 210 384 ' +
  'C202 390 204 398 214 404 C214 426 222 444 246 452 C270 458 300 460 320 470 L328 570';

/** Lippenherpes: Das Virus ruht im Nervenknoten und wandert bei Auslösern zur Lippe. */
export default function LippenherpesNervenknoten() {
  return (
    <Zeichnung titel="Kopf im Profil: Das Herpesvirus ruht lebenslang in einem Nervenknoten vor dem Ohr. Auslöser wie Fieber, Sonne oder Stress wecken es, dann wandert es am Nerv entlang zur Lippe und macht Bläschen">
      <path d={KOPF} {...KONTUR} fill={F.petrol} />
      {/* Ohr und Auge */}
      <ellipse cx="440" cy="300" rx="20" ry="36" {...KONTUR} fill={F.petrolHell} />
      <path d="M236 246 q14 -8 28 0" fill="none" stroke={F.linie} strokeWidth="4" strokeLinecap="round" />

      {/* Nerv vom Knoten zur Lippe */}
      <path d="M392 300 C350 290 300 270 258 252" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M392 300 C352 330 300 380 262 420" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
      <Pfeil d="M378 308 C340 324 290 348 244 366" farbe={F.kupferHell} breite={5} />

      {/* Nervenknoten mit ruhendem Virus */}
      <circle cx="396" cy="300" r="20" fill={F.petrolDunkel} stroke={F.linie} strokeWidth="4" />
      {[
        [389, 294],
        [402, 296],
        [395, 308],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill={F.kupfer} />
      ))}

      {/* Bläschen an der Lippe */}
      {[
        [222, 364],
        [232, 372],
        [222, 380],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={F.kupferHell} stroke={F.kupfer} strokeWidth="2" />
      ))}

      <Zeiger von={[512, 204]} nach={[410, 288]} />
      <Etikett x={518} y={210}>
        Nervenknoten
      </Etikett>
      <Unterzeile x={536} y={244}>
        Virus ruht hier
      </Unterzeile>
      <Unterzeile x={536} y={270}>
        lebenslang
      </Unterzeile>

      <Zeiger von={[110, 450]} nach={[214, 382]} />
      <Etikett x={40} y={480}>
        Bläschen
      </Etikett>

      <Etikett x={40} y={620} farbe={F.kupferHell}>
        Auslöser wecken das Virus:
      </Etikett>
      <Unterzeile x={40} y={654}>
        Fieber, Sonne, Stress, Erschöpfung, Regelblutung
      </Unterzeile>
    </Zeichnung>
  );
}
