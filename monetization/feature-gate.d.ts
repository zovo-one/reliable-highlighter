/**
 * feature-gate.d.ts — Type declarations for the canonical feature-gate.js module.
 * Allows TypeScript files to import from './feature-gate.js' with full type safety.
 */

export type Tier = 'free' | 'trial' | 'pro';

export interface VerifyResult {
  ok: boolean;
  tier: Tier;
  reason?: string;
  trialEndsAt?: number | null;
}

export interface GateOptions {
  pro?: () => unknown | Promise<unknown>;
  free?: () => unknown | Promise<unknown>;
  onLocked?: () => void;
}

export interface LicenseCache {
  key: string;
  tier: Tier;
  verifiedAt: number;
  trialEndsAt?: number | null;
}

export function setEventSink(fn: (name: string, detail: Record<string, unknown>) => void): void;
export function emit(name: string, detail?: Record<string, unknown>): void;
export function clearLicense(): Promise<void>;
export function verifyLicenseKey(licenseKey: string, extKey: string): Promise<VerifyResult>;
export function startTrial(extKey: string, days?: number): Promise<VerifyResult>;
export function getTier(extKey: string): Promise<Tier>;
export function isPro(extKey: string): Promise<boolean>;
export function trialDaysLeft(): Promise<number>;
export function registerLicenseAlarm(extKey: string): void;
export function gate(extKey: string, opts: GateOptions): Promise<unknown>;

export const LICENSE_ALARM: string;
export const _internals: {
  VERIFY_TTL: number;
  GRACE_MS: number;
  TRIAL_PREFIX: string;
  isValidLicenseResponse: (o: unknown) => boolean;
  isValidCache: (c: unknown) => c is LicenseCache;
};
