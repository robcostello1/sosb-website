import { Triplet } from "../../../../utils/types";
import { useTexture } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  Vector2,
  Vector3,
} from "three";
// @ts-ignore
import { LoopSubdivision } from "three-subdivide";

type BuildingProps = Omit<MeshProps, "scale"> & { scale: Triplet };

const buildingTextureMap = [
  "/maps/Sample from Apartment Textures by Boko/Apartments 1/1.",
  "/maps/Sample from Apartment Textures by Boko/Apartments 5/",
];

const Building = ({ scale, ...props }: BuildingProps) => {
  const buildingTexture = useMemo(
    () => buildingTextureMap[Math.floor(Math.random() * 2)],
    []
  );
  const finalScale = useMemo(() => new Vector3(...scale), [scale]);
  const textureProps = useTexture(
    {
      map: `${buildingTexture}Albedo.png`,
      displacementMap: `${buildingTexture}Displacement.jpg`,
      normalMap: `${buildingTexture}Normal.jpg`,
      //   roughnessMap:
      //     "/maps/Sample from Apartment Textures by Boko/Apartments 1/1.Specular.jpg",
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(finalScale.x / 30, finalScale.y / 30);
        texture.offset.set(Math.random(), Math.random());
      });
    }
  );

  const geometry = useMemo(
    () =>
      LoopSubdivision.modify(new BoxGeometry(), 4, {
        flatOnly: true,
        uvSmooth: true,
      }),
    []
  );

  const mesh = useRef<Mesh>(null);
  const elapsedTime = useRef(0);
  useFrame((_, time) => {
    elapsedTime.current += time;

    if (mesh.current) {
      const newScale = finalScale
        .clone()
        .multiplyScalar(1 + ((elapsedTime.current / 4) % (60 / 123)));
      mesh.current.scale.set(newScale.x, newScale.y, newScale.z);
      const material = mesh.current.material as MeshStandardMaterial;
      material.map?.repeat.set(newScale.x / 30, newScale.y / 30);
      material.normalMap?.repeat.set(newScale.x / 30, newScale.y / 30);
      material.displacementMap?.repeat.set(newScale.x / 30, newScale.y / 30);
    }
  });

  return (
    <mesh scale={scale} {...props} geometry={geometry} ref={mesh}>
      <meshStandardMaterial
        {...textureProps}
        displacementScale={0.02}
        normalScale={new Vector2(0.3, 0.3)}
      />
    </mesh>
  );
};

export default Building;
