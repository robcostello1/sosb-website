import { MeshProps, useFrame } from "@react-three/fiber";
import {
  vec3,
  RigidBody,
  RapierRigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { useRef } from "react";
import { Mesh } from "three";

export type FloatingObjectProps = MeshProps & {
  liquidLevel: number;
  objectRadius?: number;
  liquidDamping?: number;
  bobbingAmount?: number;
  boyancyFactor?: number;
  colliders?: RigidBodyProps["colliders"];
};

const FloatingObject = ({
  liquidLevel,
  position,
  children,
  objectRadius = 1,
  liquidDamping = 5,
  bobbingAmount = 0.1,
  boyancyFactor = 0.13,
  colliders,
  ...meshProps
}: FloatingObjectProps) => {
  const sphereRef = useRef<Mesh>(null);
  const bodyRef = useRef<RapierRigidBody>(null);

  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;

    if (sphereRef.current && bodyRef.current) {
      const body = bodyRef.current;

      const position = vec3(body.translation());
      const mass = body.mass();

      const top = position.y + objectRadius;
      const bottom = position.y - objectRadius;

      if (bottom >= 0) {
        body.setLinearDamping(0);
        body.setAngularDamping(0);
        return;
      }

      body.setLinearDamping(liquidDamping);
      body.setAngularDamping(liquidDamping / 5);

      let forceAmount = 0;

      if (top <= 0) {
        forceAmount = 1;
      } else {
        forceAmount = 1 - top / (objectRadius * 2);
      }

      const boyancy = mass * boyancyFactor;

      // Add bobbing
      body.applyImpulse(
        {
          x: 0,
          y:
            Math.sin(time.current * 3 + Math.random() * 9) *
            bobbingAmount *
            boyancy,
          z: 0,
        },
        true
      );

      // Add boyancy
      body.applyImpulse({ x: 0, y: forceAmount * boyancy, z: 0 }, true);
    }
  });

  return (
    <RigidBody position={position} ref={bodyRef} colliders={colliders}>
      <mesh ref={sphereRef} {...meshProps}>
        {children}
      </mesh>
    </RigidBody>
  );
};

export default FloatingObject;
