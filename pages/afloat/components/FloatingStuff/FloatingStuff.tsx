import { Suspense, useEffect, useMemo, useRef } from "react";
import { Group } from "three";
import gsap, { Linear } from "gsap";

import { useFrame } from "@react-three/fiber";
import {
  MeshCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { FloatingObjectProps } from "./FloatingObject";
import FloatingTV from "./FloatingTV";
import { Box } from "@react-three/drei";

type FloatingStuffProps = {
  from: number;
  to: number;
  duration: number;
  delay: number;
  debug?: boolean;
};

const raftSize = [];

const FloatingStuff = ({
  from,
  to,
  duration,
  delay,
  debug,
}: FloatingStuffProps) => {
  const objects = useMemo(() => {
    const objectArray = [];

    for (let index = 0; index < 100; index++) {
      const objectProps: FloatingObjectProps = {
        key: index,
        position: [
          Math.random() * 20 - 10,
          Math.random() * 5 - 2.5,
          Math.random() * 20 - 10,
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
  }, []);

  const worldRef = useRef<Group>(null);
  const raftColliderRef = useRef<RapierRigidBody>(null);
  const worldPosition = useRef(from);
  const raftPostion = useRef();

  useEffect(() => {
    if (raftColliderRef.current && worldRef.current) {
      gsap.to(worldPosition, {
        current: to,
        delay,
        duration,
        ease: Linear.easeNone,
        repeat: debug ? -1 : undefined,
      });
    }
    //   moving.current = true;
    //   gsap.to(worldRef.current.position, {
    //     z: to,
    //     delay,
    //     duration,
    //     ease: Linear.easeNone,
    //     repeat: debug ? -1 : undefined,
    //   });
    // }
  }, [to, delay, duration, debug]);

  // const time = useRef(0);
  useFrame((_, delta) => {
    if (raftColliderRef.current && worldRef.current) {
      //     time.current += delta;
      //     const fractionTravelled = duration / time.current;
      //     // (from - to) / fractionTravelled;
      //     const currentWorldPosition = from - (from - to) / fractionTravelled;
      //     // (to - from) / fractionTravelled;

      //     // console.log({ time: time.current, fractionTravelled });

      worldRef.current.position.set(0, 0, worldPosition.current);

      //     const currentRaftPosition = to - (to - from) / fractionTravelled;

      //     console.log({ currentWorldPosition, currentRaftPosition });

      raftColliderRef.current.setTranslation(
        { x: 0, y: 0, z: worldPosition.current },
        false
      );

      //     if (debug && time.current > duration) {
      //       time.current = 0;
      //     }
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
            <mesh position={[0, 0, to]}>
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
