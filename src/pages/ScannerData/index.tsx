import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import dogSVG from '../../assets/dog.png';
import { Button } from '../../components/Button';
import { Load } from '../../components/Load';
import { PetCard } from '../../components/PetCard';
import { styles } from './styles';

export function ScannerData() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Shih-tzu',
      percentage: '82%',
    },
    {
      id: 2,
      name: 'Shih-tzu',
      percentage: '82%',
    },
    {
      id: 3,
      name: 'Shih-tzu',
      percentage: '82%',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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

      <Image source={dogSVG} style={styles.image} resizeMode="contain" />

      <View style={styles.pets}>
        <Text style={styles.petsTitle}>Possíveis raças</Text>

        <FlatList
          data={pets}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PetCard title={item.name} percentage={item.percentage} />
          )}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.containerButton}>
          <Button title="Voltar para Home" />
        </View>
      </View>
    </View>
  );
}
