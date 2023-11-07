import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Box,
  FirstPersonControls,
  PointerLockControls,
  Stats,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { Triplet } from "../../utils/types";
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
import SkyStreaks from "./components/Sky/SkyStreaks/SkyStreaks";
import { useSongContext } from "./components/SongProvider";
import SongProvider from "./components/SongProvider/SongProvider";
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

const AfloatContent = () => {
  const [moving, setMoving] = useState(false);
  const [showFloatingStuff, setShowFloatingStuff] = useState(false);
  const [showIslands, setShowIslands] = useState(false);
  const [showCity, setShowCity] = useState(true);
  const [showSkyStreaks, setShowSkyStreaks] = useState(false);
  const [timeSpeedMultiplyer, setTimeSpeedMultiplyer] = useState(0.5);
  const [showShippingScene, setShowShippingScene] = useState(false);
  const [showOrb, setShowOrb] = useState(false);

  const { handlePlay, barRef } = useSongContext();

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
      // setShowOrb(false);
      setShowSkyStreaks(false);
      setTimeSpeedMultiplyer(2);
      setShowOrb(false);
    }
  });

  const controls = useRef(null);

  useEffect(() => {
    if (controls.current && moving) {
      // @ts-expect-error // TODO
      controls.current?.lock();
    }
  }, [controls, moving]);

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

      <BuildingTextureProvider>
        {city}
        {buildingOrb}
      </BuildingTextureProvider>

      <Islands
        visible={showIslands}
        scale={200}
        position={[-105, -3, 0]}
        bounce={0.2}
      />
      <Islands
        visible={showIslands}
        scale={200}
        position={[105, -3, 0]}
        bounce={0.2}
      />

      {raft}
    </Suspense>
  );
};

const AfloatContentWrapper = () => (
  <Canvas className={styles.container} shadows gl={{ precision: "mediump" }}>
    <SongProvider>
      <AfloatContent />
    </SongProvider>
  </Canvas>
);

export default AfloatContentWrapper;
