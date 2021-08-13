import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },
});

export function Home() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isTfReady, setIsTfReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      await tf.ready();
      setIsTfReady(true);
    })();
  }, []);

  if (hasPermission === false || isTfReady === false) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} />
    </View>
  );
}
