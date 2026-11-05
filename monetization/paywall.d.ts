/**
 * paywall.d.ts — Type declarations for the canonical paywall.js module.
 */

export interface PaywallInitOptions {
  extName?: string;
  extKey?: string;
  price?: number;
  priceNote?: string;
  reframe?: string;
  guaranteeDays?: number;
  trialDays?: number;
  freeFeatures?: string[];
  proFeatures?: string[];
  onEvent?: (name: string, detail: Record<string, unknown>) => void;
}

export interface ZovoPaywall {
  init(opts?: PaywallInitOptions): void;
  open(context?: Record<string, unknown>): Promise<void>;
  close(): void;
}

export const ZovoPaywall: ZovoPaywall;
