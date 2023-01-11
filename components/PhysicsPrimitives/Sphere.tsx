import { useSphere, SphereProps, Triplet } from "@react-three/cannon";
import { Trail } from "@react-three/drei";

import { useEffect } from "react";
import { Mesh, BufferGeometry, Vector3 } from "three";
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
  }, [api]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshStandardMaterial
      // emissive={"white"}
      />
    </mesh>
  );
};

export default Sphere;
