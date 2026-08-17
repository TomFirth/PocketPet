import { calculateDecay, DECAY_RATES } from '../GameLoop';
import { PetStats } from '../GameState';

const mockStats: PetStats = {
  hunger: 100,
  thirst: 100,
  happiness: 100,
  energy: 100,
  relationship: 100,
  xp: 0,
  level: 1,
  lastUpdate: Date.now() - 3600000, // 1 hour ago
  hasEverHungry: false,
  hasEverThirsty: false,
  hasUsedFoodOrWater: false,
  lastToyTime: 0,
  lastTreatTime: 0,
  lastCleanTime: 0,
  isSleeping: false,
};

describe('GameLoop', () => {
  it('should calculate decay correctly over 1 hour when awake', () => {
    const elapsedSeconds = 3600;
    const result = calculateDecay(mockStats, elapsedSeconds);

    expect(result.hunger).toBeCloseTo(100 - DECAY_RATES.hunger * 3600);
    expect(result.thirst).toBeCloseTo(100 - DECAY_RATES.thirst * 3600);
    expect(result.energy).toBeCloseTo(100 - DECAY_RATES.energy * 3600);
  });

  it('should recover energy and slow decay when sleeping', () => {
    const sleepingStats = { ...mockStats, energy: 50, isSleeping: true };
    const elapsedSeconds = 3600;
    const result = calculateDecay(sleepingStats, elapsedSeconds);

    // Energy recovers: 50 + (100/4h * 1h) = 75
    expect(result.energy).toBeCloseTo(75);
    // Hunger decays at 50% rate
    expect(result.hunger).toBeCloseTo(100 - (DECAY_RATES.hunger * 3600 * 0.5));
    expect(result.isSleeping).toBe(true);
  });

  it('should auto-wake when energy is full', () => {
    const sleepingStats = { ...mockStats, energy: 95, isSleeping: true };
    const elapsedSeconds = 3600; // More than enough to hit 100
    const result = calculateDecay(sleepingStats, elapsedSeconds);

    expect(result.energy).toBe(100);
    expect(result.isSleeping).toBe(false);
  });

  it('should not decay stats below 0', () => {
    const hugeElapsed = 1000000; // many days
    const result = calculateDecay(mockStats, hugeElapsed);

    expect(result.hunger).toBe(0);
    expect(result.thirst).toBe(0);
    expect(result.happiness).toBe(0);
    expect(result.relationship).toBe(0);
  });
});
