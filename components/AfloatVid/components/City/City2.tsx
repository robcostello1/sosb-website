import gsap, { Linear, Power1, Power2 } from 'gsap';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Group } from 'three';

import { PARTS } from '../../consts';
import Garage from '../Garage/Garage';
import Building2 from './BouncingBuilding';
import BouncingBuildings from './BouncingBuildings/BouncingBuildings';
import BuildingWithVines from './BuildingWithVines';
import { useBuildingTextures } from './hooks';
import LitBuildings from './LitBuildings/LitBuildings';
import { ScreenWithVines } from './Screen';
import { TextureProps } from './types';
import VineBuildingGroup from './VineBuildingGroup';

const START_POSITION_Z = 0.3;

type City2Props = {
  moving: boolean;
  sinkStart: number;
  duration: number;
  size: number;
  visible: boolean;
  setMoving: (moving: boolean) => void;
};

const City2 = ({
  duration,
  size,
  sinkStart,
  moving,
  visible,
  setMoving,
}: City2Props) => {
  const groupRef = useRef<Group>(null);
  const [garageLoaded, setGarageLoaded] = useState(false);
  const textureProps = useBuildingTextures();

  // TODO seems uneccessary
  const [startedMoving, setStartedMoving] = useState(false);
  useEffect(() => {
    if (moving) {
      setStartedMoving(true);
    }
  }, [moving]);

  useEffect(() => {
    if (groupRef.current && startedMoving) {
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
  }, [duration, sinkStart, size, startedMoving]);

  const handleSetMoving = useCallback(() => {
    setMoving(true);
  }, [setMoving]);

  const handleGarageLoaded = useCallback(() => {
    setGarageLoaded(true);
  }, []);

  return (
    <group position={[0, 0, -size * START_POSITION_Z]} ref={groupRef}>
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

          <BouncingBuildings
            textureProps={textureProps}
            size={size}
            started={startedMoving}
            barNumToShowLights={PARTS.verse - 1}
            active={visible}
            numberOfBuildings={120}
          />

          <VineBuildingGroup textureProps={textureProps} size={size} />
        </>
      )}
    </group>
  );
};

export default memo(City2);
