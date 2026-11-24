import type { ReactNode } from "react";
import { Etikett, F, Folge, KONTUR, Unterzeile, Zeichnung } from "./bausteine";

const B = 310;
const H = 290;

/** Kachel mit Zeichen oben (Mitte bei 105) und Beschriftung darunter. */
function Kachel({
  x,
  y,
  ab,
  warnung = false,
  text,
  children,
}: {
  x: number;
  y: number;
  ab: number;
  warnung?: boolean;
  text: ReactNode;
  children: ReactNode;
}) {
  return (
    <Folge ab={ab}>
      <rect
        x={x}
        y={y}
        width={B}
        height={H}
        rx="22"
        fill={F.petrolDunkel}
        stroke={warnung ? F.kupfer : F.leise}
        strokeWidth={warnung ? 4 : 2}
      />
      <g transform={`translate(${x + B / 2} ${y + 105})`}>{children}</g>
      {text}
    </Folge>
  );
}

/** Vier Dinge, die bei ADHS selbst helfen – und was als Selbstbehandlung ungeeignet ist. */
export default function AdhsSelbst() {
  const mx = (x: number) => x + B / 2;
  return (
    <Zeichnung titel="Vier Kacheln: Listen und Wecker ordnen den Tag; Bewegung baut Unruhe ab; fester Schlaf mit gleichen Zeiten; kein Alkohol und keine Drogen, hervorgehoben, weil sie als Selbstbehandlung ungeeignet sind">
      {/* Listen und Wecker */}
      <Kachel
        x={40}
        y={50}
        ab={0.6}
        text={
          <>
            <Etikett x={mx(40)} y={50 + 210} anker="middle">
              Listen und Wecker
            </Etikett>
            <Unterzeile x={mx(40)} y={50 + 244} anker="middle">
              den Tag ordnen
            </Unterzeile>
          </>
        }
      >
        <rect
          x="-78"
          y="-52"
          width="72"
          height="96"
          rx="6"
          {...KONTUR}
          strokeWidth="3"
          fill={F.petrol}
        />
        {[-30, -4, 22].map((dy, i) => (
          <g key={dy}>
            <rect
              x="-68"
              y={dy - 8}
              width="14"
              height="14"
              rx="2"
              fill="none"
              stroke={F.linie}
              strokeWidth="2.5"
            />
            {i < 2 && (
              <path
                d={`M-66 ${dy} L-62 ${dy + 4} L-55 ${dy - 5}`}
                fill="none"
                stroke={F.linie}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <line
              x1="-46"
              y1={dy}
              x2="-16"
              y2={dy}
              stroke={F.leise}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ))}
        <circle cx="46" cy="4" r="38" {...KONTUR} fill={F.petrol} />
        <path
          d="M18 -36 L8 -26 M74 -36 L84 -26"
          fill="none"
          stroke={F.linie}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M46 4 L46 -18 M46 4 L62 14"
          fill="none"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M24 40 L18 50 M68 40 L74 50"
          fill="none"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </Kachel>

      {/* Bewegung: gehende Figur */}
      <Kachel
        x={370}
        y={50}
        ab={1.3}
        text={
          <>
            <Etikett x={mx(370)} y={50 + 210} anker="middle">
              Bewegung
            </Etikett>
            <Unterzeile x={mx(370)} y={50 + 244} anker="middle">
              baut Unruhe ab
            </Unterzeile>
          </>
        }
      >
        <circle cx="6" cy="-52" r="14" fill={F.linie} />
        <path
          d="M2 -34 L-6 6 M0 -24 L-24 -6 M0 -24 L24 -14 L36 -28 M-6 6 L-26 30 L-36 50 M-6 6 L14 26 L10 52"
          {...KONTUR}
          strokeWidth="7"
        />
        <path
          d="M-64 -30 L-44 -30 M-70 -10 L-46 -10 M-64 10 L-48 10"
          fill="none"
          stroke={F.petrolHell}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </Kachel>

      {/* fester Schlaf: Mond und Sterne */}
      <Kachel
        x={40}
        y={380}
        ab={2.0}
        text={
          <>
            <Etikett x={mx(40)} y={380 + 210} anker="middle">
              fester Schlaf
            </Etikett>
            <Unterzeile x={mx(40)} y={380 + 244} anker="middle">
              gleiche Zeiten
            </Unterzeile>
          </>
        }
      >
        <path
          d="M14 -52 A50 50 0 1 0 50 26 A40 40 0 1 1 14 -52 Z"
          fill={F.petrolHell}
          stroke={F.linie}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M-60 -40 l4 8 l8 4 l-8 4 l-4 8 l-4 -8 l-8 -4 l8 -4 Z"
          fill={F.linie}
        />
        <path
          d="M58 -48 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 Z"
          fill={F.linie}
        />
      </Kachel>

      {/* kein Alkohol, keine Drogen: Glas und Tablette, durchgestrichen */}
      <Kachel
        x={370}
        y={380}
        ab={2.7}
        warnung
        text={
          <>
            <Etikett
              x={mx(370)}
              y={380 + 206}
              anker="middle"
              farbe={F.kupferHell}
            >
              kein Alkohol,
            </Etikett>
            <Etikett
              x={mx(370)}
              y={380 + 236}
              anker="middle"
              farbe={F.kupferHell}
            >
              keine Drogen
            </Etikett>
            <Unterzeile x={mx(370)} y={380 + 268} anker="middle">
              keine Selbstbehandlung
            </Unterzeile>
          </>
        }
      >
        <path
          d="M-40 -42 L-8 -42 L-12 -8 Q-24 4 -36 -8 Z"
          {...KONTUR}
          strokeWidth="3"
          fill={F.petrol}
        />
        <path
          d="M-24 0 L-24 36 M-38 38 L-10 38"
          fill="none"
          stroke={F.linie}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g transform="translate(26 6) rotate(-35)">
          <rect
            x="-24"
            y="-11"
            width="48"
            height="22"
            rx="11"
            fill={F.petrol}
            stroke={F.linie}
            strokeWidth="3"
          />
          <line
            x1="0"
            y1="-11"
            x2="0"
            y2="11"
            stroke={F.linie}
            strokeWidth="3"
          />
        </g>
        <circle
          cx="0"
          cy="0"
          r="66"
          fill="none"
          stroke={F.kupfer}
          strokeWidth="7"
        />
        <line
          x1="-47"
          y1="47"
          x2="47"
          y2="-47"
          stroke={F.kupfer}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </Kachel>
    </Zeichnung>
  );
}
