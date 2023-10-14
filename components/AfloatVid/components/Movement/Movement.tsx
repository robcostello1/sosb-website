import gsap, { Linear, Power1 } from 'gsap';
import { memo, ReactNode, useEffect, useRef } from 'react';
import { Group } from 'three';

type MovementProps = {
  moving: boolean;
  duration: number;
  start: number;
  end: number;
  children: ReactNode;
};

const Movement = ({
  moving,
  duration,
  start,
  end,
  children,
}: MovementProps) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (groupRef.current && moving) {
      tl.to(groupRef.current.position, {
        duration: 7,
        ease: Power1.easeIn,
        z: start + 10,
      });
      tl.to(groupRef.current.position, {
        duration: duration - 7,
        ease: Linear.easeIn,
        z: end,
      });
    }
  }, [duration, end, start, moving]);

  return (
    <group position={[0, 0, start]} ref={groupRef}>
      {children}
    </group>
  );
};

export default memo(Movement);
