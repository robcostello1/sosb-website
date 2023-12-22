import gsap, { Linear } from 'gsap';
import { Children, memo, ReactNode, useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';

import { useFrame } from '@react-three/fiber';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';

import { weightedRandom } from '../City/utils';
import FloatingItem, { FloatingItemProps } from './deprecated/FloatingItem';
import FloatingItemV2 from './FloatingItems';

type FloatingStuffProps = {
  from: number;
  to: number;
  duration: number;
  delay?: number;
  debug?: boolean;
  spread?: [number, number];
  numberOfItems?: number;
  // E.g. <><boxGeometry /><meshBasicMaterial /></>
  children: ReactNode;
  visible?: boolean;
};

const DEFAULT_SPREAD: [number, number] = [100, 200];

const DEFAULT_FLOTATION_PROPS: FloatingItemProps["flotationProps"] = {
  liquidLevel: 0,
  bobbingAmount: 0.2,
  objectRadius: 1,
  boyancyFactor: 0.4,
  liquidDamping: 5,
};

const FloatingStuff = ({
  from,
  to,
  duration,
  delay,
  debug,
  // TODO
  spread = DEFAULT_SPREAD,
  numberOfItems = 100,
  children,
  visible = true,
}: FloatingStuffProps) => {
  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const worldRef = useRef<Group>(null);
  const raftColliderRef = useRef<RapierRigidBody>(null);
  const worldPosition = useRef(from);

  useEffect(() => {
    if (worldRef.current && visible) {
      gsap.to(worldPosition, {
        current: to,
        delay,
        duration,
        ease: Linear.easeNone,
        repeat: debug ? -1 : undefined,
      });
    }
  }, [from, to, delay, duration, debug, worldRef, visible]);

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

  const raftCollider = useMemo(
    () => (
      <mesh position={[0, 0, from / 2]}>
        <boxGeometry args={[4.7, 2, 5.3]} />
        <meshBasicMaterial
          transparent
          color={0xff0000}
          opacity={debug ? 1 : 0}
        />
      </mesh>
    ),
    [debug, from]
  );

  return (
    <group ref={worldRef} position={[0, 0, from]}>
      <Physics debug={debug} paused={!visible}>
        {childrenArray.map((child, index) => (
          <FloatingItemV2
            key={index}
            flotationProps={DEFAULT_FLOTATION_PROPS}
            numberOfItems={numberOfItems / childrenArray.length}
            spread={spread}
          >
            {child}
          </FloatingItemV2>
        ))}

        <RigidBody
          ref={raftColliderRef}
          linearDamping={Infinity}
          angularDamping={Infinity}
          colliders={"ball"}
        >
          {raftCollider}
        </RigidBody>
      </Physics>
    </group>
  );
};

export default memo(FloatingStuff);
