// Die Praxis-Erweiterung der Reiseimpfberatung – oder null in der öffentlichen Fassung.
//
// Der Ordner src/privat/ fehlt im Demo-Build (werkzeuge/gesperrt.txt): seine Dateien sind dann
// leere Module. Öffentlicher Code bindet ihn deshalb nur hier ein und fragt überall „PRIVAT?“.

import type { ReisePrivat } from './typen';

const dateien = import.meta.glob<{ default: ReisePrivat | null }>(
  '../../privat/reiseimpfung/index.ts',
  { eager: true },
);

export const PRIVAT: ReisePrivat | null = Object.values(dateien)[0]?.default ?? null;
