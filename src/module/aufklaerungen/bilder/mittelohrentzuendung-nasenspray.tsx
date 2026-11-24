import { Etikett, F, Fluss, Folge, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/* Kopf im Profil, Blick nach links, schematischer Schnitt. Alle Maße im Kopf-Rahmen (translate 0 30). */
const KOPF =
  'M320 580 L318 540 C290 520 250 505 205 495 C180 490 168 476 170 458 C164 448 160 440 162 432 ' +
  'L172 424 L160 414 C158 404 164 398 166 390 L150 382 C130 378 108 370 104 356 ' +
  'C124 330 154 300 172 270 C164 230 170 180 200 150 C250 100 340 90 410 110 ' +
  'C500 135 560 210 566 300 C570 370 540 430 490 470 L486 580 Z';
/** Nasenhöhle bis zum Nasenrachen, dann der Rachen nach unten. */
const NASE = 'M150 366 C200 346 290 336 330 356';
const RACHEN = 'M330 356 C352 372 350 470 350 560';
/** Ohrtrompete vom Nasenrachen schräg hinauf zum Mittelohr. */
const OHRTROMPETE = 'M334 360 C362 352 396 342 418 326';

const NEBEL_VORN: [number, number][] = [
  [158, 366], [174, 357], [178, 372], [194, 350], [198, 364], [214, 346], [216, 360], [232, 352], [234, 366],
];
const NEBEL_HINTEN: [number, number][] = [
  [254, 346], [270, 356], [288, 346], [304, 356], [318, 348],
];

/** Kortison-Nasenspray: Nebel zieht nach hinten, die Ohrtrompete schwillt ab, Luft erreicht das Mittelohr. */
export default function MittelohrentzuendungNasenspray() {
  return (
    <Zeichnung titel="Kopf im Profil, schematisch aufgeschnitten: Ein Kortison-Nasenspray steckt im Nasenloch, der Sprühnebel zieht nach hinten in die Nase bis zum Rachen. Die zuvor zugeschwollene Ohrtrompete zwischen Nasenrachen und Mittelohr schwillt ab und öffnet sich, so kommt wieder Luft ins Mittelohr. Hinweise: Kopf leicht nach vorn neigen, Düse nach außen richten">
      <g transform="translate(0 30)">
        <path d={KOPF} {...KONTUR} fill={F.petrolDunkel} />
        <path d={NASE} fill="none" stroke={F.tief} strokeWidth="34" strokeLinecap="round" />
        <path d={RACHEN} fill="none" stroke={F.tief} strokeWidth="28" strokeLinecap="round" />

        {/* Ohr: Ohrmuschel, Gehörgang, Trommelfell, Mittelohr */}
        <ellipse cx="502" cy="300" rx="24" ry="44" {...KONTUR} fill={F.petrol} />
        <path d="M478 300 L456 300" stroke={F.tief} strokeWidth="16" strokeLinecap="round" />
        <path d="M452 282 L452 318" {...KONTUR} strokeWidth="5" />
        <ellipse cx="428" cy="300" rx="20" ry="27" fill={F.tief} stroke={F.linie} strokeWidth="3" />
        <Folge ab={3.2} von={0} dauer={1.2}>
          <ellipse cx="428" cy="300" rx="20" ry="27" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
        </Folge>

        {/* Ohrtrompete: erst zugeschwollen, nach dem Spray offen */}
        <path d={OHRTROMPETE} fill="none" stroke={F.kupferHell} strokeWidth="22" strokeLinecap="round" />
        <path d={OHRTROMPETE} fill="none" stroke={F.tief} strokeWidth="3" strokeLinecap="round" />
        <Folge ab={2.4} von={0} dauer={1.2}>
          <path d={OHRTROMPETE} fill="none" stroke={F.petrolHell} strokeWidth="22" strokeLinecap="round" />
          <path d={OHRTROMPETE} fill="none" stroke={F.tief} strokeWidth="11" strokeLinecap="round" />
        </Folge>
        <Fluss d={OHRTROMPETE} farbe={F.creme} breite={7} dauer={1.2} ab={3.4} />

        {/* Sprühnebel: erst vorn in der Nase, dann hinten bis zum Nasenrachen */}
        <Folge ab={0.6} von={0}>
          <g fill={F.creme}>
            {NEBEL_VORN.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
            ))}
          </g>
        </Folge>
        <Folge ab={1.4} von={0}>
          <g fill={F.creme} opacity="0.7">
            {NEBEL_HINTEN.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
            ))}
          </g>
        </Folge>

        {/* Fläschchen, Düse im Nasenloch, leicht nach hinten gekippt */}
        <g transform="translate(136 372) rotate(15)">
          <path d="M-6 0 L-11 52 L11 52 L6 0 Z" {...KONTUR} fill={F.creme} />
          <rect x="-26" y="52" width="52" height="16" rx="5" {...KONTUR} fill={F.petrolHell} />
          <rect x="-32" y="68" width="64" height="118" rx="14" {...KONTUR} fill={F.creme} />
          <rect x="-20" y="98" width="40" height="52" rx="6" fill={F.petrolHell} />
        </g>

        {/* Kopf leicht nach vorn neigen */}
        <Pfeil d="M300 74 C236 70 184 94 150 134" farbe={F.leise} breite={4} />
      </g>

      <Etikett x={700} y={60} anker="end">
        Mittelohr wird belüftet
      </Etikett>
      <Zeiger von={[560, 74]} nach={[434, 320]} />
      <Etikett x={700} y={520} anker="end">
        Ohrtrompete
      </Etikett>
      <Etikett x={700} y={552} anker="end">
        schwillt ab
      </Etikett>
      <Zeiger von={[548, 498]} nach={[392, 374]} />

      <Etikett x={24} y={658}>
        Kortison-Nasenspray
      </Etikett>
      <Unterzeile x={24} y={690}>
        z. B. Mometason
      </Unterzeile>

      <Etikett x={20} y={60}>
        Kopf leicht
      </Etikett>
      <Etikett x={20} y={92}>
        nach vorn
      </Etikett>
      <Etikett x={700} y={690} anker="end">
        Düse nach außen richten
      </Etikett>
    </Zeichnung>
  );
}
