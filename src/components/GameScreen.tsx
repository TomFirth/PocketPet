import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { gameStyles as styles } from '../styles/Styles';
import { Pet } from './Pet';
import { MenuWheel } from './MenuWheel';
import { PetStats } from '../logic/GameState';
import { PET_THEMES } from '../logic/PetAssets';
import { useGameState } from '../hooks/useGameState';

const { width, height } = Dimensions.get('window');

interface FloatingHeart {
    id: number;
    x: number;
    y: number;
    anim: Animated.Value;
}

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
  const { stats, updateStat, addXP, toggleSleep, setStatsManually, isLoaded } = useGameState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [activeToy, setActiveToy] = useState<{ x: number; y: number } | null>(null);
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 });
  const [deltas, setDeltas] = useState<Partial<Record<keyof PetStats, number | null>>>({});
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const [species, setSpecies] = useState<string>('cat');

  const toyPos = useRef(
    new Animated.ValueXY({ x: width / 2, y: height / 2 })
  ).current;

  const zzzAnim = useRef(new Animated.Value(0)).current;
  const petBounce = useRef(new Animated.Value(1)).current;

  // Sleep animation
  useEffect(() => {
    if (stats.isSleeping) {
        Animated.loop(
            Animated.sequence([
                Animated.timing(zzzAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
                Animated.timing(zzzAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();
    } else {
        zzzAnim.setValue(0);
    }
  }, [stats.isSleeping]);

  // Unlock logic
  const hasEverHungryRef = useRef(stats.hasEverHungry);
  const hasEverThirstyRef = useRef(stats.hasEverThirsty);

  useEffect(() => {
    if (isLoaded) {
      if (!hasEverHungryRef.current && stats.hunger < 50) {
        hasEverHungryRef.current = true;
        setStatsManually(prev => ({ ...prev, hasEverHungry: true }));
        Alert.alert('Unlock!', 'Food is now available 🍕');
      }

      if (!hasEverThirstyRef.current && stats.thirst < 50) {
        hasEverThirstyRef.current = true;
        setStatsManually(prev => ({ ...prev, hasEverThirsty: true }));
        Alert.alert('Unlock!', 'Water is now available 💧');
      }
    }
  }, [stats.hunger, stats.thirst, isLoaded, setStatsManually]);

  const spawnHeart = useCallback((x: number, y: number) => {
    const id = Date.now();
    const anim = new Animated.Value(0);
    const newHeart = { id, x, y, anim };

    setHearts(prev => [...prev, newHeart]);

    Animated.timing(anim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
    });
  }, []);

  const handleStatUpdate = useCallback((key: keyof PetStats, amount: number) => {
    updateStat(key, amount);
    setDeltas(prev => ({ ...prev, [key]: amount }));
    setTimeout(() => setDeltas(prev => ({ ...prev, [key]: null })), 1000);
  }, [updateStat]);

  const handleXPAdd = useCallback((amount: number) => {
    addXP(amount, (level) => {
      Alert.alert('Level Up!', `Now level ${level}`);
    });
    setDeltas(prev => ({ ...prev, xp: amount }));
    setTimeout(() => setDeltas(prev => ({ ...prev, xp: null })), 1000);
  }, [addXP]);

  const toyPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !stats.isSleeping,

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
          handleXPAdd(25);
          handleStatUpdate('hunger', 20);
          handleStatUpdate('relationship', 2);
          spawnHeart(width / 2, height / 2);
          Toast.show({
            type: 'success',
            text1: 'Yum!',
            text2: 'Your pet enjoyed the treat! 😋',
          });
        }
      },
    })
  ).current;

  // STROKING GESTURE
  const strokePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !stats.isSleeping,
      onMoveShouldSetPanResponder: (_, g) => !stats.isSleeping && Math.hypot(g.dx, g.dy) > 10,
      onPanResponderMove: (_, g) => {
        // Subtle pet bounce feedback during stroking
        const speed = Math.hypot(g.vx, g.vy);
        if (speed > 0.3) {
            Animated.spring(petBounce, {
                toValue: 1.05,
                friction: 3,
                useNativeDriver: true,
            }).start();
        }
      },
      onPanResponderRelease: (_, g) => {
        Animated.spring(petBounce, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();

        const dist = Math.hypot(g.dx, g.dy);
        if (dist > 50) {
          handleStatUpdate('happiness', 5);
          handleStatUpdate('relationship', 1);
          handleXPAdd(10);
          spawnHeart(g.moveX, g.moveY);
          Toast.show({
            type: 'info',
            text1: 'Stroking',
            text2: 'Your pet feels loved! ❤️',
            position: 'bottom',
            visibilityTime: 1000,
          });
        }
      },
    })
  ).current;

  const handleAction = (actionId: string) => {
    if (stats.isSleeping && actionId !== 'sleep' && actionId !== 'status') {
        Toast.show({
            type: 'error',
            text1: 'Shhh!',
            text2: 'Your pet is sleeping! 😴',
        });
        return;
    }

    switch (actionId) {
      case 'status':
        setStatusVisible(true);
        break;
      case 'sleep':
        toggleSleep();
        Toast.show({
            type: 'info',
            text1: stats.isSleeping ? 'Waking up!' : 'Time to sleep!',
            text2: stats.isSleeping ? 'Good morning! ☀️' : 'Sweet dreams... 😴',
        });
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
        handleStatUpdate('hunger', 25);
        handleStatUpdate('relationship', 1);
        handleXPAdd(10);
        setStatsManually(prev => ({ ...prev, hasUsedFoodOrWater: true }));
        spawnHeart(width / 2, height / 2);
        Toast.show({
          type: 'success',
          text1: 'Feeding',
          text2: 'Your pet feels full! 🍕',
        });
        break;
      case 'water':
        handleStatUpdate('thirst', 40);
        handleStatUpdate('relationship', 1);
        handleXPAdd(10);
        setStatsManually(prev => ({ ...prev, hasUsedFoodOrWater: true }));
        spawnHeart(width / 2, height / 2);
        Toast.show({
          type: 'success',
          text1: 'Hydrating',
          text2: 'Your pet is no longer thirsty! 💧',
        });
        break;
      case 'clean':
        handleStatUpdate('happiness', 15);
        handleXPAdd(20);
        spawnHeart(width / 2, height / 2);
        Toast.show({
          type: 'info',
          text1: 'Cleaning',
          text2: 'Your pet is sparkling clean! 🧼',
        });
        break;
      case 'treats':
        handleStatUpdate('happiness', 25);
        handleStatUpdate('relationship', 5);
        handleXPAdd(30);
        spawnHeart(width / 2, height / 2);
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

  if (!isLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={{ marginTop: 10 }}>Loading your pet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* PET LAYER */}
      <Animated.View style={[styles.petLayer, { transform: [{ scale: petBounce }] }]}>
        <Pet
          lookAt={stats.isSleeping ? { x: 0, y: 0.2 } : lookAt}
          mouthOpen={stats.isSleeping ? false : mouthOpen}
          assets={PET_THEMES[species]}
        />
        {stats.isSleeping && (
            <Animated.View style={[styles.sleepOverlay, { opacity: zzzAnim }]}>
                <Text style={styles.sleepText}>Zzz</Text>
            </Animated.View>
        )}
      </Animated.View>

      {/* FLOATING HEARTS */}
      {hearts.map(heart => (
          <Animated.Text
            key={heart.id}
            style={[
                styles.heart,
                {
                    left: heart.x - 20,
                    top: heart.y - 20,
                    opacity: heart.anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                    transform: [
                        { translateY: heart.anim.interpolate({ inputRange: [0, 1], outputRange: [0, -100] }) },
                        { scale: heart.anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1.2, 1] }) }
                    ]
                }
            ]}
          >
              ❤️
          </Animated.Text>
      ))}

      {/* MINI STATS */}
      <View style={styles.miniStatsContainer}>
        <Text style={styles.miniStatLabel}>Hunger</Text>
        <View style={styles.miniStatBar}>
          <View style={[styles.miniStatFill, { width: `${stats.hunger}%`, backgroundColor: stats.hunger < 20 ? '#F44336' : '#4CAF50' }]} />
        </View>
        <View style={{ height: 5 }} />
        <Text style={styles.miniStatLabel}>Thirst</Text>
        <View style={styles.miniStatBar}>
          <View style={[styles.miniStatFill, { width: `${stats.thirst}%`, backgroundColor: stats.thirst < 20 ? '#F44336' : '#2196F3' }]} />
        </View>
        <View style={{ height: 5 }} />
        <Text style={styles.miniStatLabel}>Energy</Text>
        <View style={styles.miniStatBar}>
          <View style={[styles.miniStatFill, { width: `${stats.energy}%`, backgroundColor: stats.energy < 20 ? '#F44336' : '#FFD93D' }]} />
        </View>
      </View>

      {/* TOUCH LAYER (STROKING) */}
      <View
        style={styles.touchLayer}
        {...strokePanResponder.panHandlers}
        pointerEvents={activeToy || stats.isSleeping ? 'none' : 'box-none'}
      />

      {/* TOY */}
      {activeToy && !stats.isSleeping && (
        <Animated.View
          {...toyPanResponder.panHandlers}
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
          if (stats.isSleeping) return;
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
            <Text style={styles.statusTitle}>Pet Status {stats.isSleeping ? '(Sleeping)' : ''}</Text>

            <StatRow label="Hunger" value={Math.floor(stats.hunger)} delta={deltas.hunger ?? null} />
            <StatRow label="Thirst" value={Math.floor(stats.thirst)} delta={deltas.thirst ?? null} />
            <StatRow label="Energy" value={Math.floor(stats.energy)} delta={deltas.energy ?? null} />
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
