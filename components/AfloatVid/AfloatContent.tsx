import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Triplet } from "utils/types";

import { CameraControls, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { Ocean } from "../Terrain";
import styles from "./AfloatContent.module.css";
import {
  BobbingItem,
  BuildingOrb,
  City,
  Islands,
  Movement,
  Raft,
  ShippingScene,
} from "./components";
import BuildingTextureProvider from "./components/City/BuildingTextureProvider/BuildingTextureProvider";
import { FloatingScene } from "./components/FloatingStuff";
import Sky from "./components/Sky";
import SkyStreaks from "./components/Sky/SkyStreaks";
import VideoProvider, { useVideoContext } from "./components/Video";
import { PARTS, START_POSITION_Z } from "./consts";

// TODO deprecate in favour of bars
const parts = {
  intro: 0,
  verse1: 47.176,
  break1: 78.415,
  verse2: 109.634,
  hook: 140.448,
};

const BUILDING_ORB_POSITION: Triplet = [0, 40, -100];

const raft = (
  <BobbingItem>
    <Raft />
  </BobbingItem>
);

const AfloatContent = ({ onLoad }: { onLoad: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const [moving, setMoving] = useState(false);
  const [showFloatingStuff, setShowFloatingStuff] = useState(false);
  const [showIslands, setShowIslands] = useState(false);
  const [showCity, setShowCity] = useState(true);
  const [showSkyStreaks, setShowSkyStreaks] = useState(false);
  const [timeSpeedMultiplyer, setTimeSpeedMultiplyer] = useState(0.5);
  const [showShippingScene, setShowShippingScene] = useState(false);
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      onLoad();
    }
  }, [loaded, onLoad]);

  const { handlePlay, barRef } = useVideoContext();

  const handleSetMoving = useCallback(() => {
    setMoving(true);
    handlePlay();
  }, [handlePlay]);

  useFrame(() => {
    if (barRef.current > PARTS.verse - 4) {
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
    // if (barRef.current > PARTS.chorus - 0.5 && barRef.current < PARTS.chorus) {
    //   setTimeSpeedMultiplyer(400);
    // }
    if (barRef.current > PARTS.chorus - 3) {
      setTimeSpeedMultiplyer(0.5);
      setShowOrb(true);
    }
    if (barRef.current > PARTS.outro - 0.25) {
      setShowSkyStreaks(true);
    }
    if (barRef.current > PARTS.outro) {
      setShowSkyStreaks(false);
      setTimeSpeedMultiplyer(2);
      setShowOrb(false);
    }
  });

  const buildingOrb = useMemo(
    () => <BuildingOrb position={BUILDING_ORB_POSITION} active={showOrb} />,
    [showOrb]
  );

  const city = useMemo(
    () => (
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
    ),
    [handleSetMoving, moving, showCity, showShippingScene]
  );

  return (
    <>
      {process.env.NODE_ENV === "development" ? <Stats /> : null}

      <CameraControls
        dollySpeed={0}
        // - value to invert
        // azimuthRotateSpeed={0.66}
        // polarRotateSpeed={0.66}
        distance={0.01}
        makeDefault
        ref={(controls) => {
          controls?.moveTo(0, 2, 0);
        }}
      />

      <directionalLight
        color={0x00aaff}
        intensity={0.07}
        position={[-10, -2, 2]}
      />
      <ambientLight intensity={0.1} />

      <Suspense>
        <Sky overrideTime={0} timeSpeedMultiplier={timeSpeedMultiplyer} />

        <Ocean />

        <FloatingScene visible={showFloatingStuff} />

        <SkyStreaks visible={showSkyStreaks} numStreaks={10} />

        <BuildingTextureProvider>
          {city}
          {buildingOrb}
        </BuildingTextureProvider>

        <Islands
          visible={showIslands}
          scale={200}
          position={[-105, -3, 0]}
          bounce={0.35}
        />
        <Islands
          visible={showIslands}
          scale={200}
          position={[105, -3, 0]}
          bounce={0.35}
        />

        {raft}
      </Suspense>
    </>
  );
};

const AfloatContentWrapper = ({ onLoad }: { onLoad: () => void }) => {
  return (
    <Canvas className={styles.container}>
      <VideoProvider>
        <AfloatContent onLoad={onLoad} />
      </VideoProvider>
    </Canvas>
  );
};

export default memo(AfloatContentWrapper);
