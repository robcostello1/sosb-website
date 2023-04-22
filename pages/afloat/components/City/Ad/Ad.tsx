import { Triplet } from "../../../../../utils/types";
import { useVideoTexture } from "@react-three/drei";

import { forwardRef, Suspense, useEffect, useRef } from "react";
import { MeshBasicMaterial, RepeatWrapping, Vector2 } from "three";
import { MeshProps } from "@react-three/fiber";

type AdProps = Pick<MeshProps, "position"> & {
  aspectRatio?: number;
  boxArgs: Triplet;
  start: boolean;
  url: string;
  videoOffset?: [number, number];
  videoScale?: number;
};

const Ad = ({
  start = true,
  url,
  boxArgs,
  aspectRatio = 1920 / 1080,
  videoOffset = [0, 0],
  videoScale = 1,
  ...props
}: AdProps) => {
  const videoMatRef = useRef<MeshBasicMaterial>(null);

  useEffect(() => {
    if (videoMatRef.current) {
      const material = videoMatRef.current;

      if (material.map) {
        material.map.offset = new Vector2(...videoOffset);
        const boxAspectRatio = aspectRatio / (boxArgs[0] / boxArgs[1]);
        material.map.wrapS = material.map.wrapT = RepeatWrapping;
        material.map.repeat = new Vector2(
          1 / videoScale,
          (1 / videoScale) * boxAspectRatio
        );
      }
    }
  }, [videoMatRef, videoOffset, aspectRatio, videoScale, boxArgs]);

  return (
    <mesh {...props}>
      <boxGeometry args={boxArgs} />
      <meshStandardMaterial attach="material-0" color={0x000000} />
      <meshStandardMaterial attach="material-1" color={0x000000} />
      <meshStandardMaterial attach="material-2" color={0x000000} />
      <meshStandardMaterial attach="material-3" color={0x000000} />
      <Suspense
        fallback={
          <meshStandardMaterial
            attach="material-4"
            color={0x000000}
            roughness={0}
          />
        }
      >
        <VideoMaterial
          attach="material-4"
          url={url}
          start={start}
          ref={videoMatRef}
        />
      </Suspense>
      <meshStandardMaterial attach="material-5" color={0x000000} />
      <meshStandardMaterial attach="material-6" color={0x000000} />
    </mesh>
  );
};

type VideoMaterialProps = { url: string; attach: string; start: boolean };

const VideoMaterial = forwardRef<MeshBasicMaterial, VideoMaterialProps>(
  ({ url, attach, start }, ref) => {
    const texture = useVideoTexture(url, {
      start,
    });
    return (
      <meshBasicMaterial
        attach={attach}
        map={texture}
        toneMapped={false}
        ref={ref}
      />
    );
  }
);

export default Ad;
