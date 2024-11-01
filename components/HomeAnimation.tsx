import dynamic from 'next/dynamic';
import { Fragment, memo, Suspense, useCallback, useEffect, useState } from 'react';
import { UnrealBloomPass } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Effects, PerspectiveCamera, Stats } from '@react-three/drei';
import { extend, useLoader, useThree } from '@react-three/fiber';

import { useSoundAdjustments } from '../hooks/useSoundAdjustments';
import Camera from './Camera';
import Reset from './City/Reset';
import Road from './City/Road';
import StreetLamp from './City/StreetLamp';
import TowerBlock from './City/TowerBlock';
import Warehouse from './City/Warehouse';
import { SFXProps, SoundConfig } from './SFX/types';
import SocialsStatic from './SocialsStatic';
import SOSB from './SOSB';

extend({ UnrealBloomPass });

const Sounds = dynamic(() => import("./Sounds"), {
  ssr: false,
});

const SFX = dynamic(() => import("./SFX/SFX"), {
  ssr: false,
});

const sounds = [
  {
    key: "ambiance",
    source: "/sound/city.mp3",
    volume: 1,
  },
  {
    key: "warehouse",
    source: "/sound/afloat.mp3",
    volume: 0.1,
    panning: -0.5,
    delay: { wet: 0.3, feedback: 0.3, delayTime: 0.1 },
    filter: {
      type: "lowpass",
      frequency: 100,
    },
  },
] as const;

const HomeAnimation = () => {
  const trashModel = useLoader(GLTFLoader, "/models/trash.glb");
  const ferris = useLoader(GLTFLoader, "/ferris.glb");
  const bus = useLoader(GLTFLoader, "/bus.glb");
  const tree = useLoader(GLTFLoader, "/tree.glb");
  const [currentSFX, setCurrentSFX] = useState<SFXProps["current"]>();
  const [focus, setFocus] = useState<string>();

  const { camera } = useThree();

  const getNewSoundValues = useCallback(
    (current: { [key: string]: SoundConfig }) => {
      const warehouseVol = 0.5 - camera.rotation.y * 1.5;
      const adjustments = {
        ...current,
        // Ambience should be high to the right
        ambiance: {
          volume: focus === "warehouse" || focus === "none" ? 0 : camera.rotation.y * 3 + 1.5,
        },
        warehouse: {
          volume:
            focus === "warehouse"
              ? 1
              : focus === "none" ? 0 : Math.max(0, warehouseVol * warehouseVol * warehouseVol),
          filter: {
            type: "lowpass" as const,
            frequency:
              focus === "warehouse"
                ? 20000
                : Math.max(0, -4000 * camera.rotation.x),
          },
        },
      };

      return adjustments;
    },
    [camera, focus]
  );

  const soundAdjustments = useSoundAdjustments(getNewSoundValues, focus);

  const [version, setVersion] = useState(0);

  const toggleTabActive = useCallback(() => {
    if (document.hidden) {
      setFocus('none');
    } else {
      setFocus(undefined);
    }
  }, [])

  useEffect(() => {
    document.addEventListener("visibilitychange", toggleTabActive);

    return () => {
      document.removeEventListener("visibilitychange", toggleTabActive)
    }
  }, []);

  return (
    <Fragment key={version}>
      {process.env.NODE_ENV === 'development' && <Stats />}

      <Camera focus={focus} />

      <SocialsStatic
        position={[0.6, 0, 1.1]}
        rotation={[0, 0, 0]}
        trash={<primitive object={trashModel.scene} />}
      />

      <fog attach="fog" args={["#000000", 1, 5]} />

      <PerspectiveCamera castShadow />

      <ambientLight intensity={0.2} color="lightblue" />

      <Road width={4} depth={4} />

      <group position={[-1, 0, -0.3]} rotation={[0, 1, 0]} scale={[1, 0.7, 0.8]}>
        <primitive object={trashModel.scene.clone()} />
      </group>

      <group position={[-1, 0, -0.3]} rotation={[0, 1, 0]} scale={[1, 0.7, 0.8]}>
        <primitive object={trashModel.scene.clone()} />
      </group>

      <Warehouse
        active={focus === "warehouse"}
        onClick={() =>
          setFocus(focus === "warehouse" ? undefined : "warehouse")
        }
        onClickInside={() => {
          window.open("/afloat", "_self");
        }}
      />

      <TowerBlock
        stories={10}
        position={[1.5, 0, -1]}
        rotation={[0, -Math.PI / 6, 0]}
        scale={[2, 0.3, 1]}
        windowStrutCount={6}
      />

      <StreetLamp position={[-0.3, 0.5, 0.8]} />

      <Reset
        onClick={() => setVersion(version + 1)}
        position={[-0.34, 0.17, 0.82]}
      />

      <SOSB />

      <Suspense>
        <Sounds initSoundConfig={sounds} soundAdjustments={soundAdjustments} />
      </Suspense>

      <Suspense>
        <SFX current={currentSFX} />
      </Suspense>

      {/* Tree */}
      <group
        position={[1.3, 0, -0.5]}
        // Other tree was too big
        // position={[1, 0, -0.5]}
        // scale={0.3}
        onClick={() => {
          window.open("https://linktr.ee/sosbmusic");
        }}
      >
        <primitive object={tree.scene} />
      </group>

      {/* Ferris */}
      <group
        position={[-0.7, 0.88, 0.2]}
        scale={1.3}
        onClick={() => {
          window.open("https://www.youtube.com/watch?v=PcBFhMXr5_A");
        }}
      >
        <primitive object={ferris.scene} />
      </group>

      {/* Bus */}
      <group
        scale={[0.2, 0.2, 0.15]}
        position={[0.78, 0.24, 0.65]}
        rotation={[0, Math.PI * 1.1, 0]}
      >
        <primitive object={bus.scene} />
      </group>

      <Effects disableGamma>
        {/* @ts-ignore */}
        <unrealBloomPass threshold={0.1} strength={1} radius={0.5} />
      </Effects>
    </Fragment>
  );
};

export default memo(HomeAnimation);
