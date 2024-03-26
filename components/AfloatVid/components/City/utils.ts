import { Texture, Vector3 } from "three";

import { REPEAT_WRAPPING } from "../../../../utils/consts";
import { Triplet } from "../../../../utils/types";
import {
  BUILDING_TEXTURE_HEIGHT,
  BUILDING_TEXTURE_WIDTH,
  DEFAULT_BUILDING_HEIGHT,
  DEFAULT_BUILDING_WIDTH,
} from "./consts";
import { TextureProps } from "./types";

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
    texture.wrapS = REPEAT_WRAPPING;
    texture.wrapT = REPEAT_WRAPPING;
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
    const textureId = Math.floor(Math.random() * textureProps.length);

    buildingArray.push({
      key: `${index}-1`,
      scale,
      position,
      textureProps: textureProps[textureId],
      textureId,
    });
  }

  return buildingArray;
};

export const getScaledTexture = (scale: Vector3) => ({
  x: (DEFAULT_BUILDING_WIDTH * scale.x) / BUILDING_TEXTURE_WIDTH,
  y: (DEFAULT_BUILDING_HEIGHT * scale.y) / BUILDING_TEXTURE_HEIGHT,
});

export const applyScaledTexture = (
  textureProps: TextureProps,
  scale: Vector3
) =>
  Object.entries(textureProps).reduce<TextureProps>((acc, [key, texture]) => {
    const clonedTexture = texture.clone();

    const { x, y } = getScaledTexture(scale);

    clonedTexture.repeat.x = x;
    clonedTexture.repeat.y = y;
    // TODO needs to be expressly set here
    clonedTexture.wrapS = REPEAT_WRAPPING;
    clonedTexture.wrapT = REPEAT_WRAPPING;

    acc[key as keyof TextureProps] = clonedTexture;
    return acc;
  }, {} as TextureProps);
