import { useContext } from 'react';

import { PetContext } from '../contexts/PetContext';

export function usePet() {
  return useContext(PetContext);
}
