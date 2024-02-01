import { memo, useEffect } from 'react';

import { useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import Sphere from './PhysicsPrimitives/Sphere';

const getRand = (size: number) => (Math.random() - 0.5) * size;
const factor = 40;

const Gravity = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1, 20);
  }, [camera]);

  return (
    <>
      <directionalLight position={[10, 5, 3]} />

      <Physics gravity={[0, 0, 0]}>
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
        <Sphere
          position={[getRand(factor), getRand(factor), getRand(factor)]}
          attractionPoint={[0, 0, 0]}
        />
      </Physics>
    </>
  );
};

export default memo(Gravity);
