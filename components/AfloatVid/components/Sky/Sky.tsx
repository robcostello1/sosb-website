import { memo, useEffect, useRef } from "react";

import { Environment, Sky as DreiSky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import Galaxy from "./Galaxy";

export type SkyProps = { overrideTime?: number; timeSpeedMultiplier?: number };

const Sky = ({ overrideTime = 0, timeSpeedMultiplier = 1 }: SkyProps) => {
  const timeRef = useRef(0);

  useEffect(() => {
    timeRef.current = overrideTime;
  }, [overrideTime]);

  useFrame((_, delta) => {
    timeRef.current += (delta / 20) * timeSpeedMultiplier;
  });

  return (
    <>
      <Environment resolution={256} frames={Infinity}>
        {/* <DreiSky sunPosition={0} inclination={0} /> */}
        <Galaxy timeRef={timeRef} />
      </Environment>
      <DreiSky sunPosition={Math.PI} inclination={Math.PI} azimuth={Math.PI} />
      <Galaxy timeRef={timeRef} />
    </>
  );
};

export default memo(Sky);
