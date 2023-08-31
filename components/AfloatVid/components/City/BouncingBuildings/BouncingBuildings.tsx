import { memo, useCallback, useContext, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import { getRandomColor } from '../../../../../utils/utils';
import { SongContext } from '../../SongProvider';
import { OnFrameFunc } from '../BaseBuilding';
import BouncingBuilding from '../BouncingBuilding';
import { useBuildingGroupParams, useBuildingLights } from '../hooks';
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
      {buildingParams.map(({ textureId, ...props }, index) => {
        const useLights = textureId === 0 || textureId === 2;
        return (
          <BouncingBuilding
            {...props}
            key={index}
            active={active}
            bounceSize={buildingMovement}
            useLights={useLights}
            onFrame={useLights ? handleLights : undefined}
          />
        );
      })}
    </>
  );
};

export default memo(BouncingBuildings);
