import { useEffect, useRef } from 'react';
import { LinearFilter, Mesh, MeshBasicMaterial } from 'three';
import { REPEAT_WRAPPING } from 'utils/consts';

import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { useVideoContext } from '../../Video';
import { VideoContextMaterial } from '../Screen/ScreenContents';

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
      material.map.minFilter = LinearFilter;
      material.map.magFilter = LinearFilter;
      material.map.generateMipmaps = false;
      const ratio = 10 / 11;
      material.map.repeat.set(TILING_REPEATS, TILING_REPEATS * ratio);
      material.needsUpdate = true;
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
