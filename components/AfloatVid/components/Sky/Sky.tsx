import { memo, useEffect, useRef, useState } from 'react';

import { Environment, Sky as DreiSky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import Galaxy from './Galaxy';

export type OurSkyProps = {
  overrideTime?: number;
  timeSpeedMultiplier?: number;
};

const calculateDayParams = (time: number) => {
  const dayElapsed = (time % 24) / 24;

  return {
    inclination: 0.4 + Math.sin(-0.1 + dayElapsed * Math.PI) * 0.2,
    azimuth: ((1 - dayElapsed) * Math.PI) / 4,
  };
};

const Sky = ({ overrideTime = 0, timeSpeedMultiplier = 1 }: OurSkyProps) => {
  const timeRef = useRef(0);

  useEffect(() => {
    timeRef.current = overrideTime;
  }, [overrideTime]);

  useFrame((_, delta) => {
    timeRef.current += (delta / 20) * timeSpeedMultiplier;
    setDayParams(calculateDayParams(timeRef.current));
  });

  const [dayParams, setDayParams] = useState(
    calculateDayParams(timeRef.current)
  );

  return (
    <>
      <Environment resolution={256} frames={Infinity}>
        <DreiSky
          inclination={dayParams.inclination}
          azimuth={dayParams.azimuth}
        />
        <Galaxy timeRef={timeRef} />
      </Environment>
      <DreiSky
        inclination={dayParams.inclination}
        azimuth={dayParams.azimuth}
      />

      <Galaxy timeRef={timeRef} />
    </>
  );
};

export default memo(Sky);
