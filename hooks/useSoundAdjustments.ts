import { useThree } from "@react-three/fiber";
import throttle from "lodash/throttle";
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  SetStateAction,
  useRef,
} from "react";
import { SoundConfig } from "../components/Sounds";

type GetNewValues = SetStateAction<{ [key: string]: SoundConfig }>;

// (oldValues: { [key: string]: SoundConfig }) => {
//   [key: string]: SoundConfig;
// };

export const useSoundAdjustments = (
  getNewValues: GetNewValues,
  focus?: string
) => {
  const { controls } = useThree();

  const [soundAdjustments, setSoundAdjustments] = useState({});

  useEffect(() => {
    setSoundAdjustments(getNewValues);
  }, [focus]);

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
  }, [controls]);

  return soundAdjustments;
};
