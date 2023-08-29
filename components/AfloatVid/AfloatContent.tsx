import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FirstPersonControls,
  PointerLockControls,
  Stats,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import Ocean from "../Terrain/Ocean";
import { BobbingItem, City, FloatingStuff, Islands, Raft } from "./components";
import Sky from "./components/Sky";
import SkyStreaks from "./components/Sky/SkyStreaks/SkyStreaks";
import { SongContext } from "./components/SongProvider";
import SongProvider from "./components/SongProvider/SongProvider";
import { PARTS } from "./consts";

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

  const { handlePlay, barRef } = useContext(SongContext);

  const handleSetMoving = useCallback(() => {
    handlePlay();
    setMoving(true);
  }, [handlePlay]);

  useFrame(() => {
    if (barRef.current > PARTS.break) {
      setShowSkyStreaks(true);
    }
    if (barRef.current > PARTS.verse2) {
      setShowFloatingStuff(true);
      setShowCity(false);
    }
    if (barRef.current > PARTS.hook) {
      setShowCity(false);
      setShowSkyStreaks(false);
    }
    if (barRef.current > PARTS.chorus) {
      setShowFloatingStuff(false);
      setShowIslands(true);
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
      <PointerLockControls enabled={moving} makeDefault ref={controls} />

      <FirstPersonControls
        enabled={!moving}
        lookSpeed={0.01}
        movementSpeed={0}
      />

      <Sky overrideTime={0} timeSpeedMultiplier={0.5} />

      <Ocean />

      <FloatingStuff
        numberOfItems={100}
        from={-100}
        to={1000}
        duration={300}
        delay={0}
        visible={showFloatingStuff}
      />

      <SkyStreaks visible={showSkyStreaks} numStreaks={20} />

      <City
        visible={showCity}
        duration={parts.verse2}
        sinkStart={parts.break1 - 20}
        size={500}
        moving={moving}
        setMoving={handleSetMoving}
      />

      <Stats />

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

      {/* <BuildingGlitch /> */}

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
