import { useTexture } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Group, MirroredRepeatWrapping, RepeatWrapping, Texture } from "three";
import Building2 from "./BouncingBuilding";
import gsap, { Linear, Power2 } from "gsap";
import BuildingWithVines from "./BuildingWithVines";
import VineBuildingGroup from "./VineBuildingGroup";
import BouncingBuildings from "./BouncingBuildings";
import Ad from "./Ad/Ad";

const applyWrap = (textures: Texture | Texture[]) => {
  (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
    texture.wrapS = MirroredRepeatWrapping;
    texture.wrapT = RepeatWrapping;
  });
};

const DebugBuildings = ({
  textureProps,
}: {
  textureProps: {
    map: Texture;
    roughnessMap: Texture;
  }[];
}) => (
  <>
    <BuildingWithVines
      scale={[1, 2.5, 1]}
      position={[-50, 0, -200]}
      textureProps={textureProps[0]}
      vinesAmount={1}
    />
    <BuildingWithVines
      scale={[1, 0.5, 1]}
      position={[25, 0, -20]}
      textureProps={textureProps[2]}
      vinesAmount={1}
      pulsate={0.2}
    />
    <BuildingWithVines
      scale={[1, 0.5, 1]}
      position={[25, 0, 20]}
      textureProps={textureProps[2]}
      vinesAmount={0.1}
    />
    <Building2
      scale={[1, 1, 1]}
      position={[15, 0, -50]}
      textureProps={textureProps[1]}
      smoothMoves={1}
    />
  </>
);

type City2Props = {
  sinkStart: number;
  duration: number;
  size: number;
  debug?: boolean;
};

const City2 = ({ debug, duration, size, sinkStart }: City2Props) => {
  const groupRef = useRef<Group>(null);
  const textureProps = [
    useTexture(
      {
        map: `/maps/building-facade-1.jpg`,
        roughnessMap: `/maps/building-facade-1-roughness.jpg`,
      },
      applyWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-2.jpg`,
        roughnessMap: `/maps/building-facade-2-roughness.jpg`,
      },
      applyWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-3.jpg`,
        roughnessMap: `/maps/building-facade-3-roughness.jpg`,
      },
      applyWrap
    ),
  ];

  useEffect(() => {
    if (groupRef.current && !debug) {
      gsap.to(groupRef.current.position, {
        duration,
        ease: Linear.easeNone,
        z: size / 2,
      });

      gsap.to(groupRef.current.position, {
        delay: sinkStart,
        duration: duration - sinkStart,
        ease: Power2.easeIn,
        y: -300,
      });
    }
  }, [groupRef.current]);

  return (
    <group position={!debug ? [0, 0, -size / 2] : undefined} ref={groupRef}>
      <Ad />
      {!debug ? (
        <BouncingBuildings textureProps={textureProps} size={size} />
      ) : (
        <DebugBuildings textureProps={textureProps} />
      )}
      <VineBuildingGroup
        debug={debug}
        textureProps={textureProps}
        size={size}
      />
    </group>
  );
};

export default City2;
