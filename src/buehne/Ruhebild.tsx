import { Fragment, useEffect, useRef } from 'react';
import { LOGO, MARKE } from '../kern/marke';

/**
 * Sieben feine Linien, die wie ruhiger Atem durch das Bild ziehen. Jede setzt
 * sich aus drei Wellen mit unterschiedlichen Laufzeiten zusammen, dazu ändert
 * sich langsam, wie stark sie ausschlagen – so wiederholt sich das Bild nie
 * erkennbar, bleibt aber immer ruhig.
 */
const LINIEN = [
  { y: 372, staerke: 0.1, kupfer: false },
  { y: 428, staerke: 0.16, kupfer: false },
  { y: 486, staerke: 0.12, kupfer: false },
  { y: 540, staerke: 0.34, kupfer: true },
  { y: 598, staerke: 0.14, kupfer: false },
  { y: 652, staerke: 0.18, kupfer: false },
  { y: 706, staerke: 0.09, kupfer: false },
];

const SCHRITT = 48;

function wellenpfad(nr: number, t: number): string {
  const { y } = LINIEN[nr];
  // Ausschlag atmet über Minuten; jede Linie in ihrem eigenen Takt.
  const ausschlag = 0.55 + 0.45 * Math.sin(t * 0.021 + nr * 1.7);
  let d = '';
  for (let x = -SCHRITT; x <= 1920 + SCHRITT; x += SCHRITT) {
    const hoehe =
      y +
      ausschlag * 46 * Math.sin(x * 0.0021 + t * 0.085 + nr * 0.9) +
      24 * Math.sin(x * 0.0047 - t * 0.052 + nr * 2.3) +
      ausschlag * 12 * Math.sin(x * 0.0093 + t * 0.118 + nr * 4.1);
    d += `${x === -SCHRITT ? 'M' : 'L'}${x} ${hoehe.toFixed(1)}`;
  }
  return d;
}

function Wellen() {
  const pfade = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const zeichne = (t: number) =>
      pfade.current.forEach((pfad, nr) => pfad?.setAttribute('d', wellenpfad(nr, t)));

    // Wer im System Bewegung abgeschaltet hat, bekommt ein stehendes Bild.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let bild = 0;
    let zuletzt = 0;
    const lauf = (jetzt: number) => {
      bild = requestAnimationFrame(lauf);
      // 30 Bilder je Sekunde genügen für diese langsame Bewegung.
      if (jetzt - zuletzt < 32) return;
      zuletzt = jetzt;
      zeichne(jetzt / 1000);
    };
    bild = requestAnimationFrame(lauf);
    return () => cancelAnimationFrame(bild);
  }, []);

  return (
    <svg className="ruhebild__wellen" viewBox="0 0 1920 1080" aria-hidden="true">
      {LINIEN.map((linie, nr) => (
        <path
          key={linie.y}
          ref={(e) => {
            pfade.current[nr] = e;
          }}
          d={wellenpfad(nr, 0)}
          className={linie.kupfer ? 'ruhebild__welle ruhebild__welle--kupfer' : 'ruhebild__welle'}
          style={{ opacity: linie.staerke }}
        />
      ))}
    </svg>
  );
}

/** Was der Patient sieht, solange nichts gezeigt wird. */
export function Ruhebild() {
  return (
    <div className="ruhebild">
      <div className="ruhebild__licht" aria-hidden="true">
        <span className="ruhebild__schein ruhebild__schein--a" />
        <span className="ruhebild__schein ruhebild__schein--b" />
        <span className="ruhebild__schein ruhebild__schein--c" />
      </div>
      <Wellen />
      <svg className="ruhebild__kreise" viewBox="0 0 1920 1080" aria-hidden="true">
        <circle className="ruhebild__kreis ruhebild__kreis--a" cx="960" cy="540" r="470" />
        <circle className="ruhebild__kreis ruhebild__kreis--b" cx="960" cy="540" r="640" />
        <circle className="ruhebild__kreis ruhebild__kreis--c" cx="960" cy="540" r="840" />
      </svg>
      <div className="ruhebild__mitte">
        <div className="ruhebild__logo">
          <img src={LOGO} alt="" />
        </div>
        <p className="ruhebild__name">{MARKE.name}</p>
        <p className="ruhebild__fach">{MARKE.ruhezeile ?? MARKE.zusatz}</p>
        {MARKE.weitere.length > 0 && (
          <p className="ruhebild__weitere">
            {MARKE.weitere.map((eintrag, i) => (
              <Fragment key={eintrag}>
                {i > 0 && (
                  <>
                    {' '}
                    <span aria-hidden="true">·</span>{' '}
                  </>
                )}
                {eintrag}
              </Fragment>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
