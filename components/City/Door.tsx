import gsap, { Power2 } from 'gsap';
import { Color, GroupProps } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

const DOOR_WIDTH = 0.2;
const DOOR_HEIGHT = 0.3;
const DOOR_DEPTH = 0.02;
const FRAME_WIDTH = 0.01;
const STEP_HEIGHT = 0.03;
const STEP_DEPTH = 0.08;

type DoorProps = GroupProps & {
  windowMaterialColor: Color | false;
  emissiveIntensity: number;
  open: boolean;
  onClickInside: () => void;
}

const Door = ({
  windowMaterialColor,
  emissiveIntensity,
  open,
  onClickInside,
  ...props
}: DoorProps) => {
  const items = <>
    <boxGeometry />
    <meshStandardMaterial color={0x444444} roughness={1} metalness={0} />
  </>

  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current && open) {
      gsap.to(groupRef.current.rotation, {
        duration: 1,
        ease: Power2.easeInOut,
        y: open ? 0.6 : 0,
      });
    }
  }, [groupRef, open]);

  return (
    <group
      {...props}
    >
      <mesh
        scale={[DOOR_DEPTH, FRAME_WIDTH, DOOR_WIDTH + FRAME_WIDTH * 2]}
        position={[-DOOR_DEPTH / 2, STEP_HEIGHT / 2 + DOOR_HEIGHT + FRAME_WIDTH / 2, 0]}
      >
        {items}
      </mesh>

      <mesh
        scale={[DOOR_DEPTH, DOOR_HEIGHT, FRAME_WIDTH]}
        position={[-DOOR_DEPTH / 2, STEP_HEIGHT / 2 + DOOR_HEIGHT / 2, DOOR_WIDTH / 2 + FRAME_WIDTH / 2]}
      >
        {items}
      </mesh>

      <mesh
        scale={[DOOR_DEPTH, DOOR_HEIGHT, FRAME_WIDTH]}
        position={[-DOOR_DEPTH / 2, STEP_HEIGHT / 2 + DOOR_HEIGHT / 2, -(DOOR_WIDTH / 2 + FRAME_WIDTH / 2)]}
      >
        {items}
      </mesh>

      <mesh
        scale={[STEP_DEPTH, STEP_HEIGHT, DOOR_WIDTH + FRAME_WIDTH * 2]}
        position={[-STEP_DEPTH / 2, STEP_HEIGHT / 2, 0]}
      >
        {items}
      </mesh>

      <group
        ref={groupRef}
        position={[-DOOR_DEPTH / 2, STEP_HEIGHT / 2 + DOOR_HEIGHT / 2, DOOR_WIDTH / 2]}
      >
        <mesh
          position={[0, 0, -DOOR_WIDTH / 2]}
          scale={[0.01, DOOR_HEIGHT - 0.005, DOOR_WIDTH - 0.01]}
        >
          {items}
        </mesh>
        {/* <Cylinder args={[DOOR_WIDTH, DOOR_WIDTH, DOOR_HEIGHT]} /> */}
      </group>

      <mesh
        scale={[DOOR_DEPTH, DOOR_HEIGHT, DOOR_WIDTH]}
        position={[-DOOR_DEPTH / 2 + 0.01, STEP_HEIGHT / 2 + DOOR_HEIGHT / 2, 0]}
        onClick={open ? onClickInside : undefined}
      >
        <boxGeometry />
        <meshPhongMaterial
          color={windowMaterialColor || 'black'}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
};

export default Door;