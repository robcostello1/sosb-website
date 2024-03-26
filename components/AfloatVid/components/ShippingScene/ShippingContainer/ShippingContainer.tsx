import { useMemo } from "react";
import { Vector2 } from "three";
import { REPEAT_WRAPPING } from "utils/consts";
import { Triplet } from "utils/types";
import { getStaticAsset } from "utils/utils";

import { Cylinder } from "@react-three/drei";
import { MeshStandardMaterialProps } from "@react-three/fiber";

import { useTexture } from "../../../hooks/useTexture";
// TODO move
import { TextureProps } from "../../City/types";
import MeshWithAo from "../../MeshWithAo";

type ShippingContainerProps = {
  position?: Triplet;
  rotation?: Triplet;
};

const STATIC_TEXTURE_PROPS: MeshStandardMaterialProps = {
  aoMapIntensity: 0.5,
  normalScale: new Vector2(0.8, 0.8),
};

const LENGTH = 6;
const WIDTH = 2.5;
const EDGE_WIDTH = 0.2;
const EDGE_OFFSET = 0.01;
const DEFAULT_EDGE_POSITION: Triplet = [
  0,
  WIDTH / 2 - EDGE_WIDTH / 2 + EDGE_OFFSET,
  WIDTH / 2 - EDGE_WIDTH / 2 + EDGE_OFFSET,
];
const DEFAULT_EDGE_ROTATION: Triplet = [0, 0, 0];
const DEFAULT_EDGE_REPEAT_ARGS: [number, number] = [0.09, 4];
const DEFAULT_EDGE_OFFSET_ARGS: [number, number] = [0.037, 0];
const END_EDGE_WIDTH = 0.1;
const DEFAULT_EDGE_GEOMETRY_ARGS: Triplet = [
  LENGTH - END_EDGE_WIDTH * 2,
  EDGE_WIDTH,
  EDGE_WIDTH,
];

const Pole = ({ position }: { position: Triplet }) => (
  <Cylinder args={[0.03, 0.03, WIDTH - END_EDGE_WIDTH]} position={position}>
    <meshStandardMaterial color="grey" metalness={1} roughness={0.3} />
  </Cylinder>
);

const Bar = ({
  geometryArgs = DEFAULT_EDGE_GEOMETRY_ARGS,
  offsetArgs = DEFAULT_EDGE_OFFSET_ARGS,
  position = DEFAULT_EDGE_POSITION,
  renderOrder,
  repeatArgs = DEFAULT_EDGE_REPEAT_ARGS,
  rotation = DEFAULT_EDGE_ROTATION,
  texture,
}: {
  geometryArgs?: Triplet;
  offsetArgs?: [number, number];
  position?: Triplet;
  renderOrder?: number;
  repeatArgs?: [number, number];
  rotation?: Triplet;
  texture: TextureProps;
}) => {
  const barTextures = useMemo(() => {
    return Object.entries(texture).reduce<TextureProps>((acc, [key, value]) => {
      const clonedTexture = value.clone();

      clonedTexture.rotation = Math.PI / 2;
      clonedTexture.repeat.set(...repeatArgs);
      clonedTexture.offset.set(...offsetArgs);

      acc[key as keyof TextureProps] = clonedTexture;
      return acc;
    }, {} as TextureProps);
  }, [offsetArgs, repeatArgs, texture]);

  return (
    <group rotation={rotation}>
      <MeshWithAo position={position} renderOrder={renderOrder}>
        <boxGeometry args={geometryArgs} />
        <meshStandardMaterial
          attach="material-2"
          {...barTextures}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial color="#2c3663" attach="material-3" />
        <meshStandardMaterial
          attach="material-4"
          {...barTextures}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial color="#2c3663" attach="material-5" />
      </MeshWithAo>
    </group>
  );
};

const BarEnd = ({
  debug,
  renderOrder,
  rotation,
  texture,
  length = WIDTH,
}: {
  debug?: boolean;
  renderOrder?: number;
  rotation: Triplet;
  texture: TextureProps;
  length?: number;
}) => (
  <Bar
    geometryArgs={[length, END_EDGE_WIDTH, END_EDGE_WIDTH]}
    position={[
      0,
      WIDTH / 2 - END_EDGE_WIDTH / 2 + EDGE_OFFSET + (debug ? 1 : 0),
      LENGTH / 2 - END_EDGE_WIDTH / 2 + EDGE_OFFSET + (debug ? 1 : 0),
    ]}
    renderOrder={renderOrder}
    repeatArgs={[0.1, 1.5]}
    rotation={rotation}
    texture={texture}
  />
);

