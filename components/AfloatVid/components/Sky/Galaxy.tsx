import { forwardRef, memo, Ref, RefObject, useRef } from 'react';
import {
    BackSide, DirectionalLight, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, SphereGeometry,
    TextureLoader
} from 'three';

import { useFrame, useLoader } from '@react-three/fiber';

import { Triplet } from '../../../../utils/types';
import { getDayNight } from '../../../../utils/utils';

const MOON_LIGHT_INTENSITY = 0.4;
const INITIAL_ROTATION: Triplet = [1, -Math.PI / 2, 0];

const GALAXY_ROTATION: Triplet = [-Math.PI * 0.2, Math.PI * 1.3, 0];

type GalaxyRef = {
  castShadow?: boolean;
  timeRef: RefObject<number>;
};

const Galaxy = ({ castShadow, timeRef }: GalaxyRef) => {
  const galaxyTexture = useLoader(TextureLoader, "/maps/optimised/galaxy.jpg");
  const moonTexture = useLoader(TextureLoader, "/maps/moon.jpg");

  const groupRef = useRef<Group>(null);
  const moonRef = useRef<Mesh<SphereGeometry, MeshPhongMaterial>>(null);
  const galaxyRef = useRef<Mesh<SphereGeometry, MeshBasicMaterial>>(null);
  const lightRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    if (
      moonRef.current &&
      galaxyRef.current &&
      lightRef.current &&
      groupRef.current &&
      timeRef.current
    ) {
      const dayNightRatio = getDayNight(timeRef.current);

      moonRef.current.material.opacity = dayNightRatio;
      galaxyRef.current.material.opacity = dayNightRatio;
      lightRef.current.intensity = dayNightRatio * MOON_LIGHT_INTENSITY;

      const rotation = Math.PI * 2 * (timeRef.current / 24);
      groupRef.current.rotation.y = rotation;

      // console.log(groupRef.current.rotation.y);
    }
  });

  return (
    <group rotation={INITIAL_ROTATION}>
      <group ref={groupRef}>
        <group position={[0, 0, -500]}>
          <mesh rotation={[0, Math.PI, 0]} ref={moonRef}>
            <sphereGeometry args={[40, 25, 25]} />
            <meshPhongMaterial
              transparent
              emissive={0xffffff}
              color={0xffffff}
              map={moonTexture}
              emissiveIntensity={5}
              emissiveMap={moonTexture}
            />
          </mesh>

          <directionalLight
            intensity={MOON_LIGHT_INTENSITY}
            ref={lightRef}
            {...(castShadow
              ? {
                  castShadow: true,
                  "shadow-mapSize-height": 512,
                  "shadow-mapSize-width": 512,
                  "shadow-camera-far": 1000,
                  "shadow-camera-left": -200,
                  "shadow-camera-right": 200,
                  "shadow-camera-top": 200,
                  "shadow-camera-bottom": -200,
                }
              : {})}
          />
        </group>

        <mesh rotation={GALAXY_ROTATION} ref={galaxyRef}>
          <sphereGeometry args={[1000, 25, 25]} />
          <meshBasicMaterial
            transparent
            color={0xffffff}
            side={BackSide}
            map={galaxyTexture}
          />
        </mesh>
      </group>
    </group>
  );
};

export default memo(Galaxy);
