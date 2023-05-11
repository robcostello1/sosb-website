import { Triplet } from "../../../../../utils/types";
import { useVideoTexture } from "@react-three/drei";

import { forwardRef, Suspense, useEffect, useRef, memo } from "react";
import { MeshBasicMaterial, RepeatWrapping, Vector2 } from "three";
import { MeshProps } from "@react-three/fiber";
import ScreenContents from "./ScreenContents";

export type ScreenProps = Pick<MeshProps, "position"> & {
  aspectRatio?: number;
  boxArgs: Triplet;
  start: boolean;
  url: string;
  videoOffset?: [number, number];
  videoScale?: number;
};

const Screen = ({
  start = true,
  url,
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
        url={url}
        boxArgs={boxArgs}
        aspectRatio={aspectRatio}
        videoOffset={videoOffset}
        videoScale={videoScale}
      />
    </mesh>
  );
};

export default memo(Screen);
