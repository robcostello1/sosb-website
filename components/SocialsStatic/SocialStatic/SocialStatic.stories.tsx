import React from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import { OrbitControls, Plane, Stats } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SocialStatic from './SocialStatic';

export default {
  title: "SocialStatic",
  component: SocialStatic,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SocialStatic>;

const SocialStaticWrapper = (props) => {
  const { data: font } = useLoader(
    FontLoader,
    "/fonts/Font Awesome 6 Brands Regular_Regular.json"
  );

  return <SocialStatic font={font} {...props} />;
};

const Template: ComponentStory<typeof SocialStatic> = ({
  onBeforeRender,
  onAfterRender,
  onWheel,
  ...args
}) => {
  return (
    <Canvas
      camera={{
        position: [0.3, 0.4, 0.5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

        <SocialStaticWrapper {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  color: "#4267B2",
  position: [0, 0.1, 0],
  scale: [0.1, 0.1, 0.01],
  rotation: [Math.PI / 16, Math.PI / 4, Math.PI / 2],
  active: false,
  children: "\uf09a",
};
