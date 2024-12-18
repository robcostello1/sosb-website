import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Socials from './Socials';

export default {
  title: "Socials",
  component: Socials,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Socials>;

const Template: ComponentStory<typeof Socials> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0.2, 0.3, 0.5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Socials {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
