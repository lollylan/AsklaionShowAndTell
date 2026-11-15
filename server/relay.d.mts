import type { Server } from 'node:http';

export const SYNC_PFAD: string;
export const STANDARD_RAUM: string;
export function normalisiereRaum(roh: unknown): string;
export function haengeRelayAn(httpServer: Server): unknown;
