import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import VideoProvider from "../../Video/VideoProvider";
import BuildingTextureProvider from "../BuildingTextureProvider/BuildingTextureProvider";
import BuildingOrb from "./BuildingOrb";

export default {
  title: "BuildingOrb",
  component: BuildingOrb,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof BuildingOrb>;

const Template: ComponentStory<typeof BuildingOrb> = (args) => {
  return (
    <Canvas
      camera={{
        position: [3, 4, 100],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <VideoProvider autoStart debug>
        <BuildingTextureProvider>
          <BuildingOrb {...args} />
        </BuildingTextureProvider>
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  onPointerLeave: () => {},
  onPointerOut: () => {},
  onPointerMove: () => {},
  onPointerEnter: () => {},
  onPointerOver: () => {},
};
