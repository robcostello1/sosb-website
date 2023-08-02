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
import { SongContext } from "./components/SongProvider";
import SongProvider from "./components/SongProvider/SongProvider";

const parts = {
  intro: 0,
  verse1: 47.176,
  break1: 78.415,
  verse2: 109.634,
  break2: 140.448,
};

const debug = false;

const AfloatContent = () => {
  const [moving, setMoving] = useState(false);
  const [showFloatingStuff, setShowFloatingStuff] = useState(false);
  const [showIslands, setShowIslands] = useState(false);
  const [showCity, setShowCity] = useState(true);
  // TODO
  // const time = 3;

  const { songRef, analyserRef, handlePlay } = useContext(SongContext);

  const handleSetMoving = useCallback(() => {
    handlePlay();
    setMoving(true);
  }, [handlePlay]);

  useFrame(() => {
    const time = songRef.current?.currentTime || 0;

    if (time > parts.break1) {
      setShowFloatingStuff(true);
    }
    if (time > parts.verse2) {
      setShowFloatingStuff(false);
      setShowCity(false);
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

      {showCity && (
        <City
          duration={parts.verse2}
          sinkStart={parts.break1 - 20}
          size={500}
          moving={moving}
          setMoving={handleSetMoving}
        />
      )}

      <Stats />

      {showIslands && (
        <>
          <Islands
            scale={200}
            position={[-105, -3, 0]}
            bounce={0.6}
            analyserRef={analyserRef}
          />
          <Islands
            scale={200}
            position={[105, -3, 0]}
            bounce={0.6}
            analyserRef={analyserRef}
          />
        </>
      )}

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
