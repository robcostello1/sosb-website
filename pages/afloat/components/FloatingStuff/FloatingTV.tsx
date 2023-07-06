import { forwardRef, memo, MutableRefObject, useEffect } from 'react';
import { BufferGeometry, InstancedMesh, Material, Matrix4 } from 'three';

import { MeshProps } from '@react-three/fiber';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';

import ScreenContents from '../City/Screen/ScreenContents';
import { useFloatation } from './useFloatation';

const InstancedScreen = forwardRef<InstancedMesh, MeshProps>((props, ref) => {
  useEffect(() => {
    (
      ref as MutableRefObject<InstancedMesh<
        BufferGeometry,
        Material | Material[]
      > | null>
    ).current?.setMatrixAt(0, new Matrix4());
  }, [ref]);

  return (
    <instancedMesh
      {...props}
      ref={ref}
      // @ts-expect-error
      args={[null, null, 1]}
    >
      <ScreenContents
        // TODO temp
        url={"/maps/verse1.mp4"}
        boxArgs={[3, 1, 0.1]}
        videoOffset={[0, 0.2]}
        videoScale={1}
        start={true}
      />
    </instancedMesh>
  );
});

export type FloatingTVProps = MeshProps & {
  flotationProps: {
    liquidLevel: number;
    objectRadius?: number;
    liquidDamping?: number;
    bobbingAmount?: number;
    boyancyFactor?: number;
  };
  colliders?: RigidBodyProps["colliders"];
};

const FloatingTV = ({
  position,
  flotationProps,
  colliders,
  ...meshProps
}: FloatingTVProps) => {
  const { meshRef, bodyRef } = useFloatation<InstancedMesh>(flotationProps);

  return (
    <RigidBody position={position} ref={bodyRef} colliders={colliders}>
      <InstancedScreen {...meshProps} ref={meshRef} />
    </RigidBody>
  );
};

export default memo(FloatingTV);
