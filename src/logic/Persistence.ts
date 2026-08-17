import AsyncStorage from '@react-native-async-storage/async-storage';
import { PetStats, INITIAL_STATS } from './GameState';

const STORAGE_KEY = '@PocketPet:stats';

/**
 * Saves the current pet stats to local storage.
 */
export async function saveStats(stats: PetStats): Promise<void> {
  try {
    const jsonValue = JSON.stringify(stats);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save stats:', e);
  }
}

/**
 * Loads pet stats from local storage.
 * Returns INITIAL_STATS if no data is found or an error occurs.
 */
export async function loadStats(): Promise<PetStats> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
  return INITIAL_STATS;
}

/**
 * Clears stored stats (useful for testing or resetting the game).
 */
export async function clearStats(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear stats:', e);
  }
}
