import { MirroredRepeatWrapping, RepeatWrapping, Texture } from 'three';

import { Triplet } from '../../../../utils/types';
import { TextureProps } from './types';

export const getBuildingAttributes = (size: number, index: number) => {
  const isEven = index % 2 === 0;
  const side = isEven ? -1 : 1;
  const x = (20 + Math.random() * 300) * side;
  const z = Math.random() * size - size / 2;
  const sizeFactor = 50;
  return {
    scale: [
      0.5 + Math.random(),
      0.2 +
        Math.random() *
          Math.sqrt(Math.abs(sizeFactor / z)) *
          Math.sqrt(Math.abs(sizeFactor / x)),
      0.5 + Math.random(),
    ] as Triplet,
    position: [x, 0, -z] as Triplet,
  };
};

export function weightedRandom(
  // Controls the shape of the distribution, higher values make it more skewed towards lower values
  lambda = 2
) {
  const u = Math.random(); // Generate a random number between 0 and 1
  const x = -Math.log(1 - u) / lambda; // Transform the uniform distribution into an exponential distribution
  return x;
}

export const applyBuildingWrap = (textures: Texture | Texture[]) => {
  (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  });
};

export const getRandomBuildingScale = (
  x: number,
  z: number,
  sizeFactor: number
): Triplet => {
  const y =
    0.2 +
    Math.min(
      Math.random() *
        Math.sqrt(Math.abs(sizeFactor / z)) *
        Math.sqrt(Math.abs(sizeFactor / x)),
      2
    );
  return [0.5 + Math.random(), y, 0.5 + Math.random()];
};

const BUILDING_SIZE_FACTOR = 50;

export const getBuildingGroupParams = ({
  size,
  buildingHeightFactor = BUILDING_SIZE_FACTOR,
  numberOfBuildings,
  textureProps,
}: {
  size: number;
  numberOfBuildings: number;
  buildingHeightFactor?: number;
  textureProps: TextureProps[];
}) => {
  const buildingArray = [];

  for (let index = 0; index < numberOfBuildings; index++) {
    const isEven = index % 2 === 0;
    const side = isEven ? -1 : 1;
    const x = (20 + Math.random() * 300) * side;
    const z = Math.random() * size - size / 2;
    const scale = getRandomBuildingScale(x, z, buildingHeightFactor);
    const position: Triplet = [x, 0, -z];

    buildingArray.push({
      key: `${index}-1`,
      scale,
      position,
      textureProps:
        textureProps[Math.floor(Math.random() * textureProps.length)],
    });
  }

  return buildingArray;
};
