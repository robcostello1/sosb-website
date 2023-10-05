import React from 'react';

import { PointerLockControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Ocean } from '../../../../Terrain';
import SongProvider from '../../SongProvider';
import { useBuildingTextures } from '../hooks';
import GlitchBuildings from './GlitchBuildings';

export default {
  title: "GlitchBuildings",
  component: GlitchBuildings,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof GlitchBuildings>;

const StoryWrapper = (args) => {
  const textures = useBuildingTextures();
  return <GlitchBuildings {...args} textures={textures} />;
};

const Template: ComponentStory<typeof GlitchBuildings> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 2, 0],
      }}
    >
      <Stats />

      <PointerLockControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Ocean />

      <SongProvider autoStart>
        <StoryWrapper />
      </SongProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
