import { memo, useCallback, useEffect } from "react";
import { RepeatWrapping } from "three";

import { Box, Torus } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { Triplet } from "../../../../utils/types";
import { useTexture } from "../../hooks/useTexture";
import Barrel from "./Barrel";
import Plank from "./Plank";

export type RaftProps = {
  setCamera?: boolean;
};

const PLANK_SETTINGS: [number, number][] = [
  [-0.63, 3],
  [-0.41, 1],
  [-0.3, 1],
  [0.03, 5],
  [0.36, 1],
  [0.47, 1],
  [0.58, 1],
  [0.69, 1],
  [0.8, 1],
];

const BARREL_X_OFFSET = 1.1;
const BARREL_Y_OFFSET = 1.08;
const BARREL_SETTINGS: { position: Triplet; rotation: Triplet }[] = [
  {
    position: [BARREL_X_OFFSET, 0, BARREL_Y_OFFSET],
    rotation: [0, 0, Math.random() * Math.PI * 2],
  },
  {
    position: [BARREL_X_OFFSET, 0, 0],
    rotation: [0, 0, Math.random() * Math.PI * 2],
  },
  {
    position: [BARREL_X_OFFSET, 0, -BARREL_Y_OFFSET],
    rotation: [0, 0, Math.random() * Math.PI * 2],
  },
  {
    position: [-BARREL_X_OFFSET, 0, BARREL_Y_OFFSET],
    rotation: [0, 0, Math.random() * Math.PI * 2],
  },
  {
    position: [-BARREL_X_OFFSET, 0, 0],
    rotation: [0, 0, Math.random() * Math.PI * 2],
  },
  {
    position: [-BARREL_X_OFFSET, 0, -BARREL_Y_OFFSET],
    rotation: [0, 0, Math.random() * Math.PI * 2],
  },
];
const PLANK_ROTATION_Z = 0.2;
const PLANK_LENGTH_RANDOMNESS = 0.2;

const Raft = ({ setCamera = true }: RaftProps) => {
  const { camera } = useThree();

  useEffect(() => {
    if (setCamera) {
      // TODO move the camera
      camera.position.set(0, 2, 0);
    }
  }, [setCamera, camera.position]);

  return <RaftContent />;
};

export const RaftContent = memo(() => {
  const plankTexture = useTexture(
    {
      map: "/maps/optimised/wood_planks_grey_diff_1k.jpg",
      normalMap: "/maps/optimised/wood_planks_grey_nor_dx_1k.jpg",
      roughnessMap: "/maps/optimised/wood_planks_grey_water_rough_1k.jpg",
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
      });
    }
  );

  const ropeTexture = useTexture(
    {
      map: "/maps/optimised/Rope_001_basecolor.jpg",
      normalMap: "/maps/optimised/Rope_001_normal.jpg",
      roughnessMap: "/maps/optimised/Rope_001_roughness.jpg",
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.rotation = Math.PI / 2;
        texture.repeat.set(1, 64);
      });
    }
  );

  const renderPlank = useCallback(
    ([pos, width]: [number, number], index: number) => (
      <Plank
        textures={plankTexture}
        key={index}
        rotation={[
          0,
          0,
          Math.random() * PLANK_ROTATION_Z - PLANK_ROTATION_Z / 2,
        ]}
        length={
          3 +
          3 *
            (Math.random() * PLANK_LENGTH_RANDOMNESS -
              PLANK_LENGTH_RANDOMNESS / 2)
        }
        width={width}
        position={[
          pos,
          0.2,
          Math.random() * PLANK_LENGTH_RANDOMNESS - PLANK_LENGTH_RANDOMNESS / 2,
        ]}
        offsetX={Math.random() * 5}
        offsetY={Math.random() * 5}
      />
    ),
    [plankTexture]
  );

  return (
    <group scale={1.8}>
      {PLANK_SETTINGS.map(renderPlank)}
      <Box args={[1.5, 0.01, 0.3]} position={[0, 0.15, 1]}>
        <meshBasicMaterial color={0x000000} />
      </Box>
      <Box args={[1.5, 0.01, 0.4]} position={[0, 0.15, 0]}>
        <meshBasicMaterial color={0x000000} />
      </Box>
      <Box args={[1.5, 0.01, 0.2]} position={[0, 0.15, -1]}>
        <meshBasicMaterial color={0x000000} />
      </Box>
      {BARREL_SETTINGS.map(({ position, ...barrel }, index) => (
        <group position={position} key={index}>
          {[0, 1, 2].map((id) => (
            <Torus
              key={id}
              args={[0.3, 0.013, 128, 128]}
              position={[0, 0, 0.4 * Math.random() - 0.2]}
            >
              <meshStandardMaterial {...ropeTexture} />
            </Torus>
          ))}
          <Barrel {...barrel} key={index} />
        </group>
      ))}
    </group>
  );
});

export default memo(Raft);
