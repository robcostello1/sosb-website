import { memo, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "three";

import { MeshProps } from "@react-three/fiber";

import { Triplet } from "../../../../../utils/types";
import BaseBuilding from "../BaseBuilding";
import { useBuildingVectorDimensions } from "../hooks";
import { TextureProps } from "../types";

const WINDOW_HEIGHT = 3;
export const BUILDING_TEXTURE_HEIGHT = 4 * WINDOW_HEIGHT;
export const BUILDING_TEXTURE_WIDTH = BUILDING_TEXTURE_HEIGHT;
export const DEFAULT_BUILDING_HEIGHT = 40;
export const DEFAULT_BUILDING_WIDTH = 20;
export const DEFAULT_POSITION: Triplet = [0, 0, 0];
export const DEFAULT_SCALE: Triplet = [1, 1, 1];
export const DEFAULT_ROTATION: Triplet = [0, 0, 0];
export const LIT_MESH_INSET = 0.1;

export type LitBuildingProps = Pick<MeshProps, "rotation"> & {
  position?: Triplet;
  scale?: Triplet;
  rotation?: Triplet;
  textureProps: TextureProps;
  onFrame: (props: {
    elapsedTime: number;
    lightMaterial: MeshBasicMaterial;
    mesh: Mesh<BoxGeometry, MeshStandardMaterial>;
  }) => void;
};

const LitBuilding = ({
  textureProps,
  scale,
  position,
  rotation,
  ...props
}: LitBuildingProps) => {
  const { vectorScale, vectorPosition, vectorRotation } =
    useBuildingVectorDimensions({
      scale,
      position,
      rotation,
    });

  const ref = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  return (
    <BaseBuilding
      ref={ref}
      textureProps={textureProps}
      scale={vectorScale}
      position={vectorPosition}
      rotation={vectorRotation}
      {...props}
    />
  );
};

export default memo(LitBuilding);
