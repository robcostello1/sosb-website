import { memo, useEffect, useRef } from 'react';
import { SpotLight as ThreeSpotLight } from 'three';

import { Cylinder, SpotLight } from '@react-three/drei';

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
      <Cylinder position={[0, 1.4, 0]} args={[0.1, 0.1, 0.05]}>
        <meshBasicMaterial color={0x002200} />
      </Cylinder>

      <Cylinder position={[0, 1.25, 0]} args={[0.01, 0.01, 0.3]}>
        <meshBasicMaterial color={0x002200} />
      </Cylinder>

      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.5, 0.25, 32]} />
        <meshBasicMaterial attach="material-0" color={0x002200} />
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
      />
    </group>
  );
};
export default memo(GarageLight);
