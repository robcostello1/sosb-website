import { Cloud } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { useEffect, useRef, useState, memo } from "react";
import GlowText from "./GlowText";
import { useLoader } from "@react-three/fiber";

const SHOW_LIGHTS = false;

const SOSB = () => {
  const [bOn, setBOn] = useState(false);
  const interval = useRef<any>();

  const { data: font } = useLoader(
    FontLoader,
    "/fonts/Hollywood Hills_Regular.json"
  );

  useEffect(() => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      const shouldBeOn = Math.random() * 10 <= 8;

      setBOn(shouldBeOn);
    }, 500);

    () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <group>
      <Cloud
        color={bOn ? "#ffac5a" : "#d71bb5"}
        scale={0.04}
        position={[0.45, 0.4, 0.9]}
      />

      <Cloud
        color={bOn ? "#ffac5a" : "#d71bb5"}
        scale={0.07}
        position={[0.7, 0.5, -0.3]}
      />

      <GlowText
        font={font}
        color="#00aaaa"
        position={[-0.4, 0, 0.5]}
        rotation={[0, Math.PI / 8, 0]}
      >
        S
      </GlowText>
      {SHOW_LIGHTS && (
        <pointLight
          position={[-0.4, 0, 0.5]}
          color="#00aaaa"
          intensity={1}
          distance={3}
          decay={10}
        />
      )}

      <GlowText
        font={font}
        color={"red"}
        position={[-0.14, 0, 0.5]}
        rotation={[0, 0, 0]}
      >
        0
      </GlowText>
      {SHOW_LIGHTS && (
        <pointLight
          position={[-0.14, 0, 0.5]}
          color={"red"}
          intensity={1}
          distance={3}
          decay={10}
        />
      )}

      <GlowText
        font={font}
        color={"magenta"}
        position={[0.13, 0, 0.5]}
        rotation={[0, -Math.PI / 8, 0]}
      >
        S
      </GlowText>
      {SHOW_LIGHTS && (
        <pointLight
          position={[0.13, 0, 0.5]}
          color={"magenta"}
          intensity={1}
          distance={3}
          decay={10}
        />
      )}

      <GlowText
        font={font}
        color={"yellow"}
        position={[0.3, 0.04, 0.7]}
        rotation={[Math.PI / 2, 0, Math.PI / 6]}
        on={bOn}
      >
        B
      </GlowText>
      {bOn && SHOW_LIGHTS && (
        <pointLight
          position={[0.3, 0.04, 0.7]}
          color="yellow"
          intensity={1}
          distance={3}
          decay={10}
        />
      )}
    </group>
  );
};

export default memo(SOSB);
