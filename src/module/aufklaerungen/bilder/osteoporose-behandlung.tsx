import { Etikett, F, KONTUR, Unterzeile, Zeichnung } from './bausteine';

/** Breiter Pfeil nach oben (lang > 0) oder unten (lang < 0), Fuß bei (x, y). */
function Balken({ x, y, lang, farbe }: { x: number; y: number; lang: number; farbe: string }) {
  const r = Math.sign(lang);
  const spitze = y - lang;
  const hals = spitze + r * 44;
  return (
    <path
      d={`M${x - 28} ${y} L${x - 28} ${hals} L${x - 50} ${hals} L${x} ${spitze} L${x + 50} ${hals} L${x + 28} ${hals} L${x + 28} ${y} Z`}
      {...KONTUR}
      fill={farbe}
    />
  );
}

const MITTE = 340;

/** Knochenumbau: Ohne Behandlung überwiegt der Abbau, Medikamente bremsen ihn. */
export default function OsteoporoseBehandlung() {
  return (
    <Zeichnung titel="Zwei Paare von Pfeilen: links bei Osteoporose ein kurzer Pfeil Aufbau nach oben und ein langer Pfeil Abbau nach unten; rechts mit Medikament sind beide Pfeile gleich lang, der Abbau ist gebremst">
      <Etikett x={190} y={80} anker="middle" farbe={F.kupferHell}>
        Osteoporose
      </Etikett>
      <Unterzeile x={190} y={114} anker="middle">
        Abbau überwiegt
      </Unterzeile>
      <Etikett x={530} y={80} anker="middle">
        Mit Medikament
      </Etikett>
      <Unterzeile x={530} y={114} anker="middle">
        Abbau gebremst
      </Unterzeile>

      <line x1="60" y1={MITTE} x2="660" y2={MITTE} stroke={F.leise} strokeWidth="3" strokeDasharray="10 8" />
      <line x1="360" y1="150" x2="360" y2="600" stroke={F.leise} strokeWidth="2" strokeOpacity="0.5" />

      {/* links */}
      <Balken x={140} y={MITTE} lang={110} farbe={F.petrolHell} />
      <Balken x={240} y={MITTE} lang={-220} farbe={F.kupfer} />
      <Unterzeile x={140} y={204} anker="middle" farbe={F.linie}>
        Aufbau
      </Unterzeile>
      <Unterzeile x={240} y={594} anker="middle" farbe={F.linie}>
        Abbau
      </Unterzeile>

      {/* rechts */}
      <Balken x={480} y={MITTE} lang={110} farbe={F.petrolHell} />
      <Balken x={580} y={MITTE} lang={-110} farbe={F.kupfer} />
      <Unterzeile x={480} y={204} anker="middle" farbe={F.linie}>
        Aufbau
      </Unterzeile>
      <Unterzeile x={580} y={484} anker="middle" farbe={F.linie}>
        Abbau
      </Unterzeile>

      <Etikett x={530} y={600} anker="middle">
        Weniger Brüche
      </Etikett>
    </Zeichnung>
  );
}
