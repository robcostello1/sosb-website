import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Arc from "./Arc";

export default {
  title: "Arc",
  component: Arc,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Arc>;

const Template: ComponentStory<typeof Arc> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, -0.1],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Arc {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  color: "#ff0000",
  scale: [200, 200, 20],
};
