import gsap, { Power2 } from "gsap";
import { useEffect, useRef } from "react";
import { Group } from "three";
import { Triplet } from "utils/types";

import { Screen } from "../City";
import Ship from "./Ship";
import ShippingContainer from "./ShippingContainer";

type ShippingSceneProps = {
  position?: Triplet;
  visible?: boolean;
  debug?: boolean;
};

const START_POSITION_X = -90;
const START_POSITION_Y = -40;
const DURATION = 60;

const ShippingScene = ({ position, visible, debug }: ShippingSceneProps) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      if (visible) {
        gsap.to(groupRef.current.position, {
          ease: Power2.easeInOut,
          duration: DURATION,
          x: 0,
        });
        gsap.to(groupRef.current.position, {
          ease: Power2.easeInOut,
          duration: DURATION,
          y: 0,
        });
      } else {
        gsap.to(groupRef.current.position, {
          ease: Power2.easeInOut,
          duration: DURATION,
          x: debug ? 0 : START_POSITION_X,
        });
        gsap.to(groupRef.current.position, {
          ease: Power2.easeInOut,
          duration: DURATION,
          y: debug ? 0 : START_POSITION_Y,
        });
      }
    }
  }, [visible, debug]);

  return (
    <group position={position}>
      <group
        ref={groupRef}
        position={[
          debug ? 0 : START_POSITION_X,
          debug ? 0 : START_POSITION_Y,
          0,
        ]}
      >
        <ShippingContainer position={[10, 0, 20]} rotation={[1, 0.1, 0.1]} />
        <ShippingContainer
          position={[-10, -0.5, 30]}
          rotation={[2, -0.1, 0.1]}
        />
        <ShippingContainer position={[12, 0, -1]} rotation={[-1, 1, -0.1]} />

        <Screen
          rotation={[-0.8, 1, 0.4]}
          boxArgs={[8, 4, 0.1]}
          start={true}
          position={[-10, 0.2, 16]}
        />

        <Screen
          rotation={[-0.2, -1, -0.2]}
          boxArgs={[6, 3, 0.1]}
          start={true}
          position={[12, 0.4, 10]}
        />

        <Ship />
      </group>
    </group>
  );
};

export default ShippingScene;