const ShippingContainer = ({ position, rotation }: ShippingContainerProps) => {
  const texture = useTexture(
    {
      map: getStaticAsset("/maps/optimised/Metal_Currogated_007_basecolor.jpg"),
      normalMap: getStaticAsset(
        "/maps/optimised/Metal_Currogated_007_normal.jpg"
      ),
      roughnessMap: getStaticAsset(
        "/maps/optimised/Metal_Currogated_007_roughness.jpg"
      ),
      aoMap: getStaticAsset(
        "/maps/optimised/Metal_Currogated_007_ambientOcclusion_2.jpg"
      ),
      metalnessMap: getStaticAsset(
        "/maps/optimised/Metal_Currogated_007_metallic.jpg"
      ),
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = REPEAT_WRAPPING;
        // TODO different repeat settings for end
        texture.repeat.set(4, 1);
      });
    }
  );

  const endTextures = useMemo(() => {
    return Object.entries(texture).reduce<TextureProps>((acc, [key, value]) => {
      const clonedTexture = value.clone();

      clonedTexture.rotation = Math.PI / 2;
      // TODO end looks bad
      clonedTexture.repeat.set(1, 1);

      acc[key as keyof TextureProps] = clonedTexture;
      return acc;
    }, {} as TextureProps);
  }, [texture]);

  return (
    <group position={position} rotation={rotation}>
      <Bar texture={texture} />
      <Bar texture={texture} rotation={[Math.PI * 0.5, 0, 0]} />
      <Bar texture={texture} rotation={[Math.PI, 0, 0]} />
      <Bar texture={texture} rotation={[Math.PI * -0.5, 0, 0]} />

      <BarEnd
        length={WIDTH - END_EDGE_WIDTH * 2}
        texture={endTextures}
        rotation={[0, Math.PI * 0.5, 0]}
      />
      <BarEnd
        length={WIDTH - END_EDGE_WIDTH * 2}
        texture={endTextures}
        rotation={[0, Math.PI * -0.5, 0]}
      />
      <BarEnd
        length={WIDTH - END_EDGE_WIDTH * 2}
        texture={endTextures}
        rotation={[Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5]}
      />
      <BarEnd
        length={WIDTH - END_EDGE_WIDTH * 2}
        texture={endTextures}
        rotation={[Math.PI * 0.5, -Math.PI * 0.5, -Math.PI * 0.5]}
      />
      <BarEnd
        texture={endTextures}
        rotation={[0, Math.PI * 0.5, Math.PI * 0.5]}
      />
      <BarEnd
        texture={endTextures}
        rotation={[0, Math.PI * -0.5, Math.PI * 0.5]}
      />
      <BarEnd
        texture={endTextures}
        rotation={[0, Math.PI * 0.5, Math.PI * -0.5]}
      />
      <BarEnd
        texture={endTextures}
        rotation={[0, Math.PI * -0.5, Math.PI * -0.5]}
      />

      <Pole position={[LENGTH / 2 + 0.03, 0, 0.2]} />
      <Pole position={[LENGTH / 2 + 0.03, 0, -0.2]} />
      <Pole position={[-(LENGTH / 2 + 0.03), 0, 0.2]} />
      <Pole position={[-(LENGTH / 2 + 0.03), 0, -0.2]} />

      <MeshWithAo>
        <boxGeometry args={[LENGTH, WIDTH, WIDTH]} />
        <meshStandardMaterial
          attach="material-0"
          {...endTextures}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial
          attach="material-1"
          {...endTextures}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial
          attach="material-2"
          {...texture}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial
          attach="material-3"
          {...texture}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial
          attach="material-4"
          {...texture}
          {...STATIC_TEXTURE_PROPS}
        />
        <meshStandardMaterial
          attach="material-5"
          {...texture}
          {...STATIC_TEXTURE_PROPS}
        />
      </MeshWithAo>
    </group>
  );
};

export default ShippingContainer;
