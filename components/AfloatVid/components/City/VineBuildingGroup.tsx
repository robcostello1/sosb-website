import { memo, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import { useVideoContext } from '../Video';
import BuildingWithVines from './BuildingWithVines';
import { useBuildingGroupParams } from './hooks';
import { TextureProps } from './types';

type VineBuildingGroupProps = {
  size: number;
  textureProps: TextureProps[];
};

const VineBuildingGroup = ({ textureProps, size }: VineBuildingGroupProps) => {
  const params = useBuildingGroupParams({
    buildingHeightFactor: 100,
    size,
    numberOfBuildings: 20,
    textureProps,
  });

  const [vines, setVines] = useState(
    params.map(() => ({
      vinesAmount: Math.random() / 4,
      pulsate: Math.random() / 4,
    }))
  );

  const { barRef } = useVideoContext();
  const lastBarRef = useRef(barRef.current);

  useFrame(() => {
    if (barRef.current === lastBarRef.current) {
      return;
    }
    setVines((vines) =>
      vines.map(({ vinesAmount, ...vine }) => ({
        vinesAmount: vinesAmount + barRef.current / 2000,
        ...vine,
      }))
    );
    lastBarRef.current = barRef.current;
  });

  return (
    <>
      {params.map(({ textureId, key, ...props }, index) => (
        <BuildingWithVines key={index} {...vines[index]} {...props} />
      ))}
    </>
  );
};

export default memo(VineBuildingGroup);
