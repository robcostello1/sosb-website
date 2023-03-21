import { MeshProps } from "@react-three/fiber";
import { forwardRef, useMemo } from "react";
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  Texture,
  Vector3,
  MirroredRepeatWrapping,
  RepeatWrapping,
} from "three";
import { TextureProps } from "./types";

export type BaseBuildingProps = Omit<MeshProps, "scale"> & {
  scale: Vector3;
  textureProps: TextureProps;
};

const WINDOW_HEIGHT = 3;
export const BUILDING_TEXTURE_HEIGHT = 4 * WINDOW_HEIGHT;
export const BUILDING_TEXTURE_WIDTH = BUILDING_TEXTURE_HEIGHT;
export const DEFAULT_BUILDING_HEIGHT = 40;
export const DEFAULT_BUILDING_WIDTH = 20;

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
      <meshStandardMaterial {...clonedTextures} />
    </mesh>
  );
});

export default BaseBuilding;
