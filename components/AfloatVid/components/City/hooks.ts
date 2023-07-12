import { useMemo } from 'react';

import { useTexture } from '@react-three/drei';

import { TextureProps } from './types';
import { applyBuildingWrap } from './utils';

export const useBuildingTextures = (): TextureProps[] => {
  const textures = [
    useTexture(
      {
        map: `/maps/building-facade-1.jpg`,
        roughnessMap: `/maps/building-facade-1-roughness.jpg`,
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-2.jpg`,
        roughnessMap: `/maps/building-facade-2-roughness.jpg`,
        // TODO not working
        // normalMap: `/maps/building-facade-2-normal.jpg`,
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-3.jpg`,
        roughnessMap: `/maps/building-facade-3-roughness.jpg`,
      },
      applyBuildingWrap
    ),
  ];

  // This prevents the textures from being re-created on every render
  const textureEq = JSON.stringify(textures);
  return useMemo(
    () => textures,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textureEq]
  );
};
