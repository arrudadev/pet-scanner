import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import dogSVG from '../../assets/dog.png';
import { Camera } from '../../components/Camera';
import { useCamera } from '../../hooks/useCamera';
import { styles } from './styles';

export function Home() {
  const { isCameraOpen, setIsCameraOpen } = useCamera();

  if (isCameraOpen) {
    return <Camera />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>PetScanner</Text>

        <Image source={dogSVG} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Obtenha informações sobre seu pet apenas tirando uma foto dele.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => setIsCameraOpen(true)}
        >
          <Feather name="camera" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
