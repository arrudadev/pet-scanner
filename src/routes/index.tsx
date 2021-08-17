import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../pages/Home';
import { ScannerData } from '../pages/ScannerData';

const StackNavigator = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <StackNavigator.Screen name="Home" component={Home} />

        <StackNavigator.Screen name="ScannerData" component={ScannerData} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
