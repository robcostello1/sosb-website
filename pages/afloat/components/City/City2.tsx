import { useTexture } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";
import { Group, MirroredRepeatWrapping, RepeatWrapping, Texture } from "three";
import Building2 from "./BouncingBuilding";
import gsap, { Quad, Power2, Power1 } from "gsap";
import BuildingWithVines from "./BuildingWithVines";
import VineBuildingGroup from "./VineBuildingGroup";
import BouncingBuildings from "./BouncingBuildings";
import Ad from "./Ad/Ad";
import Vines from "./Vines";
import Garage from "../Garage/Garage";

const START_POSITION_Z = 0.3;

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
  moving: boolean;
  sinkStart: number;
  duration: number;
  size: number;
  debug?: boolean;
  setMoving: (moving: boolean) => void;
};

const City2 = ({
  debug,
  duration,
  size,
  sinkStart,
  moving,
  setMoving,
}: City2Props) => {
  const groupRef = useRef<Group>(null);
  const [garageLoaded, setGarageLoaded] = useState(false);
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

  const [startedMoving, setStartedMoving] = useState(false);

  useEffect(() => {
    if (moving) {
      setStartedMoving(true);
    }
  }, [moving]);

  useEffect(() => {
    if (groupRef.current && !debug && startedMoving) {
      gsap.to(groupRef.current.position, {
        duration,
        ease: Power1.easeIn,
        z: size / 2,
      });

      gsap.to(groupRef.current.position, {
        delay: sinkStart,
        duration: duration - sinkStart,
        ease: Power2.easeIn,
        y: -300,
      });
    }
  }, [groupRef.current, startedMoving]);

  return (
    <group
      position={!debug ? [0, 0, -size * START_POSITION_Z] : undefined}
      ref={groupRef}
    >
      <Suspense>
        <Garage
          position={[0, 0, size * START_POSITION_Z]}
          doorDisabled={moving}
          onClickOpen={() => setMoving(true)}
          onLoad={() => setGarageLoaded(true)}
        />
      </Suspense>

      {garageLoaded && (
        <>
          <group position={[-10, 2, -3]} rotation={[0, Math.PI / 2, 0]}>
            <Vines geometryDimensions={[20, 10, 0.1]} vinesAmount={1} />
            <Ad
              boxArgs={[20, 10, 0.1]}
              start={true}
              url="/maps/verse1.mp4"
              videoScale={1.7}
              videoOffset={[0.2, 0.4]}
            />
          </group>

          {!debug ? (
            <BouncingBuildings
              textureProps={textureProps}
              size={size}
              started={startedMoving}
            />
          ) : (
            <DebugBuildings textureProps={textureProps} />
          )}
          <VineBuildingGroup
            debug={debug}
            textureProps={textureProps}
            size={size}
          />
        </>
      )}
    </group>
  );
};

export default City2;
