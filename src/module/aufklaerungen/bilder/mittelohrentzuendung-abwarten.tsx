import { Etikett, F, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Ablauf: Schmerzmittel, ein bis zwei Tage abwarten, dann je nach Verlauf ein Antibiotikum. */
export default function MittelohrentzuendungAbwarten() {
  return (
    <Zeichnung titel="Ablauf der Behandlung: Zuerst ein Schmerzmittel, regelmäßig. Dann ein bis zwei Tage abwarten. Wird es besser, weiter so. Wird es nicht besser, kommt ein Antibiotikum dazu. Gleich ein Antibiotikum bekommen Säuglinge, Kinder unter zwei Jahren mit Entzündung beider Ohren und alle mit Ausfluss aus dem Ohr oder schwerem Verlauf">
      <Etikett x={250} y={70} anker="middle">
        1 Schmerzmittel
      </Etikett>
      <Unterzeile x={250} y={102} anker="middle">
        regelmäßig, auch zur Nacht
      </Unterzeile>
      <Pfeil d="M250 124 L250 176" farbe={F.leise} breite={4} />

      <Etikett x={250} y={216} anker="middle">
        2 Abwarten
      </Etikett>
      <Unterzeile x={250} y={248} anker="middle">
        ein bis zwei Tage
      </Unterzeile>
      <Pfeil d="M250 270 C250 310 130 310 120 350" farbe={F.leise} breite={4} />
      <Pfeil d="M250 270 C250 310 370 310 380 350" farbe={F.leise} breite={4} />

      <Etikett x={120} y={394} anker="middle">
        Besser
      </Etikett>
      <Unterzeile x={120} y={426} anker="middle">
        weiter so
      </Unterzeile>
      <Etikett x={380} y={394} anker="middle" farbe={F.kupferHell}>
        Nicht besser
      </Etikett>
      <Unterzeile x={380} y={426} anker="middle">
        Antibiotikum dazu
      </Unterzeile>

      {/* Ausnahmen: gleich ein Antibiotikum */}
      <path d="M500 50 L500 440" stroke={F.leise} strokeWidth="2" strokeDasharray="6 10" />
      <Etikett x={520} y={70}>
        Gleich ein
      </Etikett>
      <Etikett x={520} y={102}>
        Antibiotikum
      </Etikett>
      {['Säuglinge', 'unter 2 Jahren,', 'beide Ohren', 'Eiter läuft aus', 'schwerer Verlauf'].map((t, i) => (
        <Unterzeile key={t} x={520} y={152 + i * 36} farbe={F.linie}>
          {t}
        </Unterzeile>
      ))}

      <rect x="40" y="500" width="640" height="150" rx="20" fill={F.petrolDunkel} />
      <Etikett x={360} y={560} anker="middle">
        Bei den meisten wird es in
      </Etikett>
      <Etikett x={360} y={594} anker="middle">
        zwei bis drei Tagen besser
      </Etikett>
      <Unterzeile x={360} y={630} anker="middle">
        Ohrentropfen helfen dabei kaum
      </Unterzeile>
    </Zeichnung>
  );
}
