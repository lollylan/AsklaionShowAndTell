import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Der Weg von Vitamin B12: Essen, Magen, Darm, Blut und Nerven – mit den Stellen, an denen es hakt. */
export default function VitaminB12Mangel() {
  return (
    <Zeichnung titel="Der Weg von Vitamin B12 von oben nach unten: aus tierischen Lebensmitteln über den Magen und den Darm ins Blut und zu den Nerven; an jeder Station steht, was die Aufnahme stören kann">
      {/* Tierische Lebensmittel: Ei und Fisch */}
      <ellipse cx="96" cy="108" rx="30" ry="40" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <path d="M142 112 Q172 80 202 112 Q172 144 142 112 Z" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />
      <path d="M200 112 L222 94 L222 130 Z" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" strokeLinejoin="round" />

      <Pfeil d="M140 166 L140 214" farbe={F.leise} />

      {/* Magen */}
      <path
        d="M118 226 C118 254 104 268 104 296 C104 336 146 352 182 336 C212 322 208 292 186 288 C166 284 156 302 146 292 C136 282 142 254 142 226 Z"
        fill={F.petrol}
      />
      <path
        d="M118 226 C118 254 104 268 104 296 C104 336 146 352 182 336 C212 322 208 292 186 288 C166 284 156 302 146 292 C136 282 142 254 142 226"
        {...KONTUR}
      />

      <Pfeil d="M140 360 L140 404" farbe={F.leise} />

      {/* Darm als Schlauch */}
      <path
        d="M86 424 L178 424 Q194 424 194 440 Q194 456 178 456 L102 456 Q86 456 86 472 Q86 488 102 488 L190 488"
        fill="none"
        stroke={F.linie}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M86 424 L178 424 Q194 424 194 440 Q194 456 178 456 L102 456 Q86 456 86 472 Q86 488 102 488 L190 488"
        fill="none"
        stroke={F.petrol}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Pfeil d="M140 512 L140 562" farbe={F.leise} />

      {/* Blut und Nerven: Blutkörperchen und Nervenfaser */}
      <circle cx="92" cy="616" r="30" fill={F.creme} stroke={F.linie} strokeWidth="4" />
      <circle cx="92" cy="616" r="13" fill="none" stroke={F.leise} strokeWidth="4" />
      <rect x="138" y="602" width="36" height="28" rx="14" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <rect x="182" y="602" width="36" height="28" rx="14" fill={F.petrolHell} stroke={F.linie} strokeWidth="3" />
      <path d="M132 616 L224 616" {...KONTUR} stroke={F.creme} strokeWidth="5" />

      <Etikett x={260} y={104}>
        Tierische Lebensmittel
      </Etikett>
      <Unterzeile x={260} y={136} farbe={F.kupferHell}>
        vegan: fehlt es ohne Ergänzung
      </Unterzeile>

      <Etikett x={260} y={284}>
        Magen
      </Etikett>
      <Unterzeile x={260} y={316} farbe={F.kupferHell}>
        Alter, Magenschutz-Tabletten
      </Unterzeile>

      <Etikett x={260} y={452}>
        Darm
      </Etikett>
      <Unterzeile x={260} y={484} farbe={F.kupferHell}>
        Metformin, Darmkrankheiten
      </Unterzeile>

      <Etikett x={260} y={624}>
        Blut und Nerven
      </Etikett>
    </Zeichnung>
  );
}
