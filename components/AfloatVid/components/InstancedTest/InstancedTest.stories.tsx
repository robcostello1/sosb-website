import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import InstancedTest from './InstancedTest';

export default {
  title: "InstancedTest",
  component: InstancedTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof InstancedTest>;

const Template: ComponentStory<typeof InstancedTest> = (args) => {
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

      <InstancedTest {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
};