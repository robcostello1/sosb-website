import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import VideoProvider from "../Video";
import City2 from "./City2";

export default {
  title: "City/City2",
  component: City2,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof City2>;

const Template: ComponentStory<typeof City2> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 2, 0],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <VideoProvider autoStart>
        <City2 {...args} />
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  setMoving: () => {},
  size: 600,
  duration: 120,
  sinkStart: 60,
};
