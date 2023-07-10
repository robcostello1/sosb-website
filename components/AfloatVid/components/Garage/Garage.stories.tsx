import React from 'react';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Ocean from '../../../Terrain/Ocean';
import Garage from './Garage';

export default {
  title: "Garage",
  component: Garage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Garage>;

const Template: ComponentStory<typeof Garage> = (args) => {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <OrbitControls />

      <Ocean position={[0, -2, 0]} waterColor={0x444422} />
      <Garage {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  position: [0, -2, 2],
};
