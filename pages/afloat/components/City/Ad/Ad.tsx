import { Triplet } from "../../../../../utils/types";
import { useVideoTexture } from "@react-three/drei";

import { Suspense } from "react";
import { BoxGeometry } from "three";

type AdProps = {
  url: string;
  boxArgs: Triplet;
};

const Ad = ({}) => {
  const videoAspectRatio = 1920 / 1080;
  return (
    <mesh>
      <boxGeometry />
      <Suspense
        fallback={
          <meshStandardMaterial
            attach="material-4"
            color={0x000000}
            roughness={0}
          />
        }
      >
        <meshStandardMaterial attach="material-0" color={0x000000} />
        <meshStandardMaterial attach="material-1" color={0x000000} />
        <meshStandardMaterial attach="material-2" color={0x000000} />
        <meshStandardMaterial attach="material-3" color={0x000000} />
        <VideoMaterial attach="material-4" url="/maps/verse1.mp4" />
        <meshStandardMaterial attach="material-5" color={0x000000} />
        <meshStandardMaterial attach="material-6" color={0x000000} />
      </Suspense>
    </mesh>
  );
};

const VideoMaterial = ({ url, attach }: { url: string; attach: string }) => {
  const texture = useVideoTexture(url, {
    start: false,
  });
  return <meshBasicMaterial attach={attach} map={texture} toneMapped={false} />;
};

export default Ad;
