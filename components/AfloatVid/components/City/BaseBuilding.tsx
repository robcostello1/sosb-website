import { forwardRef, memo, useMemo } from 'react';
import {
    BoxGeometry, Mesh, MeshStandardMaterial, MirroredRepeatWrapping, RepeatWrapping, Vector2,
    Vector3
} from 'three';

import { MeshProps } from '@react-three/fiber';

import { TextureProps } from './types';

export type BaseBuildingProps = Pick<MeshProps, "position" | "rotation"> & {
  scale: Vector3;
  textureProps: TextureProps;
};

const WINDOW_HEIGHT = 3;
export const BUILDING_TEXTURE_HEIGHT = 4 * WINDOW_HEIGHT;
export const BUILDING_TEXTURE_WIDTH = BUILDING_TEXTURE_HEIGHT;
export const DEFAULT_BUILDING_HEIGHT = 40;
export const DEFAULT_BUILDING_WIDTH = 20;
const NORMAL_SCALE = new Vector2(0.1, 0.1);

const BaseBuilding = forwardRef<
  Mesh<BoxGeometry, MeshStandardMaterial>,
  BaseBuildingProps
>(({ textureProps, ...props }, ref) => {
  const clonedTextures = useMemo(() => {
    return Object.entries(textureProps).reduce<TextureProps>(
      (acc, [key, value]) => {
        const clonedTexture = value.clone();

        clonedTexture.repeat.x =
          (DEFAULT_BUILDING_WIDTH * props.scale.x) / BUILDING_TEXTURE_WIDTH;
        clonedTexture.repeat.y =
          (DEFAULT_BUILDING_HEIGHT * props.scale.y) / BUILDING_TEXTURE_HEIGHT;
        // TODO needs to be expressly set here
        // TODO just RepeatWrapping
        clonedTexture.wrapS = MirroredRepeatWrapping;
        clonedTexture.wrapT = RepeatWrapping;

        acc[key as keyof TextureProps] = clonedTexture;
        return acc;
      },
      {} as TextureProps
    );
  }, [textureProps, props.scale]);

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry
        args={[
          DEFAULT_BUILDING_WIDTH,
          DEFAULT_BUILDING_HEIGHT,
          DEFAULT_BUILDING_WIDTH,
        ]}
      />
      <meshStandardMaterial {...clonedTextures} normalScale={NORMAL_SCALE} />
    </mesh>
  );
});

export default memo(BaseBuilding);
