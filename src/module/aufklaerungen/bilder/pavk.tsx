import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Bein von der Seite mit Schlagader: Engstelle am Oberschenkel, darunter kommt zu wenig Blut an. */
export default function Pavk() {
  return (
    <Zeichnung titel="Bein mit Schlagader: eine Engstelle am Oberschenkel lässt nur wenig Blut durch, sodass die Wade beim Gehen zu wenig Blut bekommt">
      {/* Bein */}
      <path
        d="M120 40 C110 150 135 260 150 350 C120 420 145 530 175 600 C170 640 165 675 190 685 L330 685 C355 685 355 650 330 645 C290 640 250 625 240 600 C245 520 250 420 250 350 C265 260 290 150 290 40 Z"
        {...KONTUR}
        fill={F.petrolDunkel}
      />

      {/* Schlagader oberhalb der Engstelle: kräftiger Blutstrom */}
      <path d="M205 42 C205 120 200 170 200 215" fill="none" stroke={F.petrolHell} strokeWidth="16" />
      <Pfeil d="M168 70 L168 150" farbe={F.leise} breite={4} />

      {/* Unterhalb: nur noch wenig Blut */}
      <path
        d="M200 265 C200 320 198 400 200 460 C202 530 205 570 215 610 C225 640 260 655 300 662"
        fill="none"
        stroke={F.petrolHell}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="14 12"
      />

      {/* Engstelle */}
      <line x1="200" y1="215" x2="200" y2="265" stroke={F.kupfer} strokeWidth="16" />
      <line x1="200" y1="215" x2="200" y2="265" stroke={F.petrolHell} strokeWidth="4" />
      <circle cx="200" cy="240" r="34" fill="none" stroke={F.kupferHell} strokeWidth="4" />

      <Zeiger von={[350, 112]} nach={[205, 112]} />
      <Etikett x={360} y={120}>
        Schlagader
      </Etikett>
      <Unterzeile x={360} y={150}>
        bringt Blut ins Bein
      </Unterzeile>

      <Zeiger von={[350, 240]} nach={[238, 240]} />
      <Etikett x={360} y={248} farbe={F.kupferHell}>
        Engstelle
      </Etikett>
      <Unterzeile x={360} y={278}>
        durch Ablagerungen
      </Unterzeile>

      <Zeiger von={[350, 442]} nach={[200, 442]} />
      <Etikett x={360} y={450}>
        Zu wenig Blut
      </Etikett>
      <Unterzeile x={360} y={480}>
        Die Wade schmerzt beim Gehen
      </Unterzeile>

      <Etikett x={360} y={566}>
        Stehen bleiben hilft
      </Etikett>
      <Unterzeile x={360} y={596}>
        „Schaufensterkrankheit“
      </Unterzeile>
    </Zeichnung>
  );
}
