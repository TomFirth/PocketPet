import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';

import { PetStats } from '../logic/GameState';
import { menuStyles as styles } from '../styles/Styles';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;

interface MenuWheelProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAction: (action: string) => void;
  stats: PetStats;
}

export const ACTIONS = [
  { id: 'food', label: '🍕', color: '#FF6B6B' },
  { id: 'water', label: '💧', color: '#4D96FF' },
  { id: 'toys', label: '🧸', color: '#6BCB77' },
  { id: 'clean', label: '🧼', color: '#1ABC9C' },
  { id: 'treats', label: '🍬', color: '#FFD93D' },
  { id: 'status', label: '📊', color: '#FF9F43' },
];

export const isActionLocked = (id: string, stats: PetStats): boolean => {
  switch (id) {
    case 'food':
      return !stats.hasEverHungry;
    case 'water':
      return !stats.hasEverThirsty;
    case 'toys':
      return !stats.hasUsedFoodOrWater;
    case 'clean':
      return stats.level < 5;
    case 'treats':
      return stats.level < 10;
    case 'status':
      return false; // Always unlocked for testing
    default:
      return false;
  }
};

export const MenuWheel: React.FC<MenuWheelProps> = ({
  isVisible,
  onClose,
  onSelectAction,
  stats,
}) => {
  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.wheelContainer}>
          {ACTIONS.map((action, index) => {
            const angle = (index / ACTIONS.length) * 2 * Math.PI;
            const radius = WHEEL_SIZE / 2.5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const locked = isActionLocked(action.id, stats);

            return (
              <TouchableOpacity
                key={action.id}
                disabled={locked}
                onPress={() => {
                  onSelectAction(action.id);
                  onClose();
                }}
                style={[
                  styles.segment,
                  {
                    backgroundColor: locked ? '#BDC3C7' : action.color,
                    opacity: locked ? 0.6 : 1,
                    transform: [{ translateX: x }, { translateY: y }],
                  },
                ]}
              >
                <Text style={styles.label}>{locked ? '🔒' : action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
};
