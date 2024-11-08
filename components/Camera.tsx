import { gsap } from "gsap";
import { memo, useEffect, useState } from "react";
import { Triplet } from "utils/types";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const cameraSettings: Record<
  string,
  {
    position: {
      landscape: [number, number, number];
      portrait: [number, number, number];
    };
    rotation?: [number, number, number];
  }
> = {
  init: {
    position: {
      landscape: [0.1, 0.3, 1.5],
      portrait: [0.1, 0.5, 2.5],
    },
    rotation: [-0.197, 0.065, 0.013],
  },
  warehouse: {
    position: {
      landscape: [0.3, 0.2, 1.5],
      portrait: [0.3, 0.2, 1.03],
    },
    rotation: [0, Math.PI / 2, 0],
  },
  socials: {
    position: {
      landscape: [0.3, 0.2, 1.4],
      portrait: [0.3, 0.2, 1.4],
    },
    rotation: [-0.6, -0.55, -0.3],
  },
};

type CameraProps = { focus?: string };

const Camera = ({ focus }: CameraProps) => {
  const [orbitActive, setOrbitActive] = useState(true);
  const isPortrait = window.innerWidth < window.innerHeight;

  const { camera } = useThree();

  useEffect(() => {
    if (focus) {
      setOrbitActive(false);
    }
  }, [focus]);

  useEffect(() => {
    const initPos =
      cameraSettings.init.position[isPortrait ? "portrait" : "landscape"];
    camera.position.set(...initPos);
  }, [camera, isPortrait]);

  useFrame((_state, _delta) => {
    const settings = cameraSettings[focus || "init"];

    if (!settings) {
      return;
    }

    const pos = settings.position[isPortrait ? "portrait" : "landscape"];
    if (!orbitActive) {
      gsap.to(camera.position, {
        x: () => pos[0],
        y: () => pos[1],
        z: () => pos[2],
        duration: 1,
        onComplete: () => {
          if (!focus) {
            setOrbitActive(true);
          }
        },
      });

      if (settings.rotation) {
        gsap.to(camera.rotation, {
          x: () => (settings.rotation as Triplet)[0],
          y: () => (settings.rotation as Triplet)[1],
          z: () => (settings.rotation as Triplet)[2],
          duration: 1,
        });
      }
    }
  });

  return (
    <>
      <PerspectiveCamera castShadow />

      <OrbitControls
        key={focus}
        enabled={orbitActive}
        makeDefault
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.09}
        minAzimuthAngle={-Math.PI / 12}
        maxAzimuthAngle={Math.PI / 8}
        enableZoom={false}
        enablePan={false}
        zoomSpeed={0.3}
      />
    </>
  );
};

export default memo(Camera);
