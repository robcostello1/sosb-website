import { gsap, Power2 } from 'gsap';
import { forwardRef, memo, MutableRefObject, useEffect, useRef } from 'react';
import { BufferGeometry, InstancedMesh, Material, Matrix4 } from 'three';

import { MeshProps } from '@react-three/fiber';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';

import { useFlotation, UseFlotationProps } from '../useFlotation';

const InstancedItem = forwardRef<InstancedMesh, MeshProps>(
  ({ children, ...props }, ref) => {
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
        {children}
      </instancedMesh>
    );
  }
);

export type FloatingItemProps = MeshProps & {
  colliders?: RigidBodyProps["colliders"];
  delayVisibility?: number;
  flotationProps: UseFlotationProps;
};

const FloatingItem = ({
  children,
  colliders,
  delayVisibility = 0,
  flotationProps,
  position,
  visible = true,
  ...meshProps
}: FloatingItemProps) => {
  const { bodyRef } = useFlotation(flotationProps);
  const meshRef = useRef<InstancedMesh>(null);

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (!meshRef.current) {
        return;
      }
      if (visible) {
        meshRef.current.visible = true;
      }
      if (meshRef.current.visible && !visible) {
        console.log(meshRef.current.position.z);
        gsap.to(meshRef.current.position, {
          duration: 3,
          ease: Power2.easeIn,
          y: -10,
          onComplete: () => {
            if (!meshRef.current) {
              return;
            }
            meshRef.current.visible = false;
          },
        });
      }
    }, delayVisibility);

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [delayVisibility, meshRef, visible]);

  return (
    <RigidBody
      position={position}
      ref={bodyRef}
      colliders={colliders}
      includeInvisible
    >
      <InstancedItem {...meshProps} ref={meshRef} visible={false}>
        {children}
      </InstancedItem>
    </RigidBody>
  );
};

export default memo(FloatingItem);
