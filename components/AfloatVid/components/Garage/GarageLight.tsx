import { memo, useEffect, useRef } from 'react';
import { SpotLight as ThreeSpotLight } from 'three';

import { SpotLight } from '@react-three/drei';

import { Triplet } from '../../../../utils/types';

const GarageLight = ({ position }: { position: Triplet }) => {
  const light = useRef<ThreeSpotLight>(null);

  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(
        position[0],
        0,
        // TODO temp
        position[2] + 2
      );
    }
  }, [light, position]);

  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.5, 0.25, 32]} />
        <meshBasicMaterial attach="material-1" color={0x002200} />
        <meshStandardMaterial
          attach="material-2"
          color={0xffffaa}
          emissive={0xffffaa}
        />
      </mesh>
      <SpotLight
        ref={light}
        color={0xffffaa}
        attenuation={4}
        anglePower={4}
        radiusTop={0.3}
        penumbra={1}
        distance={6}
        angle={Math.PI * 0.7}
        volumetric
        map={undefined}
        getObjectsByProperty={undefined}
      />
    </group>
  );
};
export default memo(GarageLight);
