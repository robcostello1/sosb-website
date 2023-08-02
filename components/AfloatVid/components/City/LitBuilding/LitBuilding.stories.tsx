import React, { useCallback, useEffect } from "react";

import { OrbitControls, Stage, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { getRandomColor } from "../../../../../utils/utils";
import { useSong } from "../../../hooks";
import { useBuildingTextures } from "../hooks";
import LitBuilding, { LitBuildingProps } from "./LitBuilding";

export default {
  title: "City/LitBuilding",
  component: LitBuilding,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    actions: { argTypesRegex: "^noop.*" },
  },
  argTypes: {
    texture: {
      control: "radio",
      options: [1, 2, 3],
    },
  },
} as ComponentMeta<typeof LitBuilding>;

type BuildingWrapperProps = Omit<
  LitBuildingProps,
  "textureProps" | "ref" | "onFrame"
> & {
  texture: 1 | 2 | 3;
  debug?: boolean;
};

const BuildingWrapper = ({
  texture,
  debug = true,
  ...props
}: BuildingWrapperProps) => {
  const textureProps = useBuildingTextures();
  const { barRef, handlePlay } = useSong();

  useEffect(() => {
    window.onclick = function () {
      handlePlay();
    };
  }, [handlePlay]);

  const handleFrame = useCallback<LitBuildingProps["onFrame"]>(
    ({ mesh, lightMaterial }) => {
      if (barRef.current >= 0 && (Math.floor(barRef.current) + 1) % 2 === 0) {
        if (Math.random() > 0.9) {
          console.log({ mesh, lightMaterial });
          mesh.material.transparent = true;
          // TODO this should only be set once per "change"
          mesh.material.needsUpdate = true;
          lightMaterial.color.set(getRandomColor());
        }
      } else {
        mesh.material.transparent = false;
        mesh.material.needsUpdate = true;
      }
    },
    []
  );

  return (
    <LitBuilding
      key={texture}
      textureProps={textureProps[texture - 1]}
      onFrame={handleFrame}
      {...props}
    />
  );
};

const Template: ComponentStory<typeof BuildingWrapper> = (args) => {
  return (
    <Canvas
      camera={{
        position: [5, 5, 60],
      }}
    >
      <Stats />

      <OrbitControls />

      <Stage preset="portrait" environment="night">
        <BuildingWrapper {...args} />
      </Stage>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  texture: 1,
};
