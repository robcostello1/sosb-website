import React from 'react';

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Barrel from './Barrel';

export default {
  title: "Barrel",
  component: Barrel,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Barrel>;

const Template: ComponentStory<typeof Barrel> = (args) => {
  return (
    <Canvas camera={{ position: [1, 1, 2] }}>
      <OrbitControls />

      <Stage adjustCamera={false} environment="night">
        <Barrel {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
