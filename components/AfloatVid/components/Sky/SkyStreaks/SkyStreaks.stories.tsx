import React from "react";

import { OrbitControls, PointerLockControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Ocean from "../../../../Terrain/Ocean";
import Sky from "../Sky";
import SkyStreaks from "./SkyStreaks";

export default {
  title: "Sky/SkyStreaks",
  component: SkyStreaks,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SkyStreaks>;

const Template: ComponentStory<typeof SkyStreaks> = (args) => {
  return (
    <Canvas
      color="#000000"
      camera={{
        position: [0, 2, 0],
        rotation: [0.5, 0, 0],
      }}
    >
      <Sky />

      <color attach="background" args={["black"]} />
      <Stats />
      <axesHelper />
      <PointerLockControls makeDefault />
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />
      <Ocean />

      <SkyStreaks {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  numStreaks: 25,
  ramp: 0,
  visible: true,
};
