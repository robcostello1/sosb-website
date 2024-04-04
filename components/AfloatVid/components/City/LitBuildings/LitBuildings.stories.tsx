import React from "react";

import { OrbitControls, Stage, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import VideoProvider from "../../Video/VideoProvider";
import { useBuildingTextures } from "../hooks";
import LitBuildings, { LitBuildingsProps } from "./LitBuildings";

export default {
  title: "City/LitBuildings",
  component: LitBuildings,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof LitBuildings>;

const BuildingWrapper = ({
  ...props
}: Omit<LitBuildingsProps, "textureProps">) => {
  const textureProps = useBuildingTextures();

  return (
    <LitBuildings
      textureProps={textureProps}
      chanceOfColorChange={0.02}
      {...props}
    />
  );
};

const Template: ComponentStory<typeof BuildingWrapper> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 4, 20],
      }}
    >
      <Stats />

      <OrbitControls />

      <Stage preset="portrait" environment="night">
        <VideoProvider autoStart>
          <BuildingWrapper {...args} />
        </VideoProvider>
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 500,
  numberOfBuildings: 120,
  buildingHeightFactor: 70,
};
