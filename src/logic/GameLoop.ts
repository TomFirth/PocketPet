/**
 * GameLoop.ts
 *
 * Handles time-based decay and recovery of pet stats.
 */

import { PetStats } from './GameState';

export const DECAY_RATES = {
  hunger: 100 / (24 * 3600),   // 100 points in 24h (per second)
  thirst: 100 / (16 * 3600),   // 100 points in 16h (per second)
  happiness: 100 / (48 * 3600), // 100 points in 48h (per second)
  relationship: 100 / (72 * 3600), // 100 points in 72h (per second)
  energy: 100 / (12 * 3600),   // 100 points in 12h (per second)
};

export const RECOVERY_RATES = {
  energy: 100 / (4 * 3600),    // Full energy in 4h sleep (per second)
};

const SLEEP_DECAY_MULTIPLIER = 0.5;

/**
 * Calculates the decay/recovery of stats over a given elapsed time (in seconds).
 */
export function calculateDecay(currentStats: PetStats, elapsedSeconds: number): PetStats {
  const isSleeping = currentStats.isSleeping;
  const multiplier = isSleeping ? SLEEP_DECAY_MULTIPLIER : 1;

  let hunger = currentStats.hunger - (DECAY_RATES.hunger * elapsedSeconds * multiplier);
  let thirst = currentStats.thirst - (DECAY_RATES.thirst * elapsedSeconds * multiplier);
  let happiness = currentStats.happiness - (DECAY_RATES.happiness * elapsedSeconds * multiplier);
  let relationship = currentStats.relationship - (DECAY_RATES.relationship * elapsedSeconds * multiplier);

  let energy: number;
  let nextIsSleeping = isSleeping;

  if (isSleeping) {
    energy = currentStats.energy + (RECOVERY_RATES.energy * elapsedSeconds);
    if (energy >= 100) {
      energy = 100;
      nextIsSleeping = false;
    }
  } else {
    energy = currentStats.energy - (DECAY_RATES.energy * elapsedSeconds);
  }

  return {
    ...currentStats,
    hunger: Math.max(0, hunger),
    thirst: Math.max(0, thirst),
    happiness: Math.max(0, happiness),
    relationship: Math.max(0, relationship),
    energy: Math.max(0, Math.min(100, energy)),
    isSleeping: nextIsSleeping,
    lastUpdate: Date.now(),
  };
}

/**
 * Handles time elapsed since the last session (Offline Progress).
 */
export function calculateOfflineProgress(stats: PetStats): PetStats {
  const now = Date.now();
  const elapsedSeconds = Math.max(0, (now - stats.lastUpdate) / 1000);

  return calculateDecay(stats, elapsedSeconds);
}
