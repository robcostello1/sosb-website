import gsap, { Linear, Power1, Power2, Sine } from 'gsap';
import { memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Group, MirroredRepeatWrapping, RepeatWrapping, Texture } from 'three';

import { useTexture } from '@react-three/drei';

import Garage from '../Garage/Garage';
import Building2 from './BouncingBuilding';
import BouncingBuildings from './BouncingBuildings';
import BuildingWithVines from './BuildingWithVines';
import { ScreenWithVines } from './Screen';
import { applyBuildingWrap } from './utils';
import VineBuildingGroup from './VineBuildingGroup';

const START_POSITION_Z = 0.3;

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
      applyBuildingWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-2.jpg`,
        roughnessMap: `/maps/building-facade-2-roughness.jpg`,
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-3.jpg`,
        roughnessMap: `/maps/building-facade-3-roughness.jpg`,
      },
      applyBuildingWrap
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
      const tl = gsap.timeline();

      tl.to(groupRef.current.position, {
        duration: 7,
        ease: Power1.easeIn,
        z: -size * START_POSITION_Z + 10,
      });
      tl.to(groupRef.current.position, {
        duration: duration - 5,
        ease: Linear.easeIn,
        z: size / 2,
      });

      gsap.to(groupRef.current.position, {
        delay: sinkStart,
        duration: duration - sinkStart,
        ease: Power2.easeIn,
        y: -300,
      });
    }
  }, [debug, duration, sinkStart, size, startedMoving]);

  const handleSetMoving = useCallback(() => {
    setMoving(true);
  }, [setMoving]);

  const handleGarageLoaded = useCallback(() => {
    setGarageLoaded(true);
  }, []);

  return (
    <group
      position={!debug ? [0, 0, -size * START_POSITION_Z] : undefined}
      ref={groupRef}
    >
      <Garage
        position={[0, 0, size * START_POSITION_Z]}
        doorDisabled={moving}
        onClickOpen={handleSetMoving}
        onLoad={handleGarageLoaded}
      />

      {garageLoaded && (
        <>
          <ScreenWithVines
            position={[-10, 2, -3]}
            rotation={[0, Math.PI / 2, 0]}
            boxArgs={[20, 10, 0.1]}
            start={true}
            url="/maps/verse1.mp4"
            videoScale={1.7}
            videoOffset={[0.2, 0.4]}
          />

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

export default memo(City2);
