import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Ocean } from "../../../Terrain";
import VideoProvider from "../Video/VideoProvider";
import ShippingScene from "./ShippingScene";

export default {
  title: "ShippingScene",
  component: ShippingScene,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ShippingScene>;

const Template: ComponentStory<typeof ShippingScene> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 2, 50],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Ocean />

      <VideoProvider autoStart>
        <ShippingScene {...args} />
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
