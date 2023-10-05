import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import BuildingTextureProvider from './BuildingTextureProvider';

export default {
  title: "BuildingTextureProvider",
  component: BuildingTextureProvider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof BuildingTextureProvider>;

const Template: ComponentStory<typeof BuildingTextureProvider> = (args) => {
  return (
    <Canvas
      camera={
        {
          position: [3, 4, 5],
        }
      }
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <BuildingTextureProvider {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
};