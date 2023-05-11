import { usememo } from "react";
import { VectorProp } from "../../consts";
import BuildingStory, { BuildingStoryProps } from "./BuildingStory";

type TowerBlockProps = Omit<
  BuildingStoryProps,
  "wallWindowMatrix" | "scale" | "position"
> & {
  wallWindowMatrix?: BuildingStoryProps["wallWindowMatrix"];
  scale?: [number, number, number];
  position?: [number, number, number];
  stories: number;
};

const TowerBlock = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  stories,
  wallWindowMatrix = [1, 1, 0.1],
  ...storyProps
}: TowerBlockProps) => {
  const storyBasePositions = useMemo(() => {
    const positions: VectorProp[] = [];

    for (let num = 0; num < stories; num++) {
      const [_0, yScale, _1] = scale;
      const [x, y, z] = position;
      positions.push([x, num * yScale + y, z]);
    }
    return positions;
  }, [stories, scale, position]);

  return (
    <>
      {storyBasePositions?.map((position, index) => (
        <BuildingStory
          key={index}
          wallWindowMatrix={wallWindowMatrix}
          scale={scale}
          position={position}
          {...storyProps}
        />
      ))}
    </>
  );
};

export default memo(TowerBlock);
