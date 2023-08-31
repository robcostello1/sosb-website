import { forwardRef, memo, RefObject, useMemo, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import {
    BackSide, BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, RepeatWrapping, Vector2,
    Vector3
} from 'three';

import { MeshProps, useFrame } from '@react-three/fiber';

import { TextureProps } from '../types';
import { OnFrameFunc } from './types';

export type BaseBuildingProps = Pick<MeshProps, "position" | "rotation"> & {
  lightRef?: RefObject<Mesh<BoxGeometry, MeshBasicMaterial>>;
  scale: Vector3;
  textureProps: TextureProps;
  useLights?: boolean;
  onFrame?: OnFrameFunc;
};

const WINDOW_HEIGHT = 3;
export const BUILDING_TEXTURE_HEIGHT = 4 * WINDOW_HEIGHT;
export const BUILDING_TEXTURE_WIDTH = BUILDING_TEXTURE_HEIGHT;
export const DEFAULT_BUILDING_HEIGHT = 40;
export const DEFAULT_BUILDING_WIDTH = 20;
const DEFAULT_SCALE = new Vector3(1, 1, 1);
const NORMAL_SCALE = new Vector2(0.1, 0.1);
export const LIT_MESH_INSET = 0.1;

const BaseBuilding = forwardRef<
  Mesh<BoxGeometry, MeshStandardMaterial>,
  BaseBuildingProps
>(
  (
    {
      lightRef,
      scale = DEFAULT_SCALE,
      textureProps,
      useLights,
      onFrame,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);
    const localLightRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null);

    const clonedTextures = useMemo(() => {
      return Object.entries(textureProps).reduce<TextureProps>(
        (acc, [key, texture]) => {
          const clonedTexture = texture.clone();

          clonedTexture.repeat.x =
            (DEFAULT_BUILDING_WIDTH * scale.x) / BUILDING_TEXTURE_WIDTH;
          clonedTexture.repeat.y =
            (DEFAULT_BUILDING_HEIGHT * scale.y) / BUILDING_TEXTURE_HEIGHT;
          // TODO needs to be expressly set here
          clonedTexture.wrapS = RepeatWrapping;
          clonedTexture.wrapT = RepeatWrapping;

          acc[key as keyof TextureProps] = clonedTexture;
          return acc;
        },
        {} as TextureProps
      );
    }, [textureProps, scale]);

    useFrame(({ clock: { elapsedTime } }) => {
      if (localRef.current) {
        // console.log(onFrame);
        onFrame?.({
          elapsedTime,
          light: localLightRef.current || undefined,
          mesh: localRef.current,
        });
      }
    });

    return (
      <>
        {useLights ? (
          <mesh
            scale={scale}
            ref={
              lightRef ? mergeRefs([lightRef, localLightRef]) : localLightRef
            }
            {...props}
          >
            <boxGeometry
              args={[
                DEFAULT_BUILDING_WIDTH - LIT_MESH_INSET,
                DEFAULT_BUILDING_HEIGHT - LIT_MESH_INSET,
                DEFAULT_BUILDING_WIDTH - LIT_MESH_INSET,
              ]}
            />
            <meshBasicMaterial color={0x000000} side={BackSide} />
          </mesh>
        ) : null}
        <mesh
          ref={ref ? mergeRefs([ref, localRef]) : localRef}
          scale={scale}
          {...props}
        >
          <boxGeometry
            args={[
              DEFAULT_BUILDING_WIDTH,
              DEFAULT_BUILDING_HEIGHT,
              DEFAULT_BUILDING_WIDTH,
            ]}
          />
          <meshStandardMaterial
            normalScale={NORMAL_SCALE}
            {...clonedTextures}
          />
        </mesh>
      </>
    );
  }
);

export default memo(BaseBuilding);
