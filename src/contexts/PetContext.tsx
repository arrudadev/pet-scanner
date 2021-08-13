import { createContext, ReactNode, useState } from 'react';

type PetContextData = {
  imageUri: string;
  setImageUri: (uri: string) => void;
};

type PetContextProviderProps = {
  children: ReactNode;
};

export const PetContext = createContext({} as PetContextData);

export function PetContextProvider({ children }: PetContextProviderProps) {
  const [imageUri, setImageUri] = useState('');

  return (
    <PetContext.Provider value={{ imageUri, setImageUri }}>
      {children}
    </PetContext.Provider>
  );
}
