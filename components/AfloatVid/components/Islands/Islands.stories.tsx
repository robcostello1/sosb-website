import React from "react";

import { Box, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Ocean from "../../../Terrain/Ocean";
import SongProvider from "../SongProvider";
import Islands from "./Islands";

export default {
  title: "Islands",
  component: Islands,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Islands>;

const Template: ComponentStory<typeof Islands> = (args) => {
  return (
    <Canvas
      camera={{
        position: [3, 4, 100],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[100, 30, 50]} />

      {/* <Ocean /> */}

      {/* <Box args={[50, 50, 50]} rotation={[1, 1, 1]}>
        <meshStandardMaterial />
      </Box> */}

      <VideoProvider autoStart>
        <Islands {...args} />
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  visible: true,
  scale: 200,
  bounce: 0.6,
};

export const Static = Template.bind({});

Static.args = {
  visible: true,
  scale: 200,
  bounce: 0,
};
