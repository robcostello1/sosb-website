import React, { useRef } from 'react';
import { Mesh } from 'three';

import { CameraControls, PointerLockControls, Sphere, StatsGl } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import { Ocean } from '../../Terrain';
import { City, Islands, ShippingScene } from '../components';
import { GlitchBuildings } from '../components/City';
import BuildingTextureProvider from '../components/City/BuildingTextureProvider/BuildingTextureProvider';
import { FloatingScene } from '../components/FloatingStuff';
import SkyStreaks from '../components/Sky/SkyStreaks/SkyStreaks';
import VideoProvider from '../components/Video/VideoProvider';
import PerformanceDemo from './PerformanceDemo';

export default {
  title: "Tests/Scene Performance",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    selectedScene: {
      options: [
        "city",
        "floating",
        "islands",
        "sky streaks",
        "glitch buildings",
        "shipping",
      ],
      control: { type: "check" },
    },
  },
};

type TemplateProps = {
  showOcean: boolean;
  selectedScene: (
    | "city"
    | "floating"
    | "islands"
    | "sky streaks"
    | "glitch buildings"
    | "shipping"
  )[];
};

const handleSetMoving = () => { };

const Template = (args: TemplateProps) => {
  const shouldShow = (scene: TemplateProps["selectedScene"][number]) =>
    args.selectedScene.includes(scene);

  return (
    <Canvas
      camera={{
        position: [0, 2, 0],
      }}
    >
      <StatsGl />

      <CameraControls
        dollySpeed={0}
        // - value to invert
        // azimuthRotateSpeed={0.66}
        // polarRotateSpeed={0.66}
        distance={0.01}
        makeDefault
        ref={(controls) => {
          controls?.moveTo(0, 2, 0);
        }}
      />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <PerformanceDemo position={[0, 2, -10]} />
      {args.showOcean && <Ocean />}

      <BuildingTextureProvider>
        <VideoProvider autoStart>
          <City
            visible={shouldShow("city")}
            duration={1000}
            sinkStart={500}
            size={500}
            moving={true}
            setMoving={handleSetMoving}
          />
        </VideoProvider>

        <Islands
          visible={shouldShow("islands")}
          scale={200}
          position={[-105, -3, 0]}
          bounce={0.6}
        />

        <Islands
          visible={shouldShow("islands")}
          scale={200}
          position={[105, -3, 0]}
          bounce={0.6}
        />

        <ShippingScene visible={shouldShow("shipping")} />

        <FloatingScene visible={shouldShow("floating")} />

        <SkyStreaks visible={shouldShow("sky streaks")} numStreaks={40} />

        <GlitchBuildings visible={shouldShow("glitch buildings")} />
      </BuildingTextureProvider>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  showOcean: true,
  selectedScene: [],
};
