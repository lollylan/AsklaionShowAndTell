import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

// Dickdarm von vorn: aufsteigend links im Bild, quer oben, absteigend rechts, Enddarm unten.
const DARM = 'M90 520 L90 200 Q90 140 150 140 L280 140 Q330 140 330 200 L330 430 Q330 490 280 500 Q235 510 230 560 L230 640';
const SCHLAUCH = 'M230 700 L230 560 Q235 510 280 500 Q330 490 330 430 L330 250';

/** Dickdarm mit Polyp und vergrößerter Ausschnitt, in dem eine Schlinge den Polypen abträgt. */
export default function Darmkrebsvorsorge() {
  return (
    <Zeichnung titel="Dickdarm mit einem Schlauch mit Kamera, der vom Enddarm her eingeführt ist; ein kleiner Polyp an der Darmwand ist vergrößert gezeigt, eine Schlinge legt sich um seinen Stiel, um ihn zu entfernen">
      <defs>
        <clipPath id="darmkrebsvorsorge-lupe">
          <circle cx="535" cy="330" r="148" />
        </clipPath>
      </defs>

      {/* Dickdarm als Röhre mit Kontur */}
      <path d={DARM} fill="none" stroke={F.linie} strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <path d={DARM} fill="none" stroke={F.petrol} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />

      {/* Schlauch mit Kamera und kleiner Polyp an der Wand */}
      <path d={SCHLAUCH} fill="none" stroke={F.leise} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="330" cy="250" r="7" fill={F.leise} />
      <circle cx="346" cy="300" r="9" fill={F.kupfer} />

      {/* Verbindung zur Vergrößerung */}
      <path d="M352 293 L420 234 M352 307 L420 426" fill="none" stroke={F.leise} strokeWidth="2" strokeLinecap="round" />

      {/* Vergrößerter Ausschnitt */}
      <circle cx="535" cy="330" r="150" fill={F.tief} />
      <g clipPath="url(#darmkrebsvorsorge-lupe)">
        <path d="M380 410 Q460 395 535 410 Q610 425 690 410 L690 490 L380 490 Z" fill={F.petrol} />
        <path d="M380 410 Q460 395 535 410 Q610 425 690 410" fill="none" stroke={F.linie} strokeWidth="4" />
        <path d="M524 412 Q527 372 530 350 L540 350 Q543 372 546 412 Z" fill={F.kupfer} />
        <circle cx="535" cy="318" r="40" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
        <path d="M640 236 L559 372" fill="none" stroke={F.leise} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="535" cy="374" rx="24" ry="9" fill="none" stroke={F.linie} strokeWidth="4" />
      </g>
      <circle cx="535" cy="330" r="150" fill="none" stroke={F.linie} strokeWidth="4" />

      <Etikett x={210} y={96} anker="middle">
        Dickdarm
      </Etikett>

      <Etikett x={535} y={120} anker="middle" farbe={F.kupferHell}>
        Polyp
      </Etikett>
      <Unterzeile x={535} y={152} anker="middle">
        gutartige Wucherung
      </Unterzeile>

      <Etikett x={535} y={530} anker="middle">
        Schlinge entfernt ihn
      </Etikett>
      <Unterzeile x={535} y={562} anker="middle">
        schmerzlos, bei der Spiegelung
      </Unterzeile>

      <Unterzeile x={250} y={690}>
        Schlauch mit Kamera
      </Unterzeile>
    </Zeichnung>
  );
}
