import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Ocean } from '../../../../Terrain';
import Raft from '../../Raft';
import Ship from './Ship';

export default {
  title: "Ship",
  component: Ship,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Ship>;

const Template: ComponentStory<typeof Ship> = (args) => {
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
      <Ocean />

      <Raft setCamera={false} />

      <Ship {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
