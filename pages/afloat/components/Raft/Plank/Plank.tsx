import { useTexture } from "@react-three/drei";
import {
  BoxGeometryProps,
  MeshProps,
  MeshStandardMaterialProps,
} from "@react-three/fiber";
import { clone } from "lodash";
import { useMemo, useRef, memo } from "react";
import {
  BoxGeometry,
  Material,
  Mesh,
  MeshStandardMaterial,
  MirroredRepeatWrapping,
  ObjectSpaceNormalMap,
  RepeatWrapping,
  Vector2,
} from "three";
import { TextureProps } from "../../City/types";

type PlankProps = Pick<MeshProps, "position" | "rotation"> & {
  length: number;
  width: number;
  offsetX: number;
  offsetY: number;
  textures: MeshStandardMaterialProps;
};

const Plank = ({
  length,
  width,
  offsetX,
  offsetY,
  textures,
  ...props
}: PlankProps) => {
  const meshRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  const clonedTextures = useMemo(() => {
    return Object.entries(textures).reduce<TextureProps>(
      (acc, [key, value]) => {
        const clonedTexture = value.clone();

        clonedTexture.repeat.set(Math.ceil(width) * 0.2 - 0.01, 1 * length);
        // TODO
        clonedTexture.offset.set(0.005 + Math.floor(offsetX), offsetY);
        // TODO needs to be expressly set here
        clonedTexture.wrapS = RepeatWrapping;
        clonedTexture.wrapT = RepeatWrapping;

        acc[key as keyof TextureProps] = clonedTexture;
        return acc;
      },
      {} as TextureProps
    );
  }, [textures, width, length, offsetX, offsetY]);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[0.1 * width, 0.03, length]} />
      <meshStandardMaterial
        {...clonedTextures}
        // normalMapType={ObjectSpaceNormalMap}
        normalScale={new Vector2(0.3, 0.3)}
      />
    </mesh>
  );
};

export default memo(Plank);
