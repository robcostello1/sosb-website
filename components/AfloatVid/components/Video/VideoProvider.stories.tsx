import React from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Screen from '../City/Screen';
import { useVideoContext } from './useVideoContext';
import VideoProvider from './VideoProvider';

export default {
  title: "Media/VideoProvider",
  component: VideoProvider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof VideoProvider>;

const TestComponent = () => {
  const { mediaRef } = useVideoContext();

  return <Screen boxArgs={[20, 10, 0.1]} start={false} />;
};

const Template: ComponentStory<typeof VideoProvider> = (args) => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <VideoProvider autoStart>
        <TestComponent />
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  overrideTime: 0,
  timeSpeedMultiplier: 3,
};
