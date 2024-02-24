import React, { ComponentProps } from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import VideoProvider from '../../Video/VideoProvider';
import buildingParams from './__mocks/buildingParams';
import InstancedScreens from './InstancedScreens';

export default {
  title: "City/InstancedScreens",
  component: InstancedScreens,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof InstancedScreens>;

const InstancedScreensWrapper = (
  props: ComponentProps<typeof InstancedScreens>
) => {
  return <InstancedScreens {...props} params={buildingParams} />;
};

const Template: ComponentStory<typeof InstancedScreens> = (args) => {
  return (
    <Canvas
      camera={{
        position: [2, 4, 100],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <VideoProvider autoStart>
        <InstancedScreensWrapper {...args} />
      </VideoProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  count: 50,
};
