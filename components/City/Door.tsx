import { Color, GroupProps } from "@react-three/fiber";

const DOOR_WIDTH = 0.2;
const DOOR_HEIGHT = 0.3;
const DOOR_DEPTH = 0.02;
const FRAME_WIDTH = 0.01;
const STEP_HEIGHT = 0.03;
const STEP_DEPTH = 0.08;

const Door = ({ windowMaterialColor, ...props }: GroupProps & { windowMaterialColor: Color | false }) => {
  const items = <>
    <boxGeometry />
    <meshStandardMaterial color={0x444444} roughness={1} metalness={0} />
  </>

  return (
    <group {...props}>
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

      <mesh
        scale={[DOOR_DEPTH, DOOR_HEIGHT, DOOR_WIDTH]}
        position={[-DOOR_DEPTH / 2 + 0.01, STEP_HEIGHT / 2 + DOOR_HEIGHT / 2, 0]}
      >
        <boxGeometry />
        <meshBasicMaterial color={windowMaterialColor || 'black'} />
      </mesh>
    </group>
  );
};

export default Door;