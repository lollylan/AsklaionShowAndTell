import { Etikett, F, KONTUR, Unterzeile, Zeichnung, Zeiger } from './bausteine';

/** Fast leerer Akku in der Mitte, ringsum die häufigen Ursachen anhaltender Müdigkeit. */
export default function Muedigkeit() {
  return (
    <Zeichnung titel="Ein fast leerer Akku als Bild für Erschöpfung, ringsum fünf häufige Ursachen: Schlaf, Atemaussetzer im Schlaf, Schilddrüse, Eisenmangel und seelische Belastung">
      {/* Akku */}
      <rect x="236" y="290" width="232" height="124" rx="18" {...KONTUR} fill={F.tief} />
      <rect x="468" y="328" width="18" height="48" rx="6" fill={F.linie} />
      <rect x="252" y="306" width="40" height="92" rx="8" fill={F.kupfer} />
      <g stroke={F.petrolDunkel} strokeWidth="4" strokeLinecap="round">
        <path d="M312 314 L312 390 M360 314 L360 390 M408 314 L408 390" />
      </g>

      <Zeiger von={[190, 150]} nach={[270, 280]} />
      <Etikett x={40} y={112}>
        Zu wenig Schlaf
      </Etikett>
      <Unterzeile x={40} y={144}>
        zu kurz, zu unruhig
      </Unterzeile>

      <Zeiger von={[540, 150]} nach={[440, 280]} />
      <Etikett x={680} y={112} anker="end">
        Atemaussetzer
      </Etikett>
      <Unterzeile x={680} y={144} anker="end">
        Schnarchen, Schlafapnoe
      </Unterzeile>

      <Zeiger von={[150, 352]} nach={[226, 352]} />
      <Etikett x={40} y={344}>
        Schild-
      </Etikett>
      <Etikett x={40} y={376}>
        drüse
      </Etikett>

      <Zeiger von={[590, 352]} nach={[496, 352]} />
      <Etikett x={680} y={344} anker="end">
        Eisen-
      </Etikett>
      <Etikett x={680} y={376} anker="end">
        mangel
      </Etikett>

      <Zeiger von={[352, 520]} nach={[352, 426]} />
      <Etikett x={352} y={560} anker="middle">
        Seele und Belastung
      </Etikett>
      <Unterzeile x={352} y={592} anker="middle">
        Stress, Sorgen, Depression
      </Unterzeile>

      <Unterzeile x={360} y={668} anker="middle">
        Oft kommen mehrere Dinge zusammen
      </Unterzeile>
    </Zeichnung>
  );
}
