import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import * as FileSystem from 'expo-file-system';

import { useNavigation, CommonActions } from '@react-navigation/native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

import { Button } from '../../components/Button';
import { Load } from '../../components/Load';
import { PetCard } from '../../components/PetCard';
import { useCamera } from '../../hooks/useCamera';
import { styles } from './styles';

type Prediction = {
  id: number;
  label: string;
  probability: number;
  probabilityFormatted: string;
};

export function ScannerData() {
  const [pets, setPets] = useState<Prediction[]>([]);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const { imageUri } = useCamera();

  function formatProbabilityInPercentage(probability: number) {
    return `${(probability * 100).toFixed(2)}%`;
  }

  useEffect(() => {
    async function getPetPredictions() {
      const model = await mobilenet.load();

      const imgB64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;

      const raw = new Uint8Array(imgBuffer);

      const imageTensor = decodeJpeg(raw);

      const predictions = await model.classify(imageTensor);

      let serializedPredictions = predictions.map((prediction, index) => {
        return {
          id: index * prediction.probability,
          label: prediction.className.split(',')[0],
          probabilityFormatted: formatProbabilityInPercentage(
            prediction.probability,
          ),
          probability: prediction.probability,
        };
      });

      serializedPredictions = serializedPredictions.sort((a, b) => {
        if (a.probability < b.probability) {
          return 1;
        }

        if (a.probability > b.probability) {
          return -1;
        }

        return 0;
      });

      setPets(serializedPredictions);
      setLoading(false);
    }

    getPetPredictions();
  }, []);

  function handleGoToHome() {
    navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
  }

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Dados do <Text style={styles.subTitle}>Scanner</Text>
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.pets}>
        <Text style={styles.petsTitle}>Possíveis raças</Text>

        <FlatList
          data={pets}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PetCard
              title={item.label}
              percentage={item.probabilityFormatted}
            />
          )}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.containerButton}>
          <Button title="Voltar para Home" onPress={handleGoToHome} />
        </View>
      </View>
    </View>
  );
}
