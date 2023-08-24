import gsap, { Linear } from "gsap";
import { memo, ReactElement, useEffect, useMemo, useRef } from "react";
import { Group } from "three";

import { useFrame } from "@react-three/fiber";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";

import { weightedRandom } from "../City/utils";
import { FloatingObjectProps } from "./FloatingObject";
import FloatingTV from "./FloatingTV";

type FloatingStuffProps = {
  from: number;
  to: number;
  duration: number;
  delay?: number;
  debug?: boolean;
  spread?: [number, number];
  numberOfItems?: number;
  typesOfItems?: "tv"[];
  visible?: boolean;
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
  visible = true,
}: FloatingStuffProps) => {
  const objects = useMemo(() => {
    const objectArray: ReactElement[] = [];

    for (let index = 0; index < numberOfItems; index++) {
      const objectProps: FloatingObjectProps = {
        key: index,
        position: [
          weightedRandom(6) * spread[0] * (index % 2 === 0 ? 1 : -1),
          Math.random() * -50,
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
  }, [numberOfItems, spread]);

  const worldRef = useRef<Group>(null);
  const raftColliderRef = useRef<RapierRigidBody>(null);
  const worldPosition = useRef(from);

  useEffect(() => {
    if (worldRef.current && visible) {
      gsap.to(worldPosition, {
        from,
        current: to,
        delay,
        duration,
        ease: Linear.easeNone,
        repeat: debug ? -1 : undefined,
      });
    }
  }, [from, to, delay, duration, debug, worldRef, visible]);

  useFrame(() => {
    if (raftColliderRef.current && worldRef.current && visible) {
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
    <group ref={worldRef} position={[0, 0, from]} visible={visible}>
      <Physics debug={debug} paused={!visible}>
        {objects}

        <RigidBody
          ref={raftColliderRef}
          linearDamping={Infinity}
          angularDamping={Infinity}
          colliders={"ball"}
        >
          <mesh position={[0, 0, from / 2]}>
            <boxGeometry args={[4.7, 2, 5.3]} />
            <meshBasicMaterial
              transparent
              color={0xff0000}
              opacity={debug ? 1 : 0}
            />
          </mesh>
        </RigidBody>
      </Physics>
    </group>
  );
};

export default memo(FloatingStuff);
