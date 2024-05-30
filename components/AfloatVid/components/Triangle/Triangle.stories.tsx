import { noop } from "lodash";
import React from "react";
import { Color, Vector3 } from "three";

import { Box, OrbitControls, Stage, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Triangle from "./Triangle";

export default {
  title: "Triangle",
  component: Triangle,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Triangle>;

const Template: ComponentStory<typeof Triangle> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, -10],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Triangle {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  // vertices: [new Vector3(0, 1, 0), new Vector3(0, 0, 0), new Vector3(1, 0, 0)],
  color: new Color(0xff0000),
  onBeforeRender: noop,
  onAfterRender: noop,
};
