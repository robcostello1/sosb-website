import React from 'react';

import { OrbitControls, Stage, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import BaseBuilding, { BaseBuildingProps } from './BaseBuilding';
import { useBuildingTextures } from './hooks';

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
  },
} as ComponentMeta<typeof BaseBuilding>;

const BuildingWrapper = ({
  texture,
  ...props
}: Omit<BaseBuildingProps, "textureProps" | "ref"> & {
  texture: 1 | 2 | 3;
}) => {
  const textureProps = useBuildingTextures();

  return <BaseBuilding textureProps={textureProps[texture - 1]} {...props} />;
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

      {/* <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} /> */}

      <Stage preset="portrait" environment="night">
        <BuildingWrapper {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  texture: 1,
};
