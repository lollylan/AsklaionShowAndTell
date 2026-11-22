import { Etikett, F, Unterzeile, Zeichnung } from './bausteine';

const ERSTES_MAL = 'M100 560 C160 540 200 180 260 180 C330 180 380 420 660 520';
const MIT_UEBUNG = 'M100 560 C160 552 200 360 260 360 C330 360 380 490 660 548';

/** Angstkurve: Panik steigt, erreicht einen Gipfel und sinkt von selbst; mit Übung bleibt sie niedriger. */
export default function AngststoerungSelbst() {
  return (
    <Zeichnung titel="Kurve einer Panikattacke über einige Minuten: Die Angst steigt rasch an, erreicht einen Gipfel und sinkt dann von selbst wieder ab; eine zweite, gestrichelte Kurve zeigt, dass sie nach wiederholtem Üben weniger hoch steigt">
      <Etikett x={360} y={70} anker="middle">
        Angst geht von selbst vorbei
      </Etikett>

      <path d="M100 150 L100 590 L660 590" fill="none" stroke={F.leise} strokeWidth="3" strokeLinecap="round" />
      <Unterzeile x={116} y={160}>
        Angst
      </Unterzeile>
      <Unterzeile x={660} y={626} anker="end">
        Minuten
      </Unterzeile>

      <path d={MIT_UEBUNG} fill="none" stroke={F.petrolHell} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
      <path d={ERSTES_MAL} fill="none" stroke={F.kupfer} strokeWidth="7" strokeLinecap="round" />

      <Etikett x={660} y={300} anker="end">
        sinkt von selbst
      </Etikett>
      <Unterzeile x={660} y={332} anker="end">
        nach wenigen Minuten
      </Unterzeile>

      {/* Legende */}
      <line x1="100" y1="668" x2="140" y2="668" stroke={F.kupfer} strokeWidth="7" strokeLinecap="round" />
      <Etikett x={152} y={677} farbe={F.kupferHell}>
        Panikattacke
      </Etikett>
      <line x1="380" y1="668" x2="420" y2="668" stroke={F.petrolHell} strokeWidth="6" strokeDasharray="12 8" strokeLinecap="round" />
      <Etikett x={432} y={677}>
        nach Übung
      </Etikett>
    </Zeichnung>
  );
}
