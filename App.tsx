/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { GameScreen } from './src/components/GameScreen';
import { appStyles as styles } from './src/styles/Styles';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <GameScreen />
      </View>
      <Toast />
    </SafeAreaProvider>
  );
}


export default App;
