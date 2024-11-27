import gsap, { Power2 } from 'gsap';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Group } from 'three';

import { PARTS, START_POSITION_Z } from '../../consts';
import Garage from '../Garage/Garage';
import BouncingBuildings from './BouncingBuildings/BouncingBuildings';
import { BuildingTextureContext } from './BuildingTextureProvider/BuildingTextureProvider';
import { ScreenWithVines } from './Screen';
import VineBuildingGroup from './VineBuildingGroup';

type City2Props = {
  moving: boolean;
  sinkStart: number;
  duration: number;
  size: number;
  visible: boolean;
  setMoving: (moving: boolean) => void;
};

const SCREEN_SCALE = 0.02;

const City2 = ({
  duration,
  size,
  sinkStart,
  moving,
  visible,
  setMoving,
}: City2Props) => {
  const textureProps = useContext(BuildingTextureContext);
  const groupRef = useRef<Group>(null);
  const [garageLoaded, setGarageLoaded] = useState(false);

  useEffect(() => {
    if (groupRef.current && moving) {
      gsap.to(groupRef.current.position, {
        delay: sinkStart,
        duration: 60,
        ease: Power2.easeIn,
        y: -300,
      });
    }
  }, [duration, sinkStart, size, moving]);

  const handleSetMoving = useCallback(() => {
    setMoving(true);
  }, [setMoving]);

  const handleGarageLoaded = useCallback(() => {
    setGarageLoaded(true);
  }, []);

  return (
    <group ref={groupRef}>
      <Garage
        position={[0, 0, size * START_POSITION_Z]}
        doorDisabled={false}
        onClickOpen={handleSetMoving}
        onLoad={handleGarageLoaded}
      />

      {garageLoaded && (
        <>
          <ScreenWithVines
            position={[-10, (404 * SCREEN_SCALE) / 2 - 0.3, -60]}
            rotation={[0, Math.PI / 2, 0]}
            boxArgs={[718 * SCREEN_SCALE, 404 * SCREEN_SCALE, 0.1]}
            start={true}
            videoScale={1}
            videoOffset={[0, 0]}
          />

          <BouncingBuildings
            textureProps={textureProps}
            size={size}
            started={moving}
            barNumToShowLights={PARTS.verse - 1}
            active={visible}
            numberOfBuildings={160}
          />

          <VineBuildingGroup textureProps={textureProps} size={size} />
        </>
      )}
    </group>
  );
};

export default memo(City2);
