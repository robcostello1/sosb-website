import gsap, { Linear } from 'gsap';
import { Children, memo, ReactNode, useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';

import { useFrame } from '@react-three/fiber';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';

import { weightedRandom } from '../City/utils';
import FloatingItem, { FloatingItemProps } from './FloatingItem';

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

const FloatingStuff = ({
  from,
  to,
  duration,
  delay,
  debug,
  spread = DEFAULT_SPREAD,
  numberOfItems = 100,
  children,
  visible = true,
}: FloatingStuffProps) => {
  const objects = useMemo(
    () => {
      const objectProps: (FloatingItemProps & { contents: ReactNode })[] = [];
      const childrenArray = Children.toArray(children);

      for (let index = 0; index < numberOfItems; index++) {
        const randomIndex = Math.floor(Math.random() * childrenArray.length);
        const contents = childrenArray[randomIndex];

        const depth = Math.random() * -50;
        objectProps.push({
          key: index,
          // TODO randomise the scale
          scale: 1,
          position: [
            weightedRandom(6) * spread[0] * (index % 2 === 0 ? 1 : -1),
            depth,
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
          delayVisibility: -depth * 200,
          contents,
        });
      }

      return objectProps;
    },
    // Ignore changes to children
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numberOfItems, spread]
  );

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

  const items = useMemo(
    () =>
      objects.map(({ key, contents, ...props }) => (
        <FloatingItem visible={visible} key={key} {...props}>
          {contents}
        </FloatingItem>
      )),
    [objects, visible]
  );

  return (
    <group ref={worldRef} position={[0, 0, from]}>
      <Physics debug={debug} paused={!visible}>
        {items}

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
