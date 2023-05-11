import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FloatingStuff from "./FloatingStuff";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Ocean from "../../../../components/Terrain/Ocean";

export default {
  title: "City/FloatingStuff",
  component: FloatingStuff,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FloatingStuff>;

const Template: ComponentStory<typeof FloatingStuff> = (args) => {
  return (
    <Canvas camera={{ position: [0, 20, 0] }}>
      <OrbitControls />
      <Stats />

      <directionalLight position={[-5, 10, 3]} intensity={0.3} />

      {/* <RaftContent /> */}

      <Ocean position={[0, 0, 0]} waterColor={0x444422} />
      <FloatingStuff {...args} />
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
