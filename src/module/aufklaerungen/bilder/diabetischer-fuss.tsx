import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Unterschenkel und Fuß von der Innenseite, Ferse links, Zehen rechts. */
const FUSS =
  'M232 60 L234 330 C232 380 206 420 200 470 C196 520 215 562 262 565 L560 565 C612 565 642 548 642 520 C642 498 622 488 592 482 C522 470 462 442 402 402 C362 374 336 346 330 320 L328 60';

/** Fuß mit Nerv (hinten, zur Sohle hin unterbrochen) und Ader (vorn, zum Fuß hin verengt), Druckstelle am Ballen. */
export default function DiabetischerFuss() {
  return (
    <Zeichnung titel="Unterschenkel und Fuß von der Seite: Ein Nerv zieht zur Fußsohle und ist dort unterbrochen, eine Ader zum Fuß ist verengt, am Fußballen liegt eine Druckstelle, die nicht bemerkt wird">
      <path d={`${FUSS} Z`} fill={F.petrol} />

      {/* Nerv: oben gesund, zum Fuß hin geschädigt */}
      <path d="M254 62 L254 260" fill="none" stroke={F.creme} strokeWidth="6" />
      <path
        d="M254 260 L256 360 C258 450 300 520 380 535 L598 540"
        fill="none"
        stroke={F.kupfer}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="26 18"
      />

      {/* Ader: oben weit, zum Fuß hin eng */}
      <path d="M306 62 L306 300" fill="none" stroke={F.linie} strokeWidth="22" />
      <path d="M306 58 L306 300" fill="none" stroke={F.petrolHell} strokeWidth="14" />
      <path
        d="M306 300 L306 330 C310 390 360 440 420 465 L570 510"
        fill="none"
        stroke={F.linie}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M306 300 L306 330 C310 390 360 440 420 465 L570 510"
        fill="none"
        stroke={F.kupferHell}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path d={FUSS} {...KONTUR} />
      <path d="M232 60 L328 60" {...KONTUR} stroke={F.leise} strokeDasharray="10 10" />

      {/* Druckstelle am Ballen */}
      <ellipse cx="500" cy="558" rx="24" ry="11" fill={F.kupfer} stroke={F.linie} strokeWidth="3" />

      <Etikett x={40} y={300} farbe={F.kupferHell}>
        Nerven
      </Etikett>
      <Unterzeile x={40} y={332}>
        spüren weniger
      </Unterzeile>
      <Zeiger von={[136, 292]} nach={[255, 292]} />

      <Etikett x={470} y={250} farbe={F.kupferHell}>
        Adern
      </Etikett>
      <Unterzeile x={470} y={282}>
        weniger Blut
      </Unterzeile>
      <Zeiger von={[500, 300]} nach={[452, 476]} />

      <Zeiger von={[500, 616]} nach={[500, 570]} />
      <Etikett x={500} y={650} anker="middle">
        Druckstelle
      </Etikett>
      <Unterzeile x={500} y={682} anker="middle">
        wird nicht bemerkt
      </Unterzeile>
    </Zeichnung>
  );
}
