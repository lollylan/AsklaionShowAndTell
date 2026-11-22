import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Unterschenkel mit Fuß nach rechts; x = Mitte, dick = Schwellung am Knöchel. */
function bein(x: number, dick: number) {
  return `M${x - 46} 130 C${x - 58} 280 ${x - 34 - dick} 400 ${x - 28 - dick} 500 L${x - 30 - dick} 560 Q${x - 26} 596 ${x + 70} 596 Q${x + 82} 578 ${x + 48} 560 L${x + 26 + dick} 500 C${x + 30 + dick} 400 ${x + 52} 280 ${x + 42} 130`;
}

/** Geschlängelte Krampfader auf dem Unterschenkel. */
function Ader({ x }: { x: number }) {
  return (
    <path
      d={`M${x - 6} 150 q-16 30 0 60 t0 60 q-18 26 -4 56 t6 60 q-14 30 2 58`}
      fill="none"
      stroke={F.petrolHell}
      strokeWidth="8"
      strokeLinecap="round"
    />
  );
}

/** Verlauf über Jahre: Krampfadern, dann Schwellung und braune Haut, schließlich eine offene Wunde. */
export default function KrampfadernStadien() {
  return (
    <Zeichnung titel="Drei Unterschenkel nebeneinander als Verlauf über Jahre: zuerst nur geschlängelte Krampfadern, dann ein geschwollener Knöchel mit brauner, harter Haut, schließlich eine offene Wunde am Knöchel">
      <Etikett x={360} y={64} anker="middle">
        Unbehandelt über viele Jahre
      </Etikett>

      <path d={bein(130, 0)} {...KONTUR} fill={F.petrol} />
      <Ader x={130} />

      <path d={bein(360, 12)} {...KONTUR} fill={F.petrol} />
      <Ader x={360} />
      <ellipse cx="350" cy="510" rx="34" ry="44" fill={F.kupfer} fillOpacity="0.55" />

      <path d={bein(590, 14)} {...KONTUR} fill={F.petrol} />
      <Ader x={590} />
      <ellipse cx="580" cy="510" rx="38" ry="48" fill={F.kupfer} fillOpacity="0.55" />
      <ellipse cx="578" cy="512" rx="20" ry="16" fill={F.tief} stroke={F.kupferHell} strokeWidth="4" />

      <Etikett x={130} y={646} anker="middle">
        Krampfadern
      </Etikett>
      <Unterzeile x={130} y={678} anker="middle">
        schwere Beine
      </Unterzeile>
      <Etikett x={360} y={646} anker="middle">
        Braune Haut
      </Etikett>
      <Unterzeile x={360} y={678} anker="middle">
        geschwollen, hart
      </Unterzeile>
      <Etikett x={590} y={646} anker="middle" farbe={F.kupferHell}>
        Offenes Bein
      </Etikett>
      <Unterzeile x={590} y={678} anker="middle">
        heilt schlecht
      </Unterzeile>
    </Zeichnung>
  );
}
