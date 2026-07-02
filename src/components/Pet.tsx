import React from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import { petStyles as styles } from '../styles/Styles';

interface PetProps {
  lookAt?: { x: number; y: number };
  mouthOpen?: boolean;
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
  assets,
}) => {
  const lx = lookAt?.x ?? 0;
  const ly = lookAt?.y ?? 0;

  const EYE_BASE_SENSITIVITY = 4;
  const PUPIL_SENSITIVITY = 15;
  const CONVERGENCE = 5;

  const leftEyeStyle = {
    transform: [
      { translateX: lx * EYE_BASE_SENSITIVITY },
      { translateY: ly * EYE_BASE_SENSITIVITY },
    ],
  };

  const rightEyeStyle = {
    transform: [
      { translateX: lx * EYE_BASE_SENSITIVITY },
      { translateY: ly * EYE_BASE_SENSITIVITY },
    ],
  };

  const leftPupilStyle = {
    transform: [
      {
        translateX:
          lx * PUPIL_SENSITIVITY + (1 - Math.abs(lx)) * CONVERGENCE,
      },
      { translateY: ly * PUPIL_SENSITIVITY + 10 },
    ],
  };

  const rightPupilStyle = {
    transform: [
      {
        translateX:
          lx * PUPIL_SENSITIVITY - (1 - Math.abs(lx)) * CONVERGENCE,
      },
      { translateY: ly * PUPIL_SENSITIVITY + 10 },
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