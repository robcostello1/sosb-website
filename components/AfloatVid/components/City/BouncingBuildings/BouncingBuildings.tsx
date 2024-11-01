import { memo, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import BouncingBuilding from '../BouncingBuilding';
import { useBuildingGroupParams, useBuildingLights } from '../hooks';
import InstancedScreens from '../InstancedScreens';
import { TextureProps } from '../types';

export type BouncingBuildingsProps = {
  started: boolean;
  textureProps: TextureProps[];
  numberOfBuildings: number;
  barNumToShowLights: number;
  size: number;
  active?: boolean;
};

const BouncingBuildings = ({
  started,
  textureProps,
  numberOfBuildings,
  active = true,
  barNumToShowLights = 0,
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

  const handleLights = useBuildingLights(barNumToShowLights);

  return (
    <>
      <InstancedScreens count={60} params={buildingParams} />

      {buildingParams.map(({ textureId, ...props }, index) => {
        return (
          <BouncingBuilding
            {...props}
            key={index}
            active={active}
            bounceSize={buildingMovement}
            useLights={true}
            onFrame={handleLights}
          />
        );
      })}
    </>
  );
};

export default memo(BouncingBuildings);
