import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ScreenContents from '../City/Screen/ScreenContents';
import Fridge from '../Fridge';
import FloatingStuff from './FloatingStuff';

export default {
  title: "Sea/FloatingStuff",
  component: FloatingStuff,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FloatingStuff>;

const Template: ComponentStory<typeof FloatingStuff> = (args) => {
  return (
    <Canvas camera={{ position: [0, 2, 10] }}>
      <OrbitControls />
      <Stats />

      <directionalLight position={[-5, 10, 3]} intensity={0.3} />

      {/* <Ocean position={[0, 0, 0]} waterColor={0x444422} /> */}
      <FloatingStuff {...args}>
        <ScreenContents
          // TODO temp
          url={"/maps/verse1.mp4"}
          boxArgs={[3, 1, 0.1]}
          videoOffset={[0, 0.2]}
          videoScale={1}
          start={true}
        />
        <Fridge />
      </FloatingStuff>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  from: -20,
  to: 20,
  delay: 0,
  duration: 10,
  debug: true,
};
