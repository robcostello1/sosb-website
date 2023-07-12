import gsap, { Power2 } from 'gsap';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

import { MeshProps } from '@react-three/fiber';

import { Triplet } from '../../../../utils/types';
import BaseBuilding, { BUILDING_TEXTURE_HEIGHT, DEFAULT_BUILDING_HEIGHT } from './BaseBuilding';
import { TextureProps } from './types';

export type BouncingBuildingProps = Pick<MeshProps, "rotation"> & {
  smoothMoves?: number;
  scale?: Triplet;
  position?: Triplet;
  textureProps: TextureProps;
};

const EASE = Power2.easeInOut;
const DURATION = 1;
const MS_DURATION = DURATION * 1000;

const BouncingBuilding = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  smoothMoves,
  textureProps,
  ...props
}: BouncingBuildingProps) => {
  const [resize, setResize] = useState(1);

  const origVectorScale = useMemo(() => new Vector3(...scale), [scale]);
  const origVectorPosition = useMemo(
    () =>
      new Vector3(
        position[0],
        position[1] + (DEFAULT_BUILDING_HEIGHT * origVectorScale.y) / 2,
        position[2]
      ),
    [position, origVectorScale.y]
  );

  const meshRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  const applyResize = useCallback(
    (mesh: Mesh<BoxGeometry, MeshStandardMaterial>, size: number) => {
      const targetSize = origVectorScale.y + origVectorScale.y * size;

      gsap.to(mesh.scale, {
        duration: DURATION,
        ease: EASE,
        y: targetSize,
      });

      // TODO position 7 != 0 not handled well
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

  // useEffect(() => {
  //   console.log("RESIZE TO NEXT", resize);
  // }, [resize]);

  // useEffect(() => {
  //   console.log("ORIGINAL SCALE", origVectorScale.y);
  // }, [origVectorScale.y]);

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);

    const nextEvent = MS_DURATION + Math.random() * (5000 - MS_DURATION);

    timeout.current = setTimeout(() => {
      if (meshRef.current && smoothMoves) {
        applyResize(meshRef.current, resize * smoothMoves);
        setResize(Math.random() * 2);
      }
    }, nextEvent);
  }, [resize, smoothMoves, applyResize]);

  return (
    <BaseBuilding
      ref={meshRef}
      textureProps={textureProps}
      scale={origVectorScale}
      position={origVectorPosition}
      {...props}
    />
  );
};

export default memo(BouncingBuilding);
