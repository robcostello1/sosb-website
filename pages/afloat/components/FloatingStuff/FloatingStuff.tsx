import { Suspense, useEffect, useMemo, useRef } from "react";
import { Group } from "three";
import gsap, { Linear } from "gsap";

import { useFrame } from "@react-three/fiber";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { FloatingObjectProps } from "./FloatingObject";
import FloatingTV from "./FloatingTV";

type FloatingStuffProps = {
  from: number;
  to: number;
  duration: number;
  delay: number;
  debug?: boolean;
  spread?: [number, number];
  numberOfItems?: number;
  typesOfItems?: "tv"[];
};

const FloatingStuff = ({
  from,
  to,
  duration,
  delay,
  debug,
  spread = [100, 200],
  numberOfItems = 100,
  typesOfItems = ["tv"],
}: FloatingStuffProps) => {
  const objects = useMemo(() => {
    const objectArray = [];

    for (let index = 0; index < numberOfItems; index++) {
      const objectProps: FloatingObjectProps = {
        key: index,
        position: [
          Math.random() * spread[0] - spread[0] / 2,
          Math.random() * 5 - 2.5,
          Math.random() * spread[1] - spread[1] / 2,
        ],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        flotationProps: {
          liquidLevel: 0,
          bobbingAmount: 0.2,
          objectRadius: 1,
          boyancyFactor: 0.4,
          liquidDamping: 5,
        },
      };

      objectArray.push(<FloatingTV {...objectProps} />);
    }

    return objectArray;
  }, [numberOfItems]);

  const worldRef = useRef<Group>(null);
  const raftColliderRef = useRef<RapierRigidBody>(null);
  const worldPosition = useRef(from);

  useEffect(() => {
    if (worldRef.current) {
      gsap.to(worldPosition, {
        from,
        current: to,
        delay,
        duration,
        ease: Linear.easeNone,
        repeat: debug ? -1 : undefined,
      });
    }
  }, [from, to, delay, duration, debug, worldRef]);

  useFrame(() => {
    if (raftColliderRef.current && worldRef.current) {
      worldRef.current.position.set(0, 0, worldPosition.current);

      raftColliderRef.current.setTranslation(
        {
          x: 0,
          y: 0,
          z: worldPosition.current * -1 + from / 2,
        },
        false
      );
    }
  });

  return (
    <Suspense>
      <group ref={worldRef} position={[0, 0, from]}>
        <Physics debug={debug}>
          {objects}

          <RigidBody
            ref={raftColliderRef}
            linearDamping={Infinity}
            angularDamping={Infinity}
            colliders={"ball"}
          >
            <mesh position={[0, 0, from / 2]}>
              <boxGeometry args={[3, 2, 3]} />
              <meshBasicMaterial
                transparent
                color={0xff0000}
                opacity={debug ? 1 : 0}
              />
            </mesh>
          </RigidBody>
        </Physics>
      </group>
    </Suspense>
  );
};

export default FloatingStuff;
