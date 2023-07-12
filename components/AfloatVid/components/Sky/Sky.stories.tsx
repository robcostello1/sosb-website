import React, { memo, useState } from 'react';

import { OrbitControls, PointerLockControls, Stage, Stats, TorusKnot } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Ocean from '../../../Terrain/Ocean';
import Sky from './Sky';

export default {
  title: "Sky",
  component: Sky,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Sky>;

const Template: ComponentStory<typeof Sky> = (args) => {
  return (
    <Canvas camera={{ position: [0, -0.2, 0.5] }}>
      <Stats />

      <PointerLockControls />

      <TorusKnot
        position={[0, 2, -10]}
        getObjectsByProperty={undefined}
        getVertexPosition={undefined}
      >
        <meshStandardMaterial color={0x999999} metalness={1} roughness={0.1} />
      </TorusKnot>

      <Ocean position={[0, -2, 0]} waterColor={0x444422} />

      <Sky {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  overrideTime: 0,
  timeSpeedMultiplier: 3,
};
