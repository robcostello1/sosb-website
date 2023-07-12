import React from 'react';

import { OrbitControls, Stats, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import BouncingBuilding, { BouncingBuildingProps } from './BouncingBuilding';
import { TextureProps } from './types';
import { applyBuildingWrap } from './utils';

export default {
  title: "City/BouncingBuilding",
  component: BouncingBuilding,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof BouncingBuilding>;

const BuildingWrapper = ({
  texture,
  ...props
}: Omit<BouncingBuildingProps, "textureProps" | "ref"> & {
  texture: 1 | 2 | 3;
}) => {
  const textureProps: TextureProps[] = [
    useTexture(
      {
        map: `/maps/building-facade-1.jpg`,
        roughnessMap: `/maps/building-facade-1-roughness.jpg`,
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-2.jpg`,
        roughnessMap: `/maps/building-facade-2-roughness.jpg`,
        // TODO not working
        // normalMap: `/maps/building-facade-2-normal.jpg`,
      },
      applyBuildingWrap
    ),
    useTexture(
      {
        map: `/maps/building-facade-3.jpg`,
        roughnessMap: `/maps/building-facade-3-roughness.jpg`,
      },
      applyBuildingWrap
    ),
  ];

  return (
    <BouncingBuilding textureProps={textureProps[texture - 1]} {...props} />
  );
};

const Template: ComponentStory<typeof BuildingWrapper> = ({
  texture,
  ...args
}) => {
  return (
    <Canvas
      camera={{
        position: [30, 4, 5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <BuildingWrapper texture={texture} {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  texture: 1,
  smoothMoves: 3,
};
