import { MARKE } from '../kern/marke';

// Das Blatt als PDF: Es wird so fotografiert, wie es am Bildschirm steht (Schriften, Logo,
// Zeichnungen), und auf A4-Seiten verteilt. Getrennt wird nur zwischen zwei Zeilen oder
// Absätzen, nie mitten durch Text. Die Bibliotheken kommen erst beim ersten Klick dazu.

const A4_BREITE = 210;
const A4_HOEHE = 297;
/** Rand oben und unten ab Seite 2, wie beim Drucken (@page in handzettel.css). */
const RAND = 14;

/** Unterkanten aller Blöcke, an denen eine Seite enden darf – in CSS-Pixeln ab Blattoberkante. */
function trennstellen(blatt: HTMLElement): number[] {
  const oben = blatt.getBoundingClientRect().top;
  const stellen = new Set<number>();
  blatt
    .querySelectorAll<HTMLElement>('header, h2, h3, h4, p, li, section, article, footer, figure')
    .forEach((el) => stellen.add(Math.ceil(el.getBoundingClientRect().bottom - oben)));
  return [...stellen].sort((a, b) => a - b);
}

export async function erzeugePdf(blatt: HTMLElement): Promise<Blob> {
  const [{ toCanvas }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')]);
  await document.fonts.ready;

  const breite = blatt.offsetWidth;
  const leinwand = await toCanvas(blatt, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    style: { boxShadow: 'none', minHeight: '0' },
  });
  const pxJeCss = leinwand.width / breite;
  const mmJeCss = A4_BREITE / breite;

  // Inhaltsende: Unterkante des letzten Blocks plus der Innenabstand des Blatts unten.
  const stellen = trennstellen(blatt);
  const unten = parseFloat(getComputedStyle(blatt).paddingBottom) || 0;
  const ende = Math.min(blatt.offsetHeight, (stellen.at(-1) ?? blatt.offsetHeight) + unten);

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  let start = 0;
  let seite = 0;
  while (start < ende - 1) {
    // Seite 1 bringt ihren Rand oben als Innenabstand des Blatts mit.
    const versatz = seite === 0 ? 0 : RAND;
    const platz = (A4_HOEHE - versatz - RAND) / mmJeCss;
    let schluss = ende;
    if (ende - start > platz) {
      const passend = stellen.filter((s) => s > start + 20 && s <= start + platz);
      schluss = passend.at(-1) ?? start + platz;
    }

    const streifen = document.createElement('canvas');
    streifen.width = leinwand.width;
    streifen.height = Math.round((schluss - start) * pxJeCss);
    const ctx = streifen.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, streifen.width, streifen.height);
    ctx.drawImage(leinwand, 0, -Math.round(start * pxJeCss));

    if (seite > 0) pdf.addPage();
    pdf.addImage(
      streifen.toDataURL('image/jpeg', 0.92),
      'JPEG',
      0,
      versatz,
      A4_BREITE,
      (schluss - start) * mmJeCss,
    );
    start = schluss;
    seite += 1;
  }

  pdf.setProperties({ title: MARKE.pdfTitel });
  return pdf.output('blob');
}

export function dateiname(): string {
  const d = new Date();
  const zwei = (n: number) => String(n).padStart(2, '0');
  return `Handzettel-${d.getFullYear()}-${zwei(d.getMonth() + 1)}-${zwei(d.getDate())}.pdf`;
}

export function speichere(pdf: Blob, name: string) {
  const adresse = URL.createObjectURL(pdf);
  const link = document.createElement('a');
  link.href = adresse;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(adresse), 10_000);
}

const BETREFF = MARKE.mailBetreff;
const TEXT = MARKE.mailText;

/**
 * Übergibt das PDF ans Mailprogramm. Mit dem Teilen-Fenster des Systems (Windows, macOS,
 * Tablets) kommt es als Anhang an. Sonst wird es gespeichert und das Mailprogramm mit Betreff
 * und Text geöffnet – anhängen muss man dann von Hand.
 * Rückgabe: 'geteilt', 'abgebrochen' oder 'von-hand'.
 */
export async function versende(pdf: Blob, name: string): Promise<'geteilt' | 'abgebrochen' | 'von-hand'> {
  const datei = new File([pdf], name, { type: 'application/pdf' });
  if (navigator.canShare?.({ files: [datei] })) {
    try {
      await navigator.share({ files: [datei], title: BETREFF, text: TEXT });
      return 'geteilt';
    } catch (fehler) {
      if (fehler instanceof DOMException && fehler.name === 'AbortError') return 'abgebrochen';
      // Andere Fehler: auf den Weg von Hand ausweichen.
    }
  }
  speichere(pdf, name);
  window.location.href = `mailto:?subject=${encodeURIComponent(BETREFF)}&body=${encodeURIComponent(TEXT)}`;
  return 'von-hand';
}
