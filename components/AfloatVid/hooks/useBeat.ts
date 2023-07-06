import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const useBeat = (bpm = 123) => {
  const params = useRef({ elapsedTime: 0, bar: 0, beat: 0 });
  useFrame((_, time) => {
    params.current.elapsedTime += time;

    params.current.beat = Math.floor(params.current.elapsedTime * (60 / bpm));
    params.current.bar = Math.floor(
      params.current.elapsedTime * 4 * (60 / bpm)
    );
  });

  return params;
};
