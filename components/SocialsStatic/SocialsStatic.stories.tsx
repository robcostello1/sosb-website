import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SocialsStatic from './SocialsStatic';

export default {
  title: "SocialsStatic",
  component: SocialsStatic,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SocialsStatic>;

const Template: ComponentStory<typeof SocialsStatic> = (args) => {
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

      <SocialsStatic {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
