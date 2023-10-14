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
            started={moving}
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
