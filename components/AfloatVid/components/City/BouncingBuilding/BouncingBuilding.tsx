import gsap, { Power2 } from "gsap";
import { memo, useCallback, useMemo, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Vector3,
} from "three";

import { MeshProps } from "@react-three/fiber";

import { Triplet } from "../../../../../utils/types";
import BaseBuilding, {
  BaseBuildingProps,
  BUILDING_TEXTURE_HEIGHT,
  DEFAULT_BUILDING_HEIGHT,
} from "../BaseBuilding";
import { useBuildingVectorDimensions, useRandomlyTimedEvent } from "../hooks";
import { TextureProps } from "../types";

export type BouncingBuildingProps = Omit<BaseBuildingProps, "scale"> & {
  bounceSize?: number;
  scale?: Triplet;
  position?: Triplet;
  textureProps: TextureProps;
  onFrame?: BaseBuildingProps["onFrame"];
};

const EASE = Power2.easeInOut;
const DURATION = 1;
const MS_DURATION = DURATION * 1000;
const MOVEMENT_FREQUNCY = MS_DURATION + 2000;
const DEFAULT_SCALE: Triplet = [1, 1, 1];
const DEFAULT_POSITION: Triplet = [0, 0, 0];

const BouncingBuilding = ({
  scale = DEFAULT_SCALE,
  position = DEFAULT_POSITION,
  bounceSize,
  textureProps,
  ...props
}: BouncingBuildingProps) => {
  const { vectorScale: origVectorScale, vectorPosition: origVectorPosition } =
    useBuildingVectorDimensions({
      scale,
      position,
    });

  const lightRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null);
  const meshRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  const applyResize = useCallback(
    (
      mesh: Mesh<BoxGeometry, MeshStandardMaterial | MeshBasicMaterial>,
      size: number
    ) => {
      const targetSize = origVectorScale.y + origVectorScale.y * size;

      gsap.to(mesh.scale, {
        duration: DURATION,
        ease: EASE,
        y: targetSize,
      });

      gsap.to(mesh.position, {
        duration: DURATION,
        ease: EASE,
        y: position[1] + (DEFAULT_BUILDING_HEIGHT * targetSize) / 2,
      });

      mesh.material.map?.repeat &&
        gsap.to(mesh.material.map.repeat, {
          duration: DURATION,
          ease: EASE,
          y: (DEFAULT_BUILDING_HEIGHT * targetSize) / BUILDING_TEXTURE_HEIGHT,
        });
    },
    [origVectorScale.y, position]
  );

  const resizeCallback = useCallback(() => {
    if (meshRef.current && lightRef.current && bounceSize) {
      const targetSize = Math.random() * 2 * bounceSize;
      applyResize(meshRef.current, targetSize);
      applyResize(lightRef.current, targetSize);
    }
  }, [applyResize, bounceSize]);

  useRandomlyTimedEvent(MOVEMENT_FREQUNCY, MS_DURATION, resizeCallback);

  return (
    <BaseBuilding
      ref={meshRef}
      lightRef={lightRef}
      textureProps={textureProps}
      scale={origVectorScale}
      position={origVectorPosition}
      {...props}
    />
  );
};

export default memo(BouncingBuilding);
