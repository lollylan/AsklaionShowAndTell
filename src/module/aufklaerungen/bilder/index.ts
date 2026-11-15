import type { ComponentType } from 'react';

// Jede Datei in diesem Ordner (außer bausteine.tsx) ist die Zeichnung zur
// Krankheit mit derselben id: asthma.tsx gehört zu 'asthma'.
const dateien = import.meta.glob<{ default: ComponentType }>(['./*.tsx', '!./bausteine.tsx'], {
  eager: true,
});

const nachId = new Map<string, ComponentType>();
for (const [pfad, datei] of Object.entries(dateien)) {
  const id = pfad.replace(/^\.\//, '').replace(/\.tsx$/, '');
  if (datei.default) nachId.set(id, datei.default);
}

export function findeZeichnung(id: string): ComponentType | undefined {
  return nachId.get(id);
}
