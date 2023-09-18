import React from 'react';

import { OrbitControls, Stage, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ShippingContainer from './ShippingContainer';

export default {
  title: "ShippingContainer",
  component: ShippingContainer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ShippingContainer>;

const Template: ComponentStory<typeof ShippingContainer> = (args) => {
  return (
    <Canvas
      camera={{
        position: [3, 4, 5],
      }}
    >
      <Stats />
      <OrbitControls />
      {/* <ambientLight intensity={0.8} />
      <directionalLight intensity={0.5} position={[0, 10, 0]} /> */}
      <Stage>
        <ShippingContainer {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
