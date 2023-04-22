import { Triplet } from "../../../../utils/types";
import { useFrame } from "@react-three/fiber";

import { useState, useMemo, useRef } from "react";
import BouncingBuilding from "./BouncingBuilding";
import { TextureProps } from "./types";

type BouncingBuildingsProps = {
  started: boolean;
  textureProps: TextureProps[];
  debug?: boolean;
  size: number;
};

const BouncingBuildings = ({
  started,
  textureProps,
  size,
  debug = false,
}: BouncingBuildingsProps) => {
  const [buildingMovement, setBuildingMovement] = useState(0);

  const buildingParams = useMemo(() => {
    const buildingArray = [];

    if (!debug) {
      for (let index = 0; index < 120; index++) {
        const isEven = index % 2 === 0;
        const side = isEven ? -1 : 1;
        const x = (20 + Math.random() * 300) * side;
        const z = Math.random() * size - size / 2;
        const sizeFactor = 50;

        const scale =
          0.2 +
          Math.min(
            Math.random() *
              Math.sqrt(Math.abs(sizeFactor / z)) *
              Math.sqrt(Math.abs(sizeFactor / x)),
            2
          );

        buildingArray.push({
          key: `${index}-1`,
          scale: [0.5 + Math.random(), scale, 0.5 + Math.random()] as Triplet,
          position: [x, 0, -z] as Triplet,
          textureProps:
            textureProps[Math.floor(Math.random() * textureProps.length)],
        });
      }
    }
    return buildingArray;
  }, [textureProps]);

  const time = useRef(0);

  useFrame((_, delta) => {
    if (started) {
      time.current += delta;
      setBuildingMovement(Math.floor(time.current / 4) / 12);
    }
  });

  // useEffect(() => {
  //   console.log(buildingMovement);
  // }, [buildingMovement]);

  return (
    <>
      {buildingParams.map((props) => (
        <BouncingBuilding {...props} smoothMoves={buildingMovement} />
      ))}
    </>
  );
};

export default BouncingBuildings;
