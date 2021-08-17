import React from 'react';
import { Text, View, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Feather } from '@expo/vector-icons';

import colors from '../../styles/colors';
import { styles } from './styles';

type PetCardProps = {
  title: string;
  percentage: string;
};

export function PetCard({ title, percentage }: PetCardProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.details}>
          <Text style={styles.time}>{percentage}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}
