import { MeshProps } from "@react-three/fiber";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { useFloatation } from "./useFloatation";

export type FloatingObjectProps = MeshProps & {
  flotationProps: {
    liquidLevel: number;
    objectRadius?: number;
    liquidDamping?: number;
    bobbingAmount?: number;
    boyancyFactor?: number;
  };
  colliders?: RigidBodyProps["colliders"];
};

const FloatingObject = ({
  position,
  children,
  flotationProps,
  colliders,
  ...meshProps
}: FloatingObjectProps) => {
  const { meshRef, bodyRef } = useFloatation(flotationProps);

  return (
    <RigidBody position={position} ref={bodyRef} colliders={colliders}>
      <mesh ref={meshRef} {...meshProps}>
        {children}
      </mesh>
    </RigidBody>
  );
};

export default memo(FloatingObject);
