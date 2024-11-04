import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Warehouse from './Warehouse';

export default {
  title: "Warehouse",
  component: Warehouse,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Warehouse>;

const Template: ComponentStory<typeof Warehouse> = (args) => {
  return (
    <Canvas
      camera={{
        position: [-0.2, 0.5, 1.5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Warehouse {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  active: false,
  onClick: () => { },
  onClickInside: () => { }
};
