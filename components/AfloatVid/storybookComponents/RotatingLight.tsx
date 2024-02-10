import { useRef } from 'react';
import { Group } from 'three';

import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const RotatingLight = () => {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta / 2;
    }
  });

  return (
    <group ref={ref}>
      <Sphere args={[3]} position={[80, 30, 0]} />
      <directionalLight
        position={[50, 3, 0]}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-camera-far={1000}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
    </group>
  );
};

export default RotatingLight;
