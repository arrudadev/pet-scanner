import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Camera as ExpoCamera } from 'expo-camera';

import { useNavigation, CommonActions } from '@react-navigation/native';

import { useCamera } from '../../hooks/useCamera';

export function Camera() {
  let cameraRef: ExpoCamera | null = null;

  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const { setImageUri, setIsCameraOpen } = useCamera();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  async function handleTakePicture() {
    if (cameraRef) {
      const { uri } = await cameraRef?.takePictureAsync();
      setImageUri(uri);
      setIsCameraOpen(false);

      navigation.dispatch(CommonActions.navigate({ name: 'ScannerData' }));
    }
  }

  if (hasCameraPermission === false) {
    return <View />;
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
      }}
    >
      <ExpoCamera
        type={ExpoCamera.Constants.Type.back}
        style={{ flex: 1 }}
        ref={ref => {
          cameraRef = ref;
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={handleTakePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}
              />
            </View>
          </View>
        </View>
      </ExpoCamera>
    </View>
  );
}
