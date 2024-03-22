import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import VideoProvider from "../../Video/VideoProvider";
import ScreenSphere from "./ScreenSphere";

export default {
  title: "City/ScreenSphere",
  component: ScreenSphere,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ScreenSphere>;

const Template: ComponentStory<typeof ScreenSphere> = (args) => {
  return (
    <Canvas
      camera={{
        position: [3, 4, 5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <VideoProvider autoStart debug>
        <ScreenSphere {...args} />
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
