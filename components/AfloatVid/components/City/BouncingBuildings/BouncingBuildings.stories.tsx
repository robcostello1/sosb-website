import React from 'react';

import { OrbitControls, Stage, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { useBuildingTextures } from '../hooks';
import BouncingBuildings, { BouncingBuildingsProps } from './BouncingBuildings';

export default {
  title: "City/BouncingBuildings",
  component: BouncingBuildings,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    texture: {
      control: "radio",
      options: [1, 2, 3],
    },
  },
} as ComponentMeta<typeof BouncingBuildings>;

const BuildingWrapper = ({
  ...props
}: Omit<BouncingBuildingsProps, "textureProps">) => {
  const textureProps = useBuildingTextures();

  return <BouncingBuildings textureProps={textureProps} {...props} />;
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
        <BuildingWrapper {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 500,
  numberOfBuildings: 120,
  started: true,
};
