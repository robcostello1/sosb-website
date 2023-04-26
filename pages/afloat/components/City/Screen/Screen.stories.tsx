import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Screen from "./Screen";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

export default {
  title: "City/Screen",
  component: Screen,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Screen>;

const Template: ComponentStory<typeof Screen> = (args) => {
  return (
    <Canvas camera={{ position: [2, 1, 2] }}>
      <OrbitControls autoRotate />

      <Stage adjustCamera={false}>
        <Screen {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  url: "/maps/verse1.mp4",
  boxArgs: [3, 1, 0.1],
  videoOffset: [0, 0.2],
  videoScale: 1,
  start: true,
  position: [0, 10, 0],
};
