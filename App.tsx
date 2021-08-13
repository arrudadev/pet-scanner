import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import { CameraContextProvider } from './src/contexts/CameraContext';
import { Home } from './src/pages/Home';

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTfReady(true);
    })();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  if (isTfReady === false) {
    return <View />;
  }

  return (
    <CameraContextProvider>
      <Home />
    </CameraContextProvider>
  );
}
