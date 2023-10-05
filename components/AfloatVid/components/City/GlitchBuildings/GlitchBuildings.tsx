import { useMemo } from 'react';
import { Vector3 } from 'three';

import { TextureProps } from '../types';
import GlitchBuilding from './GlitchBuilding/GlitchBuilding';

type GlitchBuildingsProps = {
  numberOfBuildings?: number;
  textures: TextureProps[];
  spacingX?: number;
  spacingZ?: number;
  visible?: boolean;
};

const GlitchBuildings = ({
  textures,
  numberOfBuildings = 20,
  spacingX = 100,
  spacingZ = 500,
  visible,
}: GlitchBuildingsProps) => {
  const buildingParams = useMemo(() => {
    const params: { position: Vector3 }[] = [];
    for (let index = 0; index < numberOfBuildings; index++) {
      [1, -1].map((side) =>
        params.push({
          position: new Vector3(
            side * (spacingX / 2 + Math.random() * (spacingX / 2)),
            0,
            Math.random() * spacingZ - spacingZ / 2
          ),
        })
      );
    }
    return params;
  }, [numberOfBuildings, spacingX, spacingZ]);

  return (
    <>
      {buildingParams.map((props, index) => (
        <GlitchBuilding
          visible={visible}
          key={index}
          textureProps={textures[Math.floor(Math.random() * 3)]}
          {...props}
        />
      ))}
    </>
  );
};

export default GlitchBuildings;
