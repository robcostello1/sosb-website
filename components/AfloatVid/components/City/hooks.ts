import { useEffect, useMemo, useRef, useState } from "react";
import { Euler, Vector3 } from "three";

import { useTexture } from "@react-three/drei";

import { Triplet } from "../../../../utils/types";
import {
  DEFAULT_BUILDING_HEIGHT,
  DEFAULT_POSITION,
  DEFAULT_ROTATION,
  DEFAULT_SCALE,
} from "./consts";
import { TextureProps } from "./types";
import { applyBuildingWrap, getBuildingGroupParams } from "./utils";

export const useBuildingTextures = (): TextureProps[] => {
  const textures = [
    useTexture(
      {
        map: "/maps/building-facade-1.jpg",
        roughnessMap: "/maps/building-facade-1-roughness.jpg",
        alphaMap: "/maps/building-facade-1-alpha.jpg",
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: "/maps/building-facade-2.jpg",
        roughnessMap: "/maps/building-facade-2-roughness.jpg",
        // TODO not working
        // normalMap: "/maps/building-facade-2-normal.jpg",
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: "/maps/building-facade-3.jpg",
        roughnessMap: "/maps/building-facade-3-roughness.jpg",
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

export const useRandomlyTimedEvent = (
  speed: number,
  // Ensures events don't overlap
  duration = 0,
  callback: () => void
) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [repeat, setRepeat] = useState(0);

  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);

    const nextEvent = duration + Math.random() * (speed - duration);

    timeout.current = setTimeout(() => {
      callback();
      setRepeat((prev) => prev + 1);
    }, nextEvent);

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [speed, duration, callback, repeat]);
};

export const useBuildingGroupParams = ({
  size,
  numberOfBuildings,
  buildingHeightFactor,
  textureProps,
}: {
  size: number;
  numberOfBuildings: number;
  buildingHeightFactor?: number;
  textureProps: TextureProps[];
}) => {
  const buildingParams = useMemo(() => {
    const params = getBuildingGroupParams({
      size,
      numberOfBuildings,
      buildingHeightFactor,
      textureProps,
    });

    return params;
  }, [size, textureProps, numberOfBuildings, buildingHeightFactor]);

  return buildingParams;
};

export const useBuildingVectorDimensions = ({
  scale = DEFAULT_SCALE,
  position = DEFAULT_POSITION,
  rotation = DEFAULT_ROTATION,
}: {
  position?: Triplet;
  scale?: Triplet;
  rotation?: Triplet;
}) => {
  const vectorScale = useMemo(() => new Vector3(...scale), [scale]);
  const vectorPosition = useMemo(
    () =>
      new Vector3(
        position[0],
        position[1] + (DEFAULT_BUILDING_HEIGHT * vectorScale.y) / 2,
        position[2]
      ),
    [position, vectorScale.y]
  );
  const vectorRotation = useMemo(() => new Euler(...rotation), [rotation]);

  return {
    vectorScale,
    vectorPosition,
    vectorRotation,
  };
};
