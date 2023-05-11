import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BobbingItem from "./BobbingItem";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Ocean from "../../../../components/Terrain/Ocean";
import Raft from "../Raft";

export default {
  title: "City/BobbingItem",
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
