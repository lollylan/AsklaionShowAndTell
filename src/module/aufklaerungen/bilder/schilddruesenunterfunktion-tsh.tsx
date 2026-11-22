import { Etikett, F, KONTUR, Pfeil, Unterzeile, Zeichnung } from './bausteine';

/** Regelkreis: Die Hirnanhangdrüse treibt mit TSH die Schilddrüse an, das Hormon bremst zurück. */
export default function SchilddruesenunterfunktionTsh() {
  return (
    <Zeichnung titel="Regelkreis der Schilddrüse: Die Hirnanhangdrüse schickt TSH und treibt damit die Schilddrüse an. Das Schilddrüsenhormon bremst die Hirnanhangdrüse. Fehlt Hormon, steigt das TSH. Die Tablette ersetzt das fehlende Hormon">
      {/* Hirnanhangdrüse */}
      <circle cx="360" cy="140" r="44" {...KONTUR} fill={F.petrolHell} />
      <Etikett x={360} y={62} anker="middle">
        Hirnanhangdrüse
      </Etikett>

      {/* Schilddrüse */}
      <path
        d="M360 446 C344 424 336 380 314 380 C282 380 272 420 272 450 C272 500 290 520 316 520 C340 520 350 502 360 498 C370 502 380 520 404 520 C430 520 448 500 448 450 C448 420 438 380 406 380 C384 380 376 424 360 446 Z"
        {...KONTUR}
        fill={F.petrolHell}
      />
      <Etikett x={360} y={572} anker="middle">
        Schilddrüse
      </Etikett>

      {/* TSH treibt an */}
      <Pfeil d="M320 178 Q200 280 282 372" farbe={F.linie} breite={5} />
      <Etikett x={40} y={272}>
        TSH
      </Etikett>
      <Unterzeile x={40} y={300}>
        treibt an
      </Unterzeile>

      {/* Hormon bremst */}
      <Pfeil d="M438 372 Q520 280 400 178" farbe={F.petrolHell} breite={5} />
      <Etikett x={518} y={232}>
        Hormon
      </Etikett>
      <Unterzeile x={518} y={260}>
        bremst das TSH
      </Unterzeile>

      {/* Tablette ersetzt Hormon */}
      <g transform="translate(600 380) rotate(-30)">
        <rect x="-40" y="-18" width="80" height="36" rx="18" fill={F.kupfer} />
        <rect x="-40" y="-18" width="80" height="36" rx="18" {...KONTUR} strokeWidth={3} />
      </g>
      <Pfeil d="M560 350 L500 318" farbe={F.kupferHell} breite={4} />
      <Etikett x={600} y={450} anker="middle" farbe={F.kupferHell}>
        Tablette
      </Etikett>
      <Unterzeile x={600} y={478} anker="middle">
        ersetzt Hormon
      </Unterzeile>

      <Etikett x={40} y={640}>
        Fehlt Hormon, steigt das TSH
      </Etikett>
      <Unterzeile x={40} y={672}>
        Am TSH erkennen wir, ob die Dosis stimmt
      </Unterzeile>
    </Zeichnung>
  );
}
