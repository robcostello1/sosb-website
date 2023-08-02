import { memo, useCallback, useContext, useMemo } from "react";

import { getRandomColor } from "../../../../../utils/utils";
import { SongContext } from "../../SongProvider/context";
import { useBuildingGroupParams } from "../hooks";
import LitBuilding, { LitBuildingProps } from "../LitBuilding";
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

  const { barRef } = useContext(SongContext);

  const handleFrame = useCallback<LitBuildingProps["onFrame"]>(
    ({ mesh, lightMaterial }) => {
      if (barRef.current >= 0 && (Math.floor(barRef.current) + 1) % 4 === 0) {
        if (Math.random() <= chanceOfColorChange) {
          mesh.material.transparent = true;
          // TODO this should only be set once per "change"
          mesh.material.needsUpdate = true;
          lightMaterial.color.set(getRandomColor());
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
        <LitBuilding {...props} onFrame={handleFrame} key={index} />
      ))}
    </>
  );
};

export default memo(LitBuildings);
