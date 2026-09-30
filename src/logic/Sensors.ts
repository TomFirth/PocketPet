import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import RNSoundLevel from 'react-native-sound-level';
import { map, filter } from 'rxjs/operators';

// Configure update intervals
setUpdateIntervalForType(SensorTypes.accelerometer, 100); // 10Hz

const SHAKE_THRESHOLD = 15; // G-force
const LOUD_NOISE_THRESHOLD = -20; // dBFS

/**
 * Shake Detection Logic
 */
export const shakeObservable = accelerometer.pipe(
  map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)),
  filter(acceleration => acceleration > SHAKE_THRESHOLD)
);

/**
 * Microphone / Sound Level Logic
 */
export const startSoundLevelMonitoring = (onLoudNoise: () => void) => {
  RNSoundLevel.onNewFrame = (data) => {
    if (data.value > LOUD_NOISE_THRESHOLD) {
      onLoudNoise();
    }
  };
  RNSoundLevel.start();
};

export const stopSoundLevelMonitoring = () => {
  RNSoundLevel.stop();
};
