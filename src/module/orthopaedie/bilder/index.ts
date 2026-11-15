import type { ComponentType } from 'react';

// Jede Datei in diesem Ordner ist die Vergleichszeichnung (gesund / erkrankt) zum
// Krankheitsbild mit derselben id: gonarthrose.tsx gehört zu 'gonarthrose'.
const dateien = import.meta.glob<{ default: ComponentType }>('./*.tsx', { eager: true });

const nachId = new Map<string, ComponentType>();
for (const [pfad, datei] of Object.entries(dateien)) {
  const id = pfad.replace(/^\.\//, '').replace(/\.tsx$/, '');
  if (datei.default) nachId.set(id, datei.default);
}

export function findeZeichnung(id: string): ComponentType | undefined {
  return nachId.get(id);
}
