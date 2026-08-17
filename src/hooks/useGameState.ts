import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { PetStats, INITIAL_STATS } from '../logic/GameState';
import { calculateDecay, calculateOfflineProgress } from '../logic/GameLoop';
import { loadStats, saveStats } from '../logic/Persistence';

export const useGameState = () => {
  const [stats, setStats] = useState<PetStats>(INITIAL_STATS);
  const [isLoaded, setIsLoaded] = useState(false);
  const statsRef = useRef<PetStats>(stats);

  // Keep ref in sync for AppState listener and other non-reactive lookups
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  // Load stats on mount
  useEffect(() => {
    const init = async () => {
      const savedStats = await loadStats();
      const updatedStats = calculateOfflineProgress(savedStats);
      setStats(updatedStats);
      setIsLoaded(true);
    };
    init();
  }, []);

  // Real-time decay loop
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setStats(current => {
        const now = Date.now();
        const elapsed = (now - current.lastUpdate) / 1000;
        // Only update if at least a second has passed to avoid micro-updates
        if (elapsed < 1) return current;
        return calculateDecay(current, elapsed);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // Periodic save
  useEffect(() => {
    if (!isLoaded) return;

    const saveInterval = setInterval(() => {
      saveStats(statsRef.current);
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [isLoaded]);

  // Auto-save on background
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        saveStats(statsRef.current);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const updateStat = useCallback((key: keyof PetStats, amount: number) => {
    setStats(prev => {
      if (prev.isSleeping && (key === 'hunger' || key === 'thirst' || key === 'happiness')) {
        return prev;
      }

      const val = prev[key];
      if (typeof val !== 'number') return prev;

      let next = val + amount;
      if (key !== 'xp' && key !== 'level' && key !== 'lastUpdate') {
        next = Math.max(0, Math.min(100, next));
      }

      return { ...prev, [key]: next, lastUpdate: Date.now() };
    });
  }, []);

  const addXP = useCallback((amount: number, onLevelUp?: (newLevel: number) => void) => {
    setStats(prev => {
      let xp = prev.xp + amount;
      let level = prev.level;
      const needed = level * 100;

      if (xp >= needed && level < 99) {
        xp -= needed;
        level += 1;
        // Side effects in functional updates are generally discouraged,
        // but for simple alerts it's often acceptable in RN.
        if (onLevelUp) setTimeout(() => onLevelUp(level), 0);
      }

      return { ...prev, xp, level, lastUpdate: Date.now() };
    });
  }, []);

  const toggleSleep = useCallback(() => {
    setStats(prev => ({
      ...prev,
      isSleeping: !prev.isSleeping,
      lastUpdate: Date.now()
    }));
  }, []);

  const setStatsManually = useCallback((updater: (prev: PetStats) => PetStats) => {
    setStats(prev => {
        const next = updater(prev);
        return { ...next, lastUpdate: Date.now() };
    });
  }, []);

  return {
    stats,
    updateStat,
    addXP,
    toggleSleep,
    setStatsManually,
    isLoaded,
  };
};
