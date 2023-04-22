import { Plane } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Group } from "three";
import gsap, { Quad, Power2, Power1 } from "gsap";

import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import FloatingObject, { FloatingObjectProps } from "./FloatingObject";

type FloatingStuffProps = {
  from: number;
  to: number;
  duration: number;
  delay: number;
  debug?: boolean;
};

const FloatingStuff = ({
  from,
  to,
  duration,
  delay,
  debug,
}: FloatingStuffProps) => {
  const objects = useMemo(() => {
    const objectArray = [];
    const material = <meshStandardMaterial roughness={0} />;

    for (let index = 0; index < 100; index++) {
      const radius = Math.random() * 3;

      const objectProps: FloatingObjectProps = {
        key: index,
        position: [
          Math.random() * 100 - 50,
          Math.random() * 20 - 10,
          Math.random() * 100 - 50,
        ],
        liquidLevel: 0,
        bobbingAmount: 0.2,
        objectRadius: radius,
        boyancyFactor: 0.55,
        liquidDamping: 5,
      };

      // TODO replace with instanced meshes
      if (Math.random() * 3 < 1) {
        objectArray.push(
          <FloatingObject {...objectProps} colliders="ball">
            <sphereGeometry args={[radius]} />
            {material}
          </FloatingObject>
        );
      } else {
        objectArray.push(
          <FloatingObject {...objectProps}>
            <boxGeometry args={[radius, radius, radius]} />
            {material}
          </FloatingObject>
        );
      }
    }

    return objectArray;
  }, []);

  const worldRef = useRef<Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;

    if (worldRef.current) {
      gsap.to(worldRef.current.position, {
        z: to,
        delay,
        duration,
        repeat: debug ? 0 : undefined,
      });
    }
  });

  return (
    <Suspense>
      <group ref={worldRef} position={[0, 0, from]}>
        <Physics debug>
          <group>{objects}</group>

          <RigidBody
            args={[10, 2, 7]}
            linearDamping={Infinity}
            angularDamping={Infinity}
          />
        </Physics>
      </group>
    </Suspense>
  );
};

export default FloatingStuff;
