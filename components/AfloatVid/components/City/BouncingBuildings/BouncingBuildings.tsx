import { memo, useMemo, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import BouncingBuilding from '../BouncingBuilding';
import { useBuildingGroupParams } from '../hooks';
import { TextureProps } from '../types';
import { getBuildingGroupParams } from '../utils';

export type BouncingBuildingsProps = {
  started: boolean;
  textureProps: TextureProps[];
  numberOfBuildings: number;
  size: number;
};

const BouncingBuildings = ({
  started,
  textureProps,
  numberOfBuildings,
  size,
}: BouncingBuildingsProps) => {
  const buildingParams = useBuildingGroupParams({
    size,
    numberOfBuildings,
    textureProps,
  });

  const [buildingMovement, setBuildingMovement] = useState(0);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (started) {
      time.current += delta;
      setBuildingMovement(Math.floor(time.current / 4) / 24);
    }
  });

  return (
    <>
      {buildingParams.map((props, index) => (
        <BouncingBuilding
          {...props}
          key={index}
          bounceSize={buildingMovement}
        />
      ))}
    </>
  );
};

export default memo(BouncingBuildings);
