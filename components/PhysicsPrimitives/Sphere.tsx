import { memo, useEffect } from 'react';
import { BufferGeometry, Mesh, Vector3 } from 'three';

import { SphereProps, Triplet, useSphere } from '@react-three/cannon';
import { Trail } from '@react-three/drei';

const factor = 0.1;

const Sphere = ({
  args,
  attractionPoint,
  ...props
}: SphereProps & { attractionPoint: Triplet }) => {
  const [ref, api] = useSphere<Mesh<BufferGeometry>>(() => ({
    mass: 0.1,
    args,
    ...props,
  }));

  useEffect(() => {
    api.applyImpulse([Math.random(), Math.random(), Math.random()], [0, 0, 0]);
    api.position.subscribe((currentPos) => {
      const distance = new Vector3(...currentPos).distanceTo(
        new Vector3(...attractionPoint)
      );

      api.applyImpulse(
        new Vector3()
          .copy(new Vector3(...currentPos))
          .multiplyScalar((-1 / distance) * factor)
          .toArray(),
        [0, 0, 0]
      );
    });
  }, [api, attractionPoint]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshStandardMaterial
      // emissive={"white"}
      />
    </mesh>
  );
};

export default memo(Sphere);
