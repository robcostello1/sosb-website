import React from "react";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Ocean from "../../../Terrain/Ocean";
import Raft from "../Raft";
import BobbingItem from "./BobbingItem";

export default {
  title: "Sea/BobbingItem",
  component: BobbingItem,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof BobbingItem>;

const Template: ComponentStory<typeof BobbingItem> = ({ ...args }) => {
  return (
    <Canvas camera={{ position: [3, 4, 5] }}>
      <Stats />

      {<OrbitControls />}

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Ocean position={[0, 0, 0]} waterColor={0x444422} />

      <BobbingItem {...args} />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  children: <Raft />,
};
