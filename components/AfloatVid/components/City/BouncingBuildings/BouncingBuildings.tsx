import { memo, useCallback, useContext, useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";

import { getRandomColor } from "../../../../../utils/utils";
import { SongContext } from "../../SongProvider";
import { OnFrameFunc } from "../BaseBuilding";
import BouncingBuilding from "../BouncingBuilding";
import { useBuildingGroupParams } from "../hooks";
import { TextureProps } from "../types";

export type BouncingBuildingsProps = {
  started: boolean;
  textureProps: TextureProps[];
  numberOfBuildings: number;
  barNumToShowLights: number;
  size: number;
};

const BouncingBuildings = ({
  started,
  textureProps,
  numberOfBuildings,
  barNumToShowLights = 0,
  size,
}: BouncingBuildingsProps) => {
  const buildingParams = useBuildingGroupParams({
    size,
    numberOfBuildings,
    textureProps,
  });
  const [buildingMovement, setBuildingMovement] = useState(0);
  const time = useRef(0);
  const { barRef } = useContext(SongContext);

  useFrame((_, delta) => {
    if (started) {
      time.current += delta;
      setBuildingMovement(Math.floor(time.current / 4) / 24);
    }
  });

  const handleLights = useCallback<OnFrameFunc>(
    ({ mesh, light }) => {
      if (barRef.current < barNumToShowLights) {
        return;
      }

      const isPlaying = barRef.current >= 0;
      const isLastOfFour = (Math.floor(barRef.current) + 1) % 4 === 0;
      const lightChance = barRef.current / 2000;

      if (isPlaying && isLastOfFour) {
        if (Math.random() > 1 - lightChance) {
          light.material.color.set(getRandomColor());
          if (!mesh.material.transparent) {
            mesh.material.transparent = true;
            mesh.material.needsUpdate = true;
          }
        }
      } else if (mesh.material.transparent) {
        mesh.material.transparent = false;
        mesh.material.needsUpdate = true;
      }
    },
    [barNumToShowLights, barRef]
  );

  return (
    <>
      {buildingParams.map(({ textureId, ...props }, index) => (
        <BouncingBuilding
          {...props}
          key={index}
          bounceSize={buildingMovement}
          useLights={textureId === 0}
          onFrame={textureId === 0 ? handleLights : undefined}
        />
      ))}
    </>
  );
};

export default memo(BouncingBuildings);
