import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ScreenWithVines from "./ScreenWithVines";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

export default {
  title: "City/ScreenWithVines",
  component: ScreenWithVines,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ScreenWithVines>;

const Template: ComponentStory<typeof ScreenWithVines> = (args) => {
  return (
    <Canvas camera={{ position: [2, 1, 2] }}>
      <OrbitControls autoRotate />

      <Stage adjustCamera={false}>
        <ScreenWithVines {...args} />
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
