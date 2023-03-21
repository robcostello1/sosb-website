import { PointerLockControls, Sky, Stats } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Mesh } from "three";
import Ocean from "../../components/Terrain/Ocean";

import { Islands, City, Galaxy, Raft } from "./components";

const parts = {
  intro: 0,
  verse1: 47.176,
  break1: 78.415,
  verse2: 109.634,
  break2: 140.448,
};

const debug = true;

const AfloatContent = () => {
  const time = 0;

  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const song = new Audio();
    song.src = "/sound/afloat-full.mp3";
    const audioCtx = new window.AudioContext();
    let audioSource = null;

    !debug && song.play();
    audioSource = audioCtx.createMediaElementSource(song);
    analyserRef.current = audioCtx.createAnalyser();
    audioSource.connect(analyserRef.current);
    analyserRef.current.connect(audioCtx.destination);
    analyserRef.current.fftSize = 128;

    return () => {
      song.pause();
    };
  }, []);

  return (
    <>
      <PointerLockControls makeDefault />
      <ambientLight intensity={0.03} />

      {time > 7 && time < 21 ? (
        // TODO sun position
        <Sky sunPosition={0} inclination={0} />
      ) : (
        <Galaxy />
      )}

      <Ocean />

      <Suspense>
        <City
          duration={parts.verse2}
          sinkStart={parts.break1}
          size={500}
          debug={debug}
        />
      </Suspense>

      <Stats />
      {/* <Islands
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
      /> */}

      {/* <BuildingGlitch /> */}

      <Raft />
    </>
  );
};

export default AfloatContent;
