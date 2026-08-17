/**
 * GameState.ts
 *
 * Handles the persistence and core values of the pet.
 */

export interface PetStats {
  hunger: number;      // 0 to 100 (20 is starving)
  thirst: number;      // 0 to 100 (20 is dehydrated)
  happiness: number;   // 0 to 100 (30 is sad)
  energy: number;      // 0 to 100 (0-20 is tired)
  relationship: number; // 0 to 100 (Multiplier for responsiveness)
  xp: number;          // Total experience points
  level: number;       // Current level (1-99)
  lastUpdate: number;  // timestamp

  // Interaction tracking
  hasEverHungry: boolean;
  hasEverThirsty: boolean;
  hasUsedFoodOrWater: boolean;
  lastToyTime: number;
  lastTreatTime: number;
  lastCleanTime: number;
}

export const INITIAL_STATS: PetStats = {
  hunger: 100,
  thirst: 100,
  happiness: 100,
  energy: 100,
  relationship: 50,
  xp: 0,
  level: 1,
  lastUpdate: Date.now(),

  hasEverHungry: false,
  hasEverThirsty: false,
  hasUsedFoodOrWater: false,
  lastToyTime: 0,
  lastTreatTime: 0,
  lastCleanTime: 0,
};
