import React, { useState, memo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Sky from "./Sky";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PointerLockControls,
  Stage,
  Stats,
  TorusKnot,
} from "@react-three/drei";
import Ocean from "../../../../components/Terrain/Ocean";

export default {
  title: "Sky",
  component: Sky,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Sky>;

const Template: ComponentStory<typeof Sky> = (args) => {
  return (
    <Canvas camera={{ position: [0, -0.2, 0.5] }}>
      <Stats />

      <PointerLockControls />

      <TorusKnot position={[0, 2, -10]}>
        <meshStandardMaterial color={0x999999} metalness={1} roughness={0.1} />
      </TorusKnot>

      <Ocean position={[0, -2, 0]} waterColor={0x444422} />

      <Sky {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  overrideTime: 0,
  timeSpeedMultiplier: 3,
};
