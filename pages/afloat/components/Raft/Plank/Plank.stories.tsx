import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Plank from "./Plank";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export default {
  title: "City/Plank",
  component: Plank,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Plank>;

const PlankWrapper: ComponentStory<typeof Plank> = (args) => {
  const textures = useTexture(
    {
      map: "/maps/wood_planks_grey_diff_1k.jpg",
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
      });
    }
  );

  return <Plank {...args} textures={textures} />;
};

const Template: ComponentStory<typeof Plank> = (args) => {
  return (
    <Canvas camera={{ position: [0.4, 0.3, 0.4] }}>
      <OrbitControls />

      <Stage adjustCamera={false} environment="night">
        <PlankWrapper {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  length: 1,
  width: 1,
};
