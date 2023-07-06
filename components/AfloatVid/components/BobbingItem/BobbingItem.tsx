import { useFrame } from "@react-three/fiber";
import { ReactNode, useRef, memo } from "react";
import { Group } from "three";

type BobbingItemProps = { children: ReactNode };

const BobbingItem = ({ children }: BobbingItemProps) => {
  const groupRef = useRef<Group>(null);

  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time.current) * 0.008;
      groupRef.current.rotation.x = Math.sin(time.current * 0.9) * 0.01;
      groupRef.current.rotation.z = Math.sin(time.current * 0.7) * 0.006;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default memo(BobbingItem);
