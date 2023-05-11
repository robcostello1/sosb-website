import React, { useState, memo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Raft from "./Raft";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PointerLockControls,
  Stage,
  Stats,
} from "@react-three/drei";
import Ocean from "../../../../components/Terrain/Ocean";

export default {
  title: "Raft",
  component: Raft,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Raft>;

const Template: ComponentStory<typeof Raft> = ({ setCamera, ...args }) => {
  return (
    <Canvas camera={!setCamera ? { position: [3, 4, 5] } : undefined}>
      <Stats />

      {!setCamera ? <OrbitControls /> : <PointerLockControls />}

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Ocean position={[0, 0, 0]} waterColor={0x444422} />

      <Raft {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  setCamera: false,
};

const RerenderTestWrapper = () => {
  const [state, setState] = useState(0);

  return (
    <group onClick={() => setState(state + 1)}>
      <Raft setCamera={false} />
    </group>
  );
};

export const RerenderTest: ComponentStory<typeof Raft> = () => {
  return (
    <Canvas camera={{ position: [3, 4, 5] }}>
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Ocean position={[0, 0, 0]} waterColor={0x444422} />

      <RerenderTestWrapper />
    </Canvas>
  );
};
