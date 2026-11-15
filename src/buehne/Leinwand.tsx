import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

export const BUEHNE_BREITE = 1920;
export const BUEHNE_HOEHE = 1080;

/**
 * Feste 1920 × 1080-Fläche, die als Ganzes in den verfügbaren Platz skaliert
 * wird. Dadurch sieht die Bühne auf dem Patientenbildschirm und in der kleinen
 * Vorschau beim Arzt exakt gleich aus.
 */
export function Leinwand({ children }: { children: ReactNode }) {
  const rahmen = useRef<HTMLDivElement>(null);
  const [massstab, setMassstab] = useState(0);

  useLayoutEffect(() => {
    const element = rahmen.current;
    if (!element) return;
    const messe = () => {
      const { width, height } = element.getBoundingClientRect();
      setMassstab(Math.min(width / BUEHNE_BREITE, height / BUEHNE_HOEHE));
    };
    messe();
    const beobachter = new ResizeObserver(messe);
    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, []);

  return (
    <div ref={rahmen} className="leinwand">
      <div
        className="leinwand__flaeche"
        style={{
          transform: `translate(-50%, -50%) scale(${massstab})`,
          visibility: massstab ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
