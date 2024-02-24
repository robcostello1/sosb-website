import React from 'react';

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import VideoProvider from '../../Video/VideoProvider';
import Screen from './Screen';

export default {
  title: "City/Screen",
  component: Screen,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Screen>;

const Template: ComponentStory<typeof Screen> = (args) => {
  return (
    <Canvas camera={{ position: [2, 1, 2] }}>
      <OrbitControls autoRotate />

      <Stage adjustCamera={false}>
        <VideoProvider autoStart>
          <Screen {...args} />
        </VideoProvider>
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  boxArgs: [20, 10, 0.1],
  start: true,
  videoScale: 1.7,
  videoOffset: [0.2, 0.4],
  position: [0, 10, 0],
};
