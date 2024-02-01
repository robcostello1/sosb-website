import React, { Suspense } from 'react';

import { GradientTexture, OrbitControls, Plane, Sphere, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PhysicsContainer from './PhysicsContainer';

export default {
  title: "PhysicsContainer",
  component: PhysicsContainer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PhysicsContainer>;

const balls = Array.from(Array(200).keys());

const Template: ComponentStory<typeof PhysicsContainer> = (args) => {
  return (
    <Canvas
      camera={{
        position: [0.2, 0.3, 0.5],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Physics gravity={[0, -1, 0]}>
        {balls.map((index) => (
          <RigidBody>
            <Sphere args={[0.01]} position={[0, 0.02 * index, 0]}>
              <meshStandardMaterial />
            </Sphere>
          </RigidBody>
        ))}

        <PhysicsContainer {...args} />

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
  children: (
    <meshStandardMaterial>
      <GradientTexture
        stops={[0, 0.7, 1]} // As many stops as you want
        colors={["#999999", "#666666", "#333333"]} // Colors need to match the number of stops
      />
    </meshStandardMaterial>
  ),
};
