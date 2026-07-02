import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { gameStyles as styles } from '../styles/Styles';
import { Pet } from './Pet';
import { MenuWheel } from './MenuWheel';
import { PetStats, INITIAL_STATS } from '../logic/GameState';
import { PET_THEMES } from '../logic/PetAssets';

const { width, height } = Dimensions.get('window');

const StatRow = ({
  label,
  value,
  delta,
}: {
  label: string;
  value: number;
  delta: number | null;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (delta !== null) {
      fadeAnim.setValue(1);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [delta]);

  const percentage = Math.max(0, Math.min(100, value));

  return (
    <View style={styles.statRow}>
      <View style={styles.statLabelRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.statLabel}>{value}%</Text>
          {delta !== null && (
            <Animated.Text
              style={[
                styles.deltaText,
                {
                  opacity: fadeAnim,
                  color: delta > 0 ? '#4CAF50' : '#F44336',
                  marginLeft: 5,
                },
              ]}
            >
              {delta > 0 ? `+${delta}` : delta}
            </Animated.Text>
          )}
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

export const GameScreen = () => {
  const [stats, setStats] = useState<PetStats>(INITIAL_STATS);
  const [menuVisible, setMenuVisible] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [activeToy, setActiveToy] = useState<{ x: number; y: number } | null>(null);
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 });
  const [deltas, setDeltas] = useState<Partial<Record<keyof PetStats, number | null>>>({});

  const [species, setSpecies] = useState<string>('cat');

  const toyPos = useRef(
    new Animated.ValueXY({ x: width / 2, y: height / 2 })
  ).current;

  // Unlock logic
  useEffect(() => {
    if (!stats.hasEverHungry && stats.hunger < 50) {
      setStats(prev => ({ ...prev, hasEverHungry: true }));
      Alert.alert('Unlock!', 'Food is now available 🍕');
    }

    if (!stats.hasEverThirsty && stats.thirst < 50) {
      setStats(prev => ({ ...prev, hasEverThirsty: true }));
      Alert.alert('Unlock!', 'Water is now available 💧');
    }
  }, [stats.hunger, stats.thirst]);

  const updateStat = (key: keyof PetStats, amount: number) => {
    setStats(prev => {
      const val = prev[key];
      if (typeof val !== 'number') return prev;

      let next = val + amount;

      if (key !== 'xp' && key !== 'level' && key !== 'lastUpdate') {
        next = Math.max(0, Math.min(100, next));
      }

      return { ...prev, [key]: next };
    });

    setDeltas(prev => ({ ...prev, [key]: amount }));
    setTimeout(() => setDeltas(prev => ({ ...prev, [key]: null })), 1000);
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      let xp = prev.xp + amount;
      let level = prev.level;
      const needed = level * 100;

      if (xp >= needed && level < 99) {
        xp -= needed;
        level += 1;

        Alert.alert('Level Up!', `Now level ${level}`);
      }

      return { ...prev, xp, level };
    });

    setDeltas(prev => ({ ...prev, xp: amount }));
    setTimeout(() => setDeltas(prev => ({ ...prev, xp: null })), 1000);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, g) => {
        const { moveX, moveY } = g;

        const cx = width / 2;
        const cy = height / 2;

        const dx = (moveX - cx) / cx;
        const dy = (moveY - cy) / cy;

        setLookAt({ x: dx, y: dy });

        const dist = Math.hypot(moveX - cx, moveY - (cy + 60));
        setMouthOpen(dist < 80);

        toyPos.setValue({ x: moveX, y: moveY });
      },

      onPanResponderRelease: () => {
        if (mouthOpen) {
          setActiveToy(null);
          setMouthOpen(false);
          addXP(25);
          updateStat('hunger', 20);
          updateStat('relationship', 2);
          Toast.show({
            type: 'success',
            text1: 'Yum!',
            text2: 'Your pet enjoyed the treat! 😋',
          });
        }
      },
    })
  ).current;

  const handleAction = (actionId: string) => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;

    switch (actionId) {
      case 'status':
        setStatusVisible(true);
        break;
      case 'toys':
        setActiveToy({ x: width / 2, y: height / 2 });
        toyPos.setValue({ x: width / 2, y: height / 2 });
        Toast.show({
          type: 'info',
          text1: 'Play time!',
          text2: 'Drag the toy to play with your pet! 🧸',
        });
        break;
      case 'food':
        updateStat('hunger', 20);
        updateStat('relationship', 1);
        addXP(10);
        setStats(prev => ({ ...prev, hasUsedFoodOrWater: true }));
        Toast.show({
          type: 'success',
          text1: 'Feeding',
          text2: 'Your pet feels full! 🍕',
        });
        break;
      case 'water':
        updateStat('thirst', 20);
        updateStat('relationship', 1);
        addXP(10);
        setStats(prev => ({ ...prev, hasUsedFoodOrWater: true }));
        Toast.show({
          type: 'success',
          text1: 'Hydrating',
          text2: 'Your pet is no longer thirsty! 💧',
        });
        break;
      case 'clean':
        updateStat('happiness', 15);
        addXP(20);
        Toast.show({
          type: 'info',
          text1: 'Cleaning',
          text2: 'Your pet is sparkling clean! 🧼',
        });
        break;
      case 'treats':
        updateStat('happiness', 25);
        updateStat('relationship', 5);
        addXP(30);
        Toast.show({
          type: 'success',
          text1: 'Special Treat!',
          text2: 'Your pet loves the candy! 🍬',
        });
        break;
    }
  };

  const dynamicToyStyle = {
    left: Animated.subtract(toyPos.x, 25),
    top: Animated.subtract(toyPos.y, 25),
  };

  return (
    <View style={styles.container}>
      {/* PET LAYER */}
      <View style={styles.petLayer}>
        <Pet
          lookAt={lookAt}
          mouthOpen={mouthOpen}
          assets={PET_THEMES[species]}
        />
      </View>

      {/* TOUCH LAYER */}
      <View
        style={styles.touchLayer}
        pointerEvents={activeToy ? 'none' : 'box-none'}
        onStartShouldSetResponder={() => true}
        onTouchStart={() => {
          updateStat('happiness', 1);
          updateStat('relationship', 0.5);
          addXP(2);
          Toast.show({
            type: 'info',
            text1: 'Stroking',
            text2: 'Your pet feels loved! ❤️',
            position: 'bottom',
            visibilityTime: 1000,
          });
        }}
      />

      {/* TOY */}
      {activeToy && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.toy, dynamicToyStyle]}
        >
          <Text style={styles.toyEmoji}>🧸</Text>
        </Animated.View>
      )}

      {/* UI BUTTONS (ABSOLUTE) */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={styles.iconText}>🐾</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          const list = Object.keys(PET_THEMES).filter(
            s => PET_THEMES[s].fur
          );
          const i =
            (list.indexOf(species) + 1) % list.length;
          setSpecies(list[i]);
        }}
      >
        <Text style={styles.iconText}>⚙️</Text>
      </TouchableOpacity>

      {/* MENU */}
      <MenuWheel
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSelectAction={handleAction}
        stats={stats}
      />

      {/* STATUS MODAL */}
      <Modal
        visible={statusVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setStatusVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setStatusVisible(false)}
        >
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Pet Status</Text>

            <StatRow label="Hunger" value={Math.floor(stats.hunger)} delta={deltas.hunger ?? null} />
            <StatRow label="Thirst" value={Math.floor(stats.thirst)} delta={deltas.thirst ?? null} />
            <StatRow label="Happiness" value={Math.floor(stats.happiness)} delta={deltas.happiness ?? null} />
            <StatRow label="Relationship" value={Math.floor(stats.relationship)} delta={deltas.relationship ?? null} />

            <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={styles.statLabel}>Level {stats.level}</Text>
                <Text style={styles.statLabel}>XP: {stats.xp} / {stats.level * 100}</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setStatusVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
};
