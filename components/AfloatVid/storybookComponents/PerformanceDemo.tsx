import { useRef } from "react";
import { Mesh } from "three";
import { Triplet } from "utils/types";

import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const PerformanceDemo = (props: { position?: Triplet }) => {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta / 2;
      ref.current.rotation.z += delta / 4;
    }
  });

  return (
    <Sphere ref={ref}>
      <meshBasicMaterial wireframe {...props} />
    </Sphere>
  );
};

export default PerformanceDemo;
