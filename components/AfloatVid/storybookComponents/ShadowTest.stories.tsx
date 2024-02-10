import React from 'react';
import { Vector3 } from 'three';

import { OrbitControls, Plane, SoftShadows, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import BaseBuilding from '../components/City/BaseBuilding';
import BuildingTextureProvider, {
    BuildingTextureContext
} from '../components/City/BuildingTextureProvider/BuildingTextureProvider';
import RotatingLight from './RotatingLight';

export default {
  title: "Tests/Shadow Test",
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => {
  return (
    <Canvas
      shadows
      camera={{
        position: [70, 4, 80],
      }}
    >
      <Stats />

      <OrbitControls />

      <ambientLight intensity={0.1} />

      <RotatingLight />

      <BuildingTextureProvider>
        <BuildingTextureContext.Consumer>
          {(texturesProps) => (
            <>
              <BaseBuilding
                position={new Vector3(0, 0, 0)}
                scale={new Vector3(1, 2, 1)}
                textureProps={texturesProps[0]}
              />
              <BaseBuilding
                position={new Vector3(40, 0, 40)}
                scale={new Vector3(1, 2, 1)}
                textureProps={texturesProps[0]}
              />
              <BaseBuilding
                position={new Vector3(-40, 0, 40)}
                scale={new Vector3(1, 2, 1)}
                textureProps={texturesProps[1]}
              />
              <BaseBuilding
                position={new Vector3(40, 0, -40)}
                scale={new Vector3(1, 2, 1)}
                textureProps={texturesProps[0]}
              />
              <BaseBuilding
                position={new Vector3(-40, 0, -40)}
                scale={new Vector3(1, 2, 1)}
                textureProps={texturesProps[2]}
              />
            </>
          )}
        </BuildingTextureContext.Consumer>
      </BuildingTextureProvider>
      <Plane
        receiveShadow
        position={[0, -40, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[1000, 1000, 100, 100]}
      >
        <meshStandardMaterial />
      </Plane>
    </Canvas>
  );
};

export const Default = Template.bind({});

Default.args = {};
