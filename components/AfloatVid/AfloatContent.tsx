import { Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { FirstPersonControls, PointerLockControls, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import { Ocean } from '../Terrain';
import { BobbingItem, City, Islands, Movement, Raft, ShippingScene } from './components';
import { FloatingScene } from './components/FloatingStuff';
import Sky from './components/Sky';
import SkyStreaks from './components/Sky/SkyStreaks/SkyStreaks';
import { SongContext } from './components/SongProvider';
import SongProvider from './components/SongProvider/SongProvider';
import { PARTS, START_POSITION_Z } from './consts';

// TODO deprecate in favour of bars
const parts = {
  intro: 0,
  verse1: 47.176,
  break1: 78.415,
  verse2: 109.634,
  hook: 140.448,
};

const AfloatContent = () => {
  const [moving, setMoving] = useState(false);
  const [showFloatingStuff, setShowFloatingStuff] = useState(false);
  const [showIslands, setShowIslands] = useState(false);
  const [showCity, setShowCity] = useState(true);
  const [showSkyStreaks, setShowSkyStreaks] = useState(false);
  const [timeSpeedMultiplyer, setTimeSpeedMultiplyer] = useState(0.5);
  const [showShippingScene, setShowShippingScene] = useState(false);

  const { handlePlay, barRef } = useContext(SongContext);

  const handleSetMoving = useCallback(() => {
    handlePlay();
    setMoving(true);
  }, [handlePlay]);

  useFrame(() => {
    if (barRef.current > PARTS.verse) {
      setShowShippingScene(true);
    }
    if (barRef.current > PARTS.break - 0.25) {
      setShowSkyStreaks(true);
    }
    if (barRef.current > PARTS.verse2 - 6) {
      setShowFloatingStuff(true);
    }
    if (barRef.current > PARTS.verse2) {
      setShowCity(false);
    }
    if (barRef.current > PARTS.hook) {
      setShowFloatingStuff(false);
      setShowSkyStreaks(false);
      setShowIslands(true);
      setShowShippingScene(false);
    }
    if (barRef.current > PARTS.chorus - 0.5 && barRef.current < PARTS.chorus) {
      setTimeSpeedMultiplyer(400);
    }
    if (barRef.current > PARTS.chorus) {
      setTimeSpeedMultiplyer(0.5);
    }
    if (barRef.current > PARTS.outro - 0.25) {
      setShowSkyStreaks(true);
    }
    if (barRef.current > PARTS.outro) {
      setShowSkyStreaks(false);
      setTimeSpeedMultiplyer(2);
    }
  });

  const controls = useRef(null);

  useEffect(() => {
    if (controls.current && moving) {
      // @ts-expect-error // TODO
      controls.current?.lock();
    }
  }, [controls, moving]);

  return (
    <Suspense fallback={<></>}>
      <Stats />

      <PointerLockControls enabled={moving} makeDefault ref={controls} />

      <FirstPersonControls
        enabled={!moving}
        lookSpeed={0.01}
        movementSpeed={0}
      />

      <directionalLight
        color={0x00aaff}
        intensity={0.07}
        position={[-10, -2, 2]}
      />
      <ambientLight intensity={0.1} />

      <Sky overrideTime={0} timeSpeedMultiplier={timeSpeedMultiplyer} />

      <Ocean />

      <FloatingScene visible={showFloatingStuff} />

      <SkyStreaks visible={showSkyStreaks} numStreaks={20} />

      <Movement
        start={-500 * START_POSITION_Z}
        end={1100}
        duration={300}
        moving={moving}
      >
        <ShippingScene visible={showShippingScene} position={[0, 0, -320]} />
        <City
          visible={showCity}
          duration={300}
          sinkStart={parts.break1 - 20}
          size={500}
          moving={moving}
          setMoving={handleSetMoving}
        />
      </Movement>

      <Islands
        visible={showIslands}
        scale={200}
        position={[-105, -3, 0]}
        bounce={0.6}
      />
      <Islands
        visible={showIslands}
        scale={200}
        position={[105, -3, 0]}
        bounce={0.6}
      />

      <BobbingItem>
        <Raft />
      </BobbingItem>
    </Suspense>
  );
};

const AfloatContentWrapper = () => (
  <Canvas shadows gl={{ precision: "mediump" }}>
    <SongProvider>
      <AfloatContent />
    </SongProvider>
  </Canvas>
);

export default AfloatContentWrapper;
