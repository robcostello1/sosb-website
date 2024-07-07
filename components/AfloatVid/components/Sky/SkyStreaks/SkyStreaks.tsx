import { useCallback, useEffect, useRef, useState } from 'react';
import { BackSide, CircleGeometry, DoubleSide, Group, Mesh, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Triplet } from 'utils/types';
import { getRandomColor } from 'utils/utils';

import { MeshLineGeometry, Sphere, Trail } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';

import Arc from '../../Arc';

const BRIGHTNESS_OFFSET = Math.random();
const RANDOMNESS = 2;
const MESH_POSITION: Triplet = [0, 0, -200];
const OUTER_GROUP_POSITION: Triplet = [0, 0, 0];

const getRandomRotation = () => {
  const initial = [0, 0, 0];
  return initial.map(
    (num) => num + (Math.random() * RANDOMNESS - RANDOMNESS / 2)
  ) as Triplet;
};

type SkyStreakProps = {
  visible: boolean;
};

const SkyStreak = ({ visible }: SkyStreakProps) => {
  const [initialColor] = useState(getRandomColor());
  const [innerGroupRotation] = useState<Triplet>([
    Math.random() * Math.PI * 2,
    0,
    0,
  ]);
  const [size] = useState(Math.random() + 0.25);
  const [outerGroupRotation, setOuterGroupRotation] = useState(
    getRandomRotation()
  );

  const groupRef = useRef<Group>(null);
  const arcRef = useRef<Group>(null);
  // const trailRef = useRef<MeshLineGeometry>(null);

  const lastScale = useRef(0);

  const handleAfterAnimation = useCallback(() => {
    //   setOuterGroupRotation(getRandomRotation());
    if (
      arcRef.current
      //     // && trailRef.current
    ) {
      //     // (trailRef.current.material as MeshBasicMaterial).needsUpdate = true;
      //     // (trailRef.current as MeshLineGeometry).visible = visible;
      arcRef.current.visible = visible;
    }
  }, [visible]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x -= delta * (120 / 123);

      if (
        arcRef.current
        // && trailRef.current
      ) {
        lastScale.current = arcRef.current.scale.x;
        const scale =
          Math.max(
            0,
            Math.pow(
              Math.sin(groupRef.current.rotation.x + BRIGHTNESS_OFFSET),
              1
            )
          ) * size;

        // const trailMaterial = trailRef.current.material as MeshBasicMaterial;

        arcRef.current.scale.set(
          arcRef.current.scale.x,
          arcRef.current.scale.y,
          scale
        );
        // trailMaterial.transparent = true;
        // trailMaterial.opacity = scale;
        // trailMaterial.needsUpdate = true;

        if (lastScale.current > 0 && scale === 0) {
          // Change stuff once animation complete
          setTimeout(handleAfterAnimation, 100);
        }
      }
    }
  });

  // const trailAttenuation = useCallback(
  //   (width: number) => Math.pow(width, 2),
  //   []
  // );

  console.log(initialColor);

  return (
    <group rotation={outerGroupRotation} position={OUTER_GROUP_POSITION}>
      <group ref={groupRef} rotation={innerGroupRotation}>
        <Arc
          ref={arcRef}
          scale={[-200, 200, 200 * size]}
          color={initialColor}
        />
      </group>
    </group>
  );
};

const SkyStreaks = ({
  // Warning: don't change again after initial render or else you'll get cut off
  // animations.
  numStreaks = 25,
  ...props
}: { numStreaks?: number } & SkyStreakProps) => {
  const [keys, setKeys] = useState(
    Array.from({ length: numStreaks }, (_, i) => i)
  );

  useEffect(() => {
    setKeys(Array.from({ length: numStreaks }, (_, i) => i));
  }, [numStreaks]);

  return (
    <>
      {keys.map((key) => (
        <SkyStreak key={key} {...props} />
      ))}
    </>
  );
};

export default SkyStreaks;
