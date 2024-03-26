import { useEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial } from "three";

import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { REPEAT_WRAPPING } from "../../../../../utils/consts";
import { useVideoContext } from "../../Video";
import { VideoContextMaterial } from "../Screen/ScreenContents";

type ScreenSphereProps = {
  scale?: number;
};

const TILING_REPEATS = 8;

const ScreenSphere = ({ scale = 1 }: ScreenSphereProps) => {
  const videoMatRef = useRef<MeshBasicMaterial>(null);
  const sphereRef = useRef<Mesh>(null);

  const { mediaLoaded } = useVideoContext();

  useEffect(() => {
    const material = videoMatRef.current;

    if (material?.map) {
      material.map.wrapS = material.map.wrapT = REPEAT_WRAPPING;
      const ratio = 10 / 11;
      material.map.repeat.set(TILING_REPEATS, TILING_REPEATS * ratio);
    }
  }, [videoMatRef, mediaLoaded]);

  useFrame(({ clock: { elapsedTime } }) => {
    if (sphereRef.current) {
      const adjustment = scale + Math.sin(elapsedTime) * scale * 0.1;
      sphereRef.current.scale.set(adjustment, adjustment, adjustment);
      sphereRef.current.rotation.y = elapsedTime * 0.1;
      sphereRef.current.rotation.z = -0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32]}>
      <VideoContextMaterial ref={videoMatRef} />
    </Sphere>
  );
};

export default ScreenSphere;
