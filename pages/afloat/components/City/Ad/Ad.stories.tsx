import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Ad from "./Ad";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

export default {
  title: "City/Ad",
  component: Ad,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Ad>;

const Template: ComponentStory<typeof Ad> = (args) => (
  <>
    <Canvas camera={{ position: [2, 1, 3] }}>
      <OrbitControls autoRotate />

      <Stage adjustCamera={false}>
        <Ad />
      </Stage>
    </Canvas>
  </>
);

export const Default = Template.bind({});
