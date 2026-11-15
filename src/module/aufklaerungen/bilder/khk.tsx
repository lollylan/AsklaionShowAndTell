import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Herz mit Herzkranzgefäßen, eine Engstelle vergrößert als Gefäßquerschnitt. */
export default function Khk() {
  return (
    <Zeichnung titel="Herz mit Herzkranzgefäßen auf der Oberfläche; eine Engstelle ist vergrößert als Querschnitt gezeigt, in dem eine Ablagerung das Gefäß fast verschließt">
      {/* Hauptschlagader, liegt hinter dem Herzen */}
      <path d="M255 240 C255 160 265 125 330 120" fill="none" stroke={F.linie} strokeWidth="44" />
      <path d="M255 240 C255 160 265 125 332 120" fill="none" stroke={F.petrolDunkel} strokeWidth="36" />

      {/* Herz */}
      <path
        d="M250 235 C225 175 150 165 105 205 C55 250 60 340 105 405 C150 470 230 510 290 550 C340 500 420 440 445 350 C465 275 430 195 365 185 C310 178 265 200 250 235 Z"
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Herzkranzgefäße */}
      <g fill="none" stroke={F.creme} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M245 240 C200 250 150 280 130 340 C120 380 140 420 170 445" />
        <path d="M262 240 C290 290 300 380 285 480" />
        <path d="M291 367 C320 375 345 398 355 430" />
        <path d="M275 240 C320 232 375 245 400 282" />
      </g>

      {/* Engstelle */}
      <line x1="284" y1="302" x2="289" y2="334" stroke={F.kupfer} strokeWidth="12" strokeLinecap="round" />
      <circle cx="287" cy="318" r="30" fill="none" stroke={F.kupferHell} strokeWidth="4" />
      <line x1="317" y1="320" x2="470" y2="330" stroke={F.kupferHell} strokeWidth="2" strokeLinecap="round" />

      {/* Vergrößerter Querschnitt */}
      <circle cx="570" cy="330" r="100" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      <circle cx="570" cy="330" r="82" fill={F.kupfer} stroke={F.linie} strokeWidth="4" />
      <circle cx="598" cy="356" r="32" fill={F.tief} stroke={F.linie} strokeWidth="4" />

      <Etikett x={570} y={178} anker="middle" farbe={F.kupferHell}>
        Engstelle
      </Etikett>
      <Unterzeile x={570} y={208} anker="middle">
        vergrößert
      </Unterzeile>

      <Zeiger von={[575, 458]} nach={[545, 395]} />
      <Etikett x={690} y={486} anker="end">
        Ablagerung
      </Etikett>
      <Unterzeile x={690} y={516} anker="end">
        engt das Gefäß ein
      </Unterzeile>

      <Zeiger von={[100, 572]} nach={[135, 398]} />
      <Etikett x={40} y={598}>
        Herzkranzgefäße
      </Etikett>
      <Unterzeile x={40} y={628}>
        versorgen den Herzmuskel
      </Unterzeile>

      <Etikett x={360} y={684} anker="middle">
        Der Herzmuskel bekommt zu wenig Sauerstoff
      </Etikett>
    </Zeichnung>
  );
}
