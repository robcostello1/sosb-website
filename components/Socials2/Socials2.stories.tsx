import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Socials2 from './Socials2';

export default {
  title: "Socials2",
  component: Socials2,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Socials2>;

const Template: ComponentStory<typeof Socials2> = () => {
  return (
    <Canvas
      camera={{
        position: [3, 4, 5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Socials2 />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
