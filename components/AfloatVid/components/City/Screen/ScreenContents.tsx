import { forwardRef, memo, Suspense, useEffect, useMemo, useRef } from "react";
import { MeshBasicMaterial, Vector2, VideoTexture } from "three";
import { REPEAT_WRAPPING } from "utils/consts";
import { Triplet } from "utils/types";

import { useVideoTexture } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

import { useVideoContext } from "../../Video";

type ScreenContentsProps = Pick<MeshProps, "position"> & {
  aspectRatio?: number;
  boxArgs: Triplet;
  start: boolean;
  videoOffset?: [number, number];
  videoScale?: number;
  url?: string;
};

const ScreenContents = ({
  start = true,
  boxArgs,
  aspectRatio = 1.5,
  videoOffset = [0, 0],
  videoScale = 1,
  url,
}: ScreenContentsProps) => {
  const videoMatRef = useRef<MeshBasicMaterial>(null);

  useEffect(() => {
    if (videoMatRef.current) {
      const material = videoMatRef.current;

      if (material.map) {
        material.map.offset = new Vector2(...videoOffset);
        const boxAspectRatio = aspectRatio / (boxArgs[0] / boxArgs[1]);
        material.map.wrapS = material.map.wrapT = REPEAT_WRAPPING;
        material.map.repeat = new Vector2(
          1 / videoScale,
          (1 / videoScale) * boxAspectRatio
        );
      }
    }
  }, [videoMatRef, videoOffset, aspectRatio, videoScale, boxArgs]);

  return (
    <>
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
        {url ? (
          <VideoMaterial
            attach="material-4"
            url={url}
            start={start}
            ref={videoMatRef}
          />
        ) : (
          <VideoContextMaterial
            attach="material-4"
            start={start}
            ref={videoMatRef}
          />
        )}
      </Suspense>
      <meshStandardMaterial attach="material-5" color={0x000000} />
      {/* // TODO - probably don't need 6 */}
      <meshStandardMaterial attach="material-6" color={0x000000} />
    </>
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

type VideoContextMaterialProps = {
  attach?: string;
  // TODO: not used
  start?: boolean;
};

export const VideoContextMaterial = forwardRef<
  MeshBasicMaterial,
  VideoContextMaterialProps
>(({ attach, start }, ref) => {
  const { mediaRef, mediaLoaded } = useVideoContext();

  const texture = useMemo(
    () =>
      mediaRef.current && mediaLoaded
        ? new VideoTexture(mediaRef.current)
        : undefined,
    [mediaRef, mediaLoaded]
  );

  return texture ? (
    <meshBasicMaterial
      map={texture}
      attach={attach}
      toneMapped={false}
      ref={ref}
    />
  ) : null;
});

export default memo(ScreenContents);
