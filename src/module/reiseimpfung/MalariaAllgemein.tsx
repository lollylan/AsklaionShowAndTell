// Malaria allgemein erklärt – die Bühnenseite der öffentlichen Fassung.
// Bewusst ohne Länder, Gebiete und Medikamentennamen: Die Seite klärt auf, die Entscheidung
// über eine Prophylaxe fällt in der Beratung.

const PUNKTE: Array<{ titel: string; text: string }> = [
  {
    titel: 'Wie man sich ansteckt',
    text: 'Bestimmte Mücken übertragen Malaria mit ihrem Stich – vor allem zwischen Abenddämmerung und Morgen.',
  },
  {
    titel: 'Mückenschutz',
    text: 'Lange, helle Kleidung, Mückenmittel auf die freie Haut und nachts ein Moskitonetz. Das ist der wichtigste Schutz in jedem Malariagebiet.',
  },
  {
    titel: 'Tabletten',
    text: 'Für manche Gebiete gibt es Tabletten zur Vorbeugung: vor, während und nach der Reise. Für andere genügt ein Notfallmedikament im Gepäck. Was zu Ihrer Reise passt, besprechen wir.',
  },
  {
    titel: 'Fieber nach der Reise',
    text: 'Fieber unterwegs oder bis Monate danach: sofort ärztlich abklären lassen und die Reise erwähnen.',
  },
];

export function MalariaAllgemein() {
  return (
    <article className="malariaallgemein">
      <header>
        <h2>Malaria</h2>
        <p>
          Eine Infektion, die mit Fieber beginnt und unbehandelt gefährlich werden kann. Früh
          erkannt ist sie gut behandelbar.
        </p>
      </header>
      <dl>
        {PUNKTE.map((punkt, i) => (
          <div key={punkt.titel} style={{ animationDelay: `${220 + i * 90}ms` }}>
            <dt>{punkt.titel}</dt>
            <dd>{punkt.text}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
