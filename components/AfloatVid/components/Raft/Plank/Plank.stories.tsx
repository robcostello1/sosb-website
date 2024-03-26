import React from "react";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { REPEAT_WRAPPING } from "../../../../../utils/consts";
import { useTexture } from "../../../hooks/useTexture";
import Plank from "./Plank";

export default {
  title: "Plank",
  component: Plank,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Plank>;

const PlankWrapper: ComponentStory<typeof Plank> = (args) => {
  const textures = useTexture(
    {
      map: getStaticAsset("/maps/optimised/wood_planks_grey_diff_1k.jpg"),
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.wrapS = texture.wrapT = REPEAT_WRAPPING;
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
function getStaticAsset(arg0: string): any {
  throw new Error("Function not implemented.");
}
