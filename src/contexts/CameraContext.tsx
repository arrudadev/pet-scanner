import React, { createContext, ReactNode, useState } from 'react';

type CameraContextData = {
  imageUri: string;
  isCameraOpen: boolean;
  setImageUri: (uri: string) => void;
  setIsCameraOpen: (isCameraOpen: boolean) => void;
};

type CameraContextProviderProps = {
  children: ReactNode;
};

export const CameraContext = createContext({} as CameraContextData);

export function CameraContextProvider({
  children,
}: CameraContextProviderProps) {
  const [imageUri, setImageUri] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <CameraContext.Provider
      value={{ imageUri, setImageUri, isCameraOpen, setIsCameraOpen }}
    >
      {children}
    </CameraContext.Provider>
  );
}
