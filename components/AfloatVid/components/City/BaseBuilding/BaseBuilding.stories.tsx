import React, { useCallback } from "react";
import { getRandomColor } from "utils/utils";

import { OrbitControls, Stage, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { useBuildingTextures } from "../hooks";
import BaseBuilding, { BaseBuildingProps } from "./BaseBuilding";
import { OnFrameFunc } from "./types";

export default {
  title: "City/BaseBuilding",
  component: BaseBuilding,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    texture: {
      control: "radio",
      options: [1, 2, 3],
    },
    textureProps: {
      control: "none",
    },
    lightRef: {
      control: "none",
    },
    onFrame: {
      control: "none",
    },
  },
} as ComponentMeta<typeof BaseBuilding>;

const BuildingWrapper = ({
  texture,
  useLights,
  onFrame,
  ...props
}: Omit<BaseBuildingProps, "textureProps" | "ref"> & {
  texture: 1 | 2 | 3;
}) => {
  const textureProps = useBuildingTextures();

  const handleLights = useCallback<OnFrameFunc>(
    ({ mesh, light }) => {
      if (!useLights) {
        mesh.material.transparent = false;
        mesh.material.needsUpdate = true;
        return;
      }
      if (Math.random() > 0.9) {
        mesh.material.transparent = true;
        mesh.material.needsUpdate = true;
        if (light) {
          light.material.color = getRandomColor();
        }
      }
    },
    [useLights]
  );

  return (
    <BaseBuilding
      key={texture}
      useLights={useLights}
      textureProps={textureProps[texture - 1]}
      onFrame={handleLights}
      {...props}
    />
  );
};

const Template: ComponentStory<typeof BuildingWrapper> = (args) => {
  return (
    <Canvas
      camera={{
        position: [30, 4, 5],
      }}
    >
      <Stats />

      <OrbitControls />

      <Stage preset="portrait" environment="night">
        <BuildingWrapper {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  texture: 1,
  onFrame: () => {},
};
