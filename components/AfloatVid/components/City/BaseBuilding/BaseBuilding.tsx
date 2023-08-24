import { forwardRef, memo, RefObject, useMemo, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import {
  BackSide,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  Vector2,
  Vector3,
} from "three";

import { MeshProps, useFrame } from "@react-three/fiber";

import { TextureProps } from "../types";
import { OnFrameFunc } from "./types";

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

    const localLightRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null);

    useFrame(({ clock: { elapsedTime } }) => {
      if (
        localLightRef.current &&
        // TODO requires outside ref. Merge refs?
        // @ts-expect-error // TODO typing
        ref?.current
      ) {
        onFrame?.({
          elapsedTime,
          light: localLightRef.current,
          // @ts-expect-error // TODO
          mesh: ref.current,
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
        <mesh scale={scale} {...props} ref={ref}>
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
