import { memo } from "react";

import { MeshProps } from "@react-three/fiber";

import { Triplet } from "../../../../../utils/types";
import ScreenContents from "./ScreenContents";

export type ScreenProps = Pick<MeshProps, "position" | "rotation"> & {
  aspectRatio?: number;
  boxArgs: Triplet;
  start: boolean;
  videoOffset?: [number, number];
  videoScale?: number;
};

const Screen = ({
  start = true,
  boxArgs,
  aspectRatio = 1920 / 1080,
  videoOffset = [0, 0],
  videoScale = 1,
  ...props
}: ScreenProps) => {
  return (
    <mesh {...props}>
      <ScreenContents
        start={start}
        boxArgs={boxArgs}
        aspectRatio={aspectRatio}
        videoOffset={videoOffset}
        videoScale={videoScale}
      />
    </mesh>
  );
};

export default memo(Screen);
