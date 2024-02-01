import React from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import { OrbitControls, Plane, Stats } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Social } from './Social';

export default {
  title: "Social",
  component: Social,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Social>;

const SocialWrapper = (props) => {
  const { data: font } = useLoader(
    FontLoader,
    "/fonts/Font Awesome 6 Brands Regular_Regular.json"
  );

  return <Social font={font} {...props} />;
};

const Template: ComponentStory<typeof Social> = ({
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

      <Physics gravity={[0, -1, 0]} debug>
        <SocialWrapper {...args} />

        <RigidBody includeInvisible>
          <Plane
            rotation={[Math.PI / 2, 0, 0]}
            args={[10, 10]}
            visible={false}
          />
        </RigidBody>
      </Physics>
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
