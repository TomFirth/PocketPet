import { useEffect, useRef } from 'react';
import { shakeObservable, startSoundLevelMonitoring, stopSoundLevelMonitoring } from '../logic/Sensors';

export const useSensors = (onMoodChange: (mood: 'scared' | 'dizzy' | 'neutral') => void, isEnabled: boolean) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerMood = (mood: 'scared' | 'dizzy') => {
    onMoodChange(mood);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onMoodChange('neutral');
    }, 3000); // Reset to neutral after 3 seconds
  };

  useEffect(() => {
    if (!isEnabled) return;

    // Shake detection
    const shakeSubscription = shakeObservable.subscribe(() => {
      triggerMood('dizzy');
    });

    // Sound detection
    startSoundLevelMonitoring(() => {
      triggerMood('scared');
    });

    return () => {
      shakeSubscription.unsubscribe();
      stopSoundLevelMonitoring();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isEnabled]);
};
