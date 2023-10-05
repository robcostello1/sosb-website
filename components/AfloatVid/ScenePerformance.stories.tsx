import React, { useRef } from "react";
import { Mesh } from "three";

import { PointerLockControls, Sphere, StatsGl } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { Ocean } from "../Terrain";
import { City, Islands, ShippingScene } from "./components";
import { GlitchBuildings } from "./components/City";
import BuildingTextureProvider from "./components/City/BuildingTextureProvider/BuildingTextureProvider";
import { FloatingScene } from "./components/FloatingStuff";
import SkyStreaks from "./components/Sky/SkyStreaks/SkyStreaks";

export default {
  title: "Scene Performance",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    selectedScene: {
      options: [
        "city",
        "floating",
        "islands",
        "sky streaks",
        "glitch buildings",
        "shipping",
      ],
      control: { type: "check" },
    },
  },
};

type TemplateProps = {
  showOcean: boolean;
  selectedScene: (
    | "city"
    | "floating"
    | "islands"
    | "sky streaks"
    | "glitch buildings"
    | "shipping"
  )[];
};

const handleSetMoving = () => {};

const Demo = () => {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta / 2;
      ref.current.rotation.z += delta / 4;
    }
  });

  return (
    <Sphere ref={ref} position={[0, 2, -10]}>
      <meshBasicMaterial wireframe />
    </Sphere>
  );
};

const Template = (args: TemplateProps) => {
  const shouldShow = (scene: TemplateProps["selectedScene"][number]) =>
    args.selectedScene.includes(scene);

  return (
    <Canvas
      camera={{
        position: [0, 2, 0],
      }}
    >
      <StatsGl />

      <PointerLockControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Demo />
      {args.showOcean && <Ocean />}

      <BuildingTextureProvider>
        <City
          visible={shouldShow("city")}
          duration={1000}
          sinkStart={500}
          size={500}
          moving={true}
          setMoving={handleSetMoving}
        />

        <Islands
          visible={shouldShow("islands")}
          scale={200}
          position={[-105, -3, 0]}
          bounce={0.6}
        />

        <Islands
          visible={shouldShow("islands")}
          scale={200}
          position={[105, -3, 0]}
          bounce={0.6}
        />

        <ShippingScene visible={shouldShow("shipping")} />

        <FloatingScene visible={shouldShow("floating")} />

        <SkyStreaks visible={shouldShow("sky streaks")} numStreaks={20} />

        <GlitchBuildings visible={shouldShow("glitch buildings")} />
      </BuildingTextureProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  showOcean: true,
  selectedScene: [],
};
