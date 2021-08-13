import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import * as FileSystem from 'expo-file-system';

import { Feather } from '@expo/vector-icons';

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

import dogSVG from '../../assets/dog.png';
import { Camera } from '../../components/Camera';
import { useCamera } from '../../hooks/useCamera';
import { styles } from './styles';

export function Home() {
  const { isCameraOpen, setIsCameraOpen, imageUri } = useCamera();

  async function getImagePredictions(uri: string) {
    const model = await mobilenet.load();

    const imgB64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;

    const raw = new Uint8Array(imgBuffer);

    const imageTensor = decodeJpeg(raw);

    const prediction = await model.classify(imageTensor);

    console.log(prediction);
  }

  if (isCameraOpen) {
    return <Camera />;
  }

  if (imageUri) {
    console.log(imageUri);
    getImagePredictions(imageUri);
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
