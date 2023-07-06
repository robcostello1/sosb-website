import { memo } from 'react';

import { CubeCamera, useTexture } from '@react-three/drei';

import { VectorProp } from '../consts';

const position: VectorProp = [0, -0.1, 1.5];

const MirrorTest = () => {
  const textureProps = useTexture({
    roughnessMap: "/maps/decals_0006_roughness_1k.jpg",
  });
  return (
    <>
      <CubeCamera position={position} near={0.01}>
        {/* @ts-ignore */}
        {(texture) => {
          return (
            <mesh
              //   rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.11, -0.5]}
              scale={[1, 0.0001, 0.45]}
              receiveShadow
            >
              <cylinderGeometry />
              <meshStandardMaterial
                color={0x444444}
                envMap={texture}
                {...textureProps}
              />
            </mesh>
          );
        }}
      </CubeCamera>
    </>
  );
};

export default memo(MirrorTest);
