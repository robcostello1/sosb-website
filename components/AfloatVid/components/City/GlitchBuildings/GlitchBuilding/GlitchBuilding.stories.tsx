import React from 'react';

import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Ocean } from '../../../../../Terrain';
import SongProvider from '../../../SongProvider';
import { useBuildingTextures } from '../../hooks';
import GlitchBuilding from './GlitchBuilding';

export default {
  title: "GlitchBuilding",
  component: GlitchBuilding,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof GlitchBuilding>;

const StoryWrapper = (args) => {
  const textures = useBuildingTextures();
  return <GlitchBuilding {...args} textureProps={textures[0]} />;
};

const Template: ComponentStory<typeof GlitchBuilding> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0, 2, 40],
      }}
    >
      <Stats />

      <OrbitControls />

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
