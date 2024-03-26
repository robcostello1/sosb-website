import { memo, useRef } from "react";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { Triplet } from "utils/types";

import { MeshProps } from "@react-three/fiber";

import BaseBuilding, {
  DEFAULT_BUILDING_HEIGHT,
  DEFAULT_BUILDING_WIDTH,
} from "./BaseBuilding";
import { useBuildingVectorDimensions } from "./hooks";
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
  scale,
  position,
  rotation,
  textureProps,
  vinesAmount,
  pulsate,
  ...props
}: BuildingWithVinesProps) => {
  const { vectorScale, vectorPosition, vectorRotation } =
    useBuildingVectorDimensions({
      scale,
      position,
      rotation,
    });

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
        rotation={vectorRotation}
        pulsate={pulsate}
        vinesAmount={vinesAmount}
        {...props}
      />

      <BaseBuilding
        // @ts-expect-error
        ref={meshRef}
        scale={vectorScale}
        position={vectorPosition}
        rotation={vectorRotation}
        textureProps={textureProps}
        {...props}
      />
    </>
  );
};

export default memo(BuildingWithVines);
