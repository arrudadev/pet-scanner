import { useContext } from 'react';

import { CameraContext } from '../contexts/CameraContext';

export function useCamera() {
  return useContext(CameraContext);
}
