import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { useBuildingTextures } from "../hooks";
import BouncingBuilding, { BouncingBuildingProps } from "./BouncingBuilding";

export default {
  title: "City/BouncingBuilding",
  component: BouncingBuilding,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    texture: {
      control: "radio",
      options: [1, 2, 3],
    },
    bounceSize: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
    },
  },
} as ComponentMeta<typeof BouncingBuilding>;

const BuildingWrapper = ({
  texture,
  ...props
}: Omit<BouncingBuildingProps, "textureProps" | "ref"> & {
  texture: 1 | 2 | 3;
}) => {
  const textureProps = useBuildingTextures();

  return (
    <BouncingBuilding textureProps={textureProps[texture - 1]} {...props} />
  );
};

const Template: ComponentStory<typeof BuildingWrapper> = ({
  texture,
  ...args
}) => {
  return (
    <Canvas
      camera={{
        position: [80, 4, 5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <BuildingWrapper texture={texture} {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  texture: 1,
  bounceSize: 3,
  position: [0, -30, 0],
  scale: [1, 1, 1],
  onFrame: () => {},
};
