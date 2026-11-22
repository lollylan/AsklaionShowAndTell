import { Etikett, F, Fluss, KONTUR, Pfeil, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Blase mit Prostata und Harnröhre im Schnitt; cx ist die Mitte der Hälfte. */
function Blasenbild({ cx, gross }: { cx: number; gross: boolean }) {
  const harnroehre = gross
    ? `M${cx - 8} 330 L${cx - 3} 368 L${cx - 3} 432 L${cx - 8} 472 L${cx - 8} 560 L${cx + 8} 560 L${cx + 8} 472 L${cx + 3} 432 L${cx + 3} 368 L${cx + 8} 330 Z`
    : `M${cx - 8} 330 L${cx - 8} 560 L${cx + 8} 560 L${cx + 8} 330 Z`;
  return (
    <g>
      {/* Blase */}
      <path
        d={`M${cx - 20} 336 C${cx - 110} 330 ${cx - 125} 260 ${cx - 120} 210 C${cx - 112} 140 ${cx - 60} 112 ${cx} 112 C${cx + 60} 112 ${cx + 112} 140 ${cx + 120} 210 C${cx + 125} 260 ${cx + 110} 330 ${cx + 20} 336 Z`}
        {...KONTUR}
        fill={F.petrol}
      />

      {/* Prostata */}
      {gross ? (
        <ellipse cx={cx} cy={398} rx="90" ry="68" fill={F.kupfer} stroke={F.kupferHell} strokeWidth="4" />
      ) : (
        <ellipse cx={cx} cy={378} rx="48" ry="40" fill={F.petrolHell} stroke={F.linie} strokeWidth="4" />
      )}

      {/* Harnröhre */}
      <path d={harnroehre} fill={F.tief} stroke={F.linie} strokeWidth="3" strokeLinejoin="round" />

      {/* Harnstrahl */}
      {gross ? (
        <g fill={F.leise} className="prostatavergroesserung-tropfen">
          <circle cx={cx} cy={584} r="5" />
          <circle cx={cx + 2} cy={606} r="4" />
          <circle cx={cx + 5} cy={626} r="4" />
        </g>
      ) : (
        <Pfeil d={`M${cx} 576 L${cx} 636`} farbe={F.petrolHell} breite={8} />
      )}
      {/* Harn fließt: links kräftig und schnell, rechts dünn und zäh */}
      {gross ? (
        <Fluss d={`M${cx} 310 L${cx} 566`} farbe={F.petrolHell} breite={4} dauer={2.6} />
      ) : (
        <Fluss d={`M${cx} 310 L${cx} 640`} farbe={F.petrolHell} breite={8} dauer={0.7} />
      )}
    </g>
  );
}

/** Normale und vergrößerte Prostata nebeneinander. */
export default function Prostatavergroesserung() {
  return (
    <Zeichnung titel="Blase mit Prostata und Harnröhre im Schnitt, links normal mit kräftigem Harnstrahl, rechts mit vergrößerter Prostata, die die Harnröhre einengt, und nur noch tröpfelndem Strahl">
      <Blasenbild cx={190} gross={false} />
      <Blasenbild cx={530} gross />

      <Etikett x={190} y={70} anker="middle">
        Normal
      </Etikett>
      <Etikett x={530} y={70} anker="middle" farbe={F.kupferHell}>
        Vergrößert
      </Etikett>

      <Etikett x={190} y={236} anker="middle">
        Blase
      </Etikett>

      <Zeiger von={[306, 384]} nach={[232, 380]} />
      <Zeiger von={[414, 384]} nach={[452, 390]} />
      <Unterzeile x={360} y={392} anker="middle">
        Prostata
      </Unterzeile>

      <Zeiger von={[594, 494]} nach={[536, 420]} />
      <Unterzeile x={598} y={516}>
        Harnröhre
      </Unterzeile>
      <Unterzeile x={598} y={544}>
        eingeengt
      </Unterzeile>

      <Unterzeile x={190} y={686} anker="middle">
        kräftiger Strahl
      </Unterzeile>
      <Unterzeile x={530} y={686} anker="middle" farbe={F.kupferHell}>
        schwacher Strahl
      </Unterzeile>
    </Zeichnung>
  );
}
