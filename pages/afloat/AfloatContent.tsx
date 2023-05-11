import {
  FirstPersonControls,
  Loader,
  PointerLockControls,
  Sky,
  Stats,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";

import Ocean from "../../components/Terrain/Ocean";

import {
  City,
  Galaxy,
  Islands,
  Raft,
  BobbingItem,
  FloatingStuff,
} from "./components";

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
  const time = 7;

  const song = useRef<HTMLAudioElement>();
  const analyserRef = useRef<AnalyserNode | null>(null);

  const handleSetMoving = useCallback(() => {
    !debug && song.current?.play();
    setMoving(true);
  }, []);

  useEffect(() => {
    song.current = new Audio();
    song.current.src = "/sound/afloat-full.mp3";
    const audioCtx = new window.AudioContext();
    let audioSource = null;

    audioSource = audioCtx.createMediaElementSource(song.current);
    analyserRef.current = audioCtx.createAnalyser();
    audioSource.connect(analyserRef.current);
    analyserRef.current.connect(audioCtx.destination);
    analyserRef.current.fftSize = 128;

    return () => {
      song.current?.pause();
    };
  }, []);

  useFrame(() => {
    const time = song.current?.currentTime || 0;

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

      {time > 7 && time < 21 ? (
        // TODO sun position
        <Sky sunPosition={0} inclination={0} />
      ) : (
        <Galaxy />
      )}

      <Ocean />

      <FloatingStuff
        numberOfItems={200}
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
          // debug={debug}
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

export default memo(AfloatContent);
