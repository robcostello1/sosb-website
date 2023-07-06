import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export const useBar = (bpm = 123) => {
  const elapsedTime = useRef(0);
  const [bar, setBar] = useState(0);
  useFrame((_, time) => {
    elapsedTime.current += time;

    setBar(Math.floor(elapsedTime.current * 4 * (60 / bpm)));
  });

  return bar;
};
