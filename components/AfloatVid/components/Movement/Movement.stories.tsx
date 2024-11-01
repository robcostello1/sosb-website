import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Movement from './Movement';

export default {
  title: "Movement",
  component: Movement,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Movement>;

const Template: ComponentStory<typeof Movement> = (args) => {
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

      <Movement {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
};