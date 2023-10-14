import { gsap } from 'gsap';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Euler, Group } from 'three';

import { GroupProps, useFrame } from '@react-three/fiber';

import { Triplet } from '../../../../../utils/types';
import BouncingBuilding from '../BouncingBuilding';
import { BuildingTextureContext } from '../BuildingTextureProvider/BuildingTextureProvider';

type BuildingOrbProps = Omit<GroupProps, "scale"> & {
  active?: boolean;
};

const INIT_BOUNCE_SIZE = 1;
const SPHERE_SCALE = 20;
const DEFAULT_POSITION: Triplet = [0, SPHERE_SCALE * 0.666, 0];
const RING_CONFIG: {
  rotation: Euler;
  scale: Triplet;
  textureIndex: number;
}[] = [];
const NUM_POSITIONS = 64;
for (let i = 0; i < NUM_POSITIONS; i++) {
  RING_CONFIG.push({
    rotation: new Euler(
      Math.PI * 2 * Math.random(),
      0,
      (Math.PI * 2 * i) / NUM_POSITIONS
    ),
    scale: [
      Math.random() + 0.5,
      (Math.random() + 0.5) / 5,
      Math.random() + 0.5,
    ],
    textureIndex: Math.floor(Math.random() * 3),
  });
}
const SCALE_0: Triplet = [0, 0, 0];
const SCALE_1: Triplet = [1, 1, 1];

const BuildingOrb = ({ active = true, ...props }: BuildingOrbProps) => {
  const textureProps = useContext(BuildingTextureContext);
  const [bounceSize, setBounceSize] = useState(INIT_BOUNCE_SIZE);
  const [initActive] = useState(active);

  const groupRef = useRef<Group>(null);

  useFrame(({ clock: { elapsedTime } }) => {
    if (groupRef.current) {
      const speedMultiplier = 0.2;
      groupRef.current.rotation.x = elapsedTime * speedMultiplier;
      groupRef.current.rotation.y = elapsedTime * speedMultiplier;
      groupRef.current.rotation.z = elapsedTime * speedMultiplier;
    }
  });

  useEffect(() => {
    setInterval(() => {
      setBounceSize((prev) => prev + 0.1);
    }, (60 / 123) * 1000 * 4);
  }, []);

  useEffect(() => {
    setBounceSize(INIT_BOUNCE_SIZE);

    groupRef.current &&
      gsap.to(groupRef.current.scale, {
        duration: 10,
        x: active ? 1 : 0,
        y: active ? 1 : 0,
        z: active ? 1 : 0,
      });
  }, [active]);

  return (
    <group ref={groupRef} scale={initActive ? SCALE_1 : SCALE_0} {...props}>
      {RING_CONFIG.map(({ rotation, scale, textureIndex }, index) => (
        <group key={index} rotation={rotation}>
          <BouncingBuilding
            active={active}
            bounceSize={bounceSize}
            position={DEFAULT_POSITION}
            scale={scale}
            textureProps={textureProps[textureIndex]}
          />
        </group>
      ))}
    </group>
  );
};

export default memo(BuildingOrb);
