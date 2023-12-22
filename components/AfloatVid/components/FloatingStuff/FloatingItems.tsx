import { ReactNode, useMemo } from 'react';

import { InstancedRigidBodies, InstancedRigidBodyProps } from '@react-three/rapier';

import { weightedRandom } from '../City/utils';
import { useFlotationArray, UseFlotationArrayProps } from './useFlotationArray';

type FloatingItemsProps = {
  numberOfItems: number;
  spread: [number, number];
  children: ReactNode;
  flotationProps: UseFlotationArrayProps;
};

const FloatingItems = ({
  numberOfItems,
  children,
  flotationProps,
  spread,
}: FloatingItemsProps) => {
  const { bodyRef } = useFlotationArray(flotationProps);

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for (let i = 0; i < numberOfItems; i++) {
      const depth = Math.random() * -50;

      instances.push({
        key: "instance_" + Math.random(),
        position: [
          weightedRandom(6) * spread[0] * (i % 2 === 0 ? 1 : -1),
          depth,
          Math.random() * spread[1] - spread[1] / 2,
        ],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
      });
    }

    return instances;
  }, [numberOfItems, spread]);

  return (
    <InstancedRigidBodies instances={instances} ref={bodyRef}>
      <instancedMesh
        args={[undefined, undefined, numberOfItems]}
        count={numberOfItems}
      >
        {children}
      </instancedMesh>
    </InstancedRigidBodies>
  );
};

export default FloatingItems;
