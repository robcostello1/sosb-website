import { useTexture, MeshReflectorMaterial } from "@react-three/drei";
import { memo } from "react";
import { RepeatWrapping } from "three";

type RoadProps = { width: number; depth: number };

const Road = ({ width, depth }: RoadProps) => {
  const textureProps = useTexture(
    {
      alphaMap: "/maps/decals_0006_alpha3_1k.jpg",
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(2, 2);
      });
    }
  );

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
      <mesh
        position={[0, 0, 0.009]}
        rotation={[0, 0, -Math.PI]}
        scale={[width, depth, 1]}
      >
        <planeGeometry />
        <MeshReflectorMaterial
          mixStrength={0.5} // Strength of the reflections
          mixContrast={0.96} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1}
        />
      </mesh>

      <mesh
        position={[0, 0, 0.01]}
        rotation={[0, 0, -Math.PI]}
        scale={[width, depth, 1]}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial
          color="#333333"
          metalness={0}
          roughness={1}
          transparent
          {...textureProps}
        />
      </mesh>
    </group>
  );
};

export default memo(Road);
