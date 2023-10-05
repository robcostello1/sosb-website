import React from "react";

import { OrbitControls, Stage, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Fridge from "./Fridge";

export default {
  title: "Fridge",
  component: Fridge,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Fridge>;

const Template: ComponentStory<typeof Fridge> = (args) => {
  return (
    <Canvas
      camera={{
        position: [3, 4, 5],
      }}
    >
      <Stats />

      <OrbitControls />
      {/* 
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} /> */}

      <Stage>
        <Fridge {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
