import './merkblaetter.css';
import { FileText } from 'lucide-react';
import { merkblaetterFuer } from './merkblatt-links';

/** Links zu den RKI-Faktenblättern einer Impfung; leer, wenn es keins gibt. */
export function Merkblaetter({ id }: { id: string }) {
  const liste = merkblaetterFuer(id);
  if (liste.length === 0) return null;
  return (
    <span className="merkblaetter">
      <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
      <span>RKI-Faktenblatt:</span>
      {liste.map((m, i) => (
        <span key={m.url}>
          {i > 0 && '· '}
          <a href={m.url} target="_blank" rel="noopener noreferrer">
            {m.titel}
          </a>
        </span>
      ))}
    </span>
  );
}
