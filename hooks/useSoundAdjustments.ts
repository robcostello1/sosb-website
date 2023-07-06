import throttle from 'lodash/throttle';
import { SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useThree } from '@react-three/fiber';

import { SoundConfig } from '../components/Sounds';

type GetNewValues = SetStateAction<{ [key: string]: SoundConfig }>;

export const useSoundAdjustments = (
  getNewValues: GetNewValues,
  focus?: string
) => {
  const { controls } = useThree();

  const [soundAdjustments, setSoundAdjustments] = useState({});

  useEffect(() => {
    setSoundAdjustments(getNewValues);
  }, [focus, getNewValues]);

  const handleCameraChange = useCallback(() => {
    setSoundAdjustments(getNewValues);
  }, [getNewValues]);

  const throttledHandleCameraChange = useMemo(
    () => throttle(handleCameraChange, 100),
    [handleCameraChange]
  );

  const prevCallback = useRef<any>();

  useEffect(() => {
    if (prevCallback.current) {
      controls?.removeEventListener("change", prevCallback.current);
    }
    controls?.addEventListener("change", throttledHandleCameraChange);

    prevCallback.current = throttledHandleCameraChange;

    return () => {
      if (prevCallback.current) {
        controls?.removeEventListener("change", prevCallback.current);
      }
    };
  }, [controls, throttledHandleCameraChange]);

  return soundAdjustments;
};
