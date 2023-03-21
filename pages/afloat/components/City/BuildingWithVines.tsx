import { Triplet } from "../../../../utils/types";

import { MeshProps } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MirroredRepeatWrapping,
  RepeatWrapping,
  Texture,
  Vector3,
} from "three";
import BaseBuilding, {
  DEFAULT_BUILDING_HEIGHT,
  DEFAULT_BUILDING_WIDTH,
} from "./BaseBuilding";
import { TextureProps } from "./types";
import Vines from "./Vines";

type BuildingWithVinesProps = Omit<MeshProps, "scale" | "position"> & {
  scale?: Triplet;
  position?: Triplet;
  rotation?: Triplet;
  vinesAmount: number;
  pulsate?: number;
  textureProps: TextureProps;
};

const BuildingWithVines = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  textureProps,
  vinesAmount,
  pulsate,
  ...props
}: BuildingWithVinesProps) => {
  const vectorScale = useMemo(() => new Vector3(...scale), [scale]);
  // Needs this for some reason
  const vectorPosition = useMemo(
    () =>
      new Vector3(
        position[0],
        position[1] + (DEFAULT_BUILDING_HEIGHT * vectorScale.y) / 2,
        position[2]
      ),
    [position]
  );

  const meshRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  return (
    <>
      <Vines
        geometryDimensions={[
          DEFAULT_BUILDING_WIDTH,
          DEFAULT_BUILDING_HEIGHT,
          DEFAULT_BUILDING_WIDTH,
        ]}
        scale={vectorScale}
        position={vectorPosition}
        pulsate={pulsate}
        vinesAmount={vinesAmount}
        {...props}
      />

      <BaseBuilding
        // @ts-expect-error
        ref={meshRef}
        scale={vectorScale}
        position={vectorPosition}
        textureProps={textureProps}
        {...props}
      />
    </>
  );
};

export default BuildingWithVines;
