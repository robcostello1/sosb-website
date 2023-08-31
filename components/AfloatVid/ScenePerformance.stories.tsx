import React, { useEffect, useRef } from 'react';
import { Mesh } from 'three';

import { OrbitControls, PointerLockControls, Sphere, StatsGl } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { Ocean } from '../Terrain';
import { City, Islands } from './components';
import { FloatingScene } from './components/FloatingStuff';
import SkyStreaks from './components/Sky/SkyStreaks/SkyStreaks';

export default {
  title: "Scene Performance",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    selectedScene: {
      options: ["city", "floating", "islands", "sky streaks"],
      control: { type: "check" },
    },
  },
};

type TemplateProps = {
  showOcean: boolean;
  selectedScene: ("city" | "floating" | "islands" | "sky streaks")[];
};

const handleSetMoving = () => {};

const Demo = () => {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta / 2;
      ref.current.rotation.z += delta / 4;
    }
  });

  return (
    <Sphere ref={ref} position={[0, 2, -10]}>
      <meshBasicMaterial wireframe />
    </Sphere>
  );
};

const Template = (args: TemplateProps) => {
  return (
    <Canvas
      camera={{
        position: [0, 2, 0],
      }}
    >
      <StatsGl />

      <PointerLockControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 3, 5]} />

      <Demo />
      {args.showOcean && <Ocean />}

      <City
        visible={args.selectedScene.includes("city")}
        duration={1000}
        sinkStart={500}
        size={500}
        moving={true}
        setMoving={handleSetMoving}
      />

      <Islands
        visible={args.selectedScene.includes("islands")}
        scale={200}
        position={[-105, -3, 0]}
        bounce={0.6}
      />

      <Islands
        visible={args.selectedScene.includes("islands")}
        scale={200}
        position={[105, -3, 0]}
        bounce={0.6}
      />

      <FloatingScene visible={args.selectedScene.includes("floating")} />

      <SkyStreaks
        visible={args.selectedScene.includes("sky streaks")}
        numStreaks={20}
      />
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {
  showOcean: true,
  selectedScene: [],
};
