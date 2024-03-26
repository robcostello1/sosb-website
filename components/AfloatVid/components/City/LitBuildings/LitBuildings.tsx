import { memo, useCallback, useMemo } from "react";
import { getRandomColor } from "utils/utils";

import { Screen } from "../";
import { useVideoContext } from "../../Video";
import { OnFrameFunc } from "../BaseBuilding";
import BouncingBuilding from "../BouncingBuilding/BouncingBuilding";
import { useBuildingGroupParams } from "../hooks";
import { TextureProps } from "../types";

export type LitBuildingsProps = {
  numberOfBuildings: number;
  buildingHeightFactor?: number;
  chanceOfColorChange?: number;
  size: number;
  textureProps: TextureProps[];
};

const LitBuildings = ({
  numberOfBuildings,
  buildingHeightFactor = 300,
  chanceOfColorChange = 0.02,
  size,
  textureProps,
}: LitBuildingsProps) => {
  const limitedTextures = useMemo(() => [textureProps[0]], [textureProps]);

  const buildingParams = useBuildingGroupParams({
    size,
    numberOfBuildings,
    buildingHeightFactor,
    textureProps: limitedTextures,
  });

  const { barRef } = useVideoContext();

  const handleFrame = useCallback<OnFrameFunc>(
    ({ mesh, light }) => {
      if (barRef.current >= 0 && (Math.floor(barRef.current) + 1) % 4 === 0) {
        if (Math.random() <= chanceOfColorChange) {
          mesh.material.transparent = true;
          // TODO this should only be set once per "change"
          mesh.material.needsUpdate = true;
          light?.material.color.set(getRandomColor());
        }
      } else {
        mesh.material.transparent = false;
        mesh.material.needsUpdate = true;
      }
    },
    [barRef, chanceOfColorChange]
  );

  return (
    <>
      {buildingParams.map((props, index) => (
        <BouncingBuilding {...props} onFrame={handleFrame} key={index} />
      ))}
    </>
  );
};

export default memo(LitBuildings);
