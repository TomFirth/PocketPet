import React from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import { petStyles as styles } from '../styles/Styles';

interface PetProps {
  lookAt?: { x: number; y: number };
  mouthOpen?: boolean;
  mood?: 'happy' | 'scared' | 'dizzy' | 'neutral';
  assets?: {
    fur?: any;
    eyeLeft?: any;
    eyeRight?: any;
    pupilLeft?: any;
    pupilRight?: any;
    mouthClosed?: any;
    mouthOpen?: any;
  };
}

export const Pet: React.FC<PetProps> = ({
  lookAt = { x: 0, y: 0 },
  mouthOpen = false,
  mood = 'neutral',
  assets,
}) => {
  const lx = lookAt?.x ?? 0;
  const ly = lookAt?.y ?? 0;

  const EYE_BASE_SENSITIVITY = mood === 'scared' ? 2 : 4;
  const PUPIL_SENSITIVITY = mood === 'scared' ? 5 : 15;
  const CONVERGENCE = 5;

  const leftEyeStyle = {
    transform: [
      { translateX: lx * EYE_BASE_SENSITIVITY },
      { translateY: ly * EYE_BASE_SENSITIVITY },
      { scale: mood === 'scared' ? 1.2 : 1 },
    ],
  };

  const rightEyeStyle = {
    transform: [
      { translateX: lx * EYE_BASE_SENSITIVITY },
      { translateY: ly * EYE_BASE_SENSITIVITY },
      { scale: mood === 'scared' ? 1.2 : 1 },
    ],
  };

  const dizzyRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mood === 'dizzy') {
      Animated.loop(
        Animated.timing(dizzyRotation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ).start();
    } else {
      dizzyRotation.setValue(0);
    }
  }, [mood]);

  const rotateInterpolation = dizzyRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const leftPupilStyle = {
    transform: [
      {
        translateX:
          lx * PUPIL_SENSITIVITY + (1 - Math.abs(lx)) * CONVERGENCE,
      },
      { translateY: ly * PUPIL_SENSITIVITY + 10 },
      { rotate: mood === 'dizzy' ? rotateInterpolation : '0deg' },
    ],
  };

  const rightPupilStyle = {
    transform: [
      {
        translateX:
          lx * PUPIL_SENSITIVITY - (1 - Math.abs(lx)) * CONVERGENCE,
      },
      { translateY: ly * PUPIL_SENSITIVITY + 10 },
      { rotate: mood === 'dizzy' ? rotateInterpolation : '0deg' },
    ],
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND LAYER */}
      <View style={styles.backgroundLayer}>
        {assets?.fur ? (
          <Image
            source={assets.fur}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: '#4a90e2' },
            ]}
          />
        )}
      </View>

      {/* FACE LAYER */}
      <View style={styles.faceContainer}>
        <View style={styles.face}>
          {/* EYES */}
          <View style={styles.eyeContainer}>
            {/* LEFT EYE */}
            <Animated.View
              style={[
                styles.eyeBase,
                assets?.eyeLeft && { backgroundColor: 'transparent' },
                leftEyeStyle,
              ]}
            >
              {assets?.eyeLeft ? (
                <Image
                  source={assets.eyeLeft}
                  style={styles.imageFill}
                  resizeMode="contain"
                />
              ) : null}

              <Animated.View style={[styles.pupil, leftPupilStyle]}>
                {assets?.pupilLeft ? (
                  <Image
                    source={assets.pupilLeft}
                    style={styles.imageFill}
                    resizeMode="contain"
                  />
                ) : null}
              </Animated.View>
            </Animated.View>

            {/* RIGHT EYE */}
            <Animated.View
              style={[
                styles.eyeBase,
                assets?.eyeRight && { backgroundColor: 'transparent' },
                rightEyeStyle,
              ]}
            >
              {assets?.eyeRight ? (
                <Image
                  source={assets.eyeRight}
                  style={styles.imageFill}
                  resizeMode="contain"
                />
              ) : null}

              <Animated.View style={[styles.pupil, rightPupilStyle]}>
                {assets?.pupilRight ? (
                  <Image
                    source={assets.pupilRight}
                    style={styles.imageFill}
                    resizeMode="contain"
                  />
                ) : null}
              </Animated.View>
            </Animated.View>
          </View>

          {/* MOUTH */}
          <View style={styles.mouthContainer}>
            {mouthOpen ? (
              assets?.mouthOpen ? (
                <Image
                  source={assets.mouthOpen}
                  style={styles.mouthImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={[styles.mouthShape, styles.mouthOpen]} />
              )
            ) : assets?.mouthClosed ? (
              <Image
                source={assets.mouthClosed}
                style={styles.mouthImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.mouthShape} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};