import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, memo } from "react";
import { BackSide, Group, TextureLoader } from "three";
import gsap, { Linear } from "gsap";
import { Environment, Lightformer } from "@react-three/drei";

const Galaxy = () => {
  const galaxyTexture = useLoader(TextureLoader, "/maps/galaxy.jpg");
  const moonTexture = useLoader(TextureLoader, "/maps/moon.jpg");

  const groupRef = useRef<Group>(null);
  const groupRef2 = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        duration: 700,
        // y: Math.PI * 2,
        ease: Linear.easeNone,
        repeat: -1,
        paused: false,
      });
    }
    if (groupRef2.current) {
      gsap.to(groupRef2.current.rotation, {
        duration: 700,
        // y: Math.PI * 2,
        ease: Linear.easeNone,
        repeat: -1,
        paused: false,
      });
    }
  }, [groupRef.current, groupRef2.current]);

  const envContents = useMemo(
    () => (
      <>
        <group position={[300, 600, 600]}>
          <mesh rotation={[0, Math.PI, 0]}>
            <sphereGeometry args={[40, 25, 25]} />
            <meshPhongMaterial
              emissive={0xffffff}
              color={0xffffff}
              map={moonTexture}
              emissiveIntensity={5}
              emissiveMap={moonTexture}
            />
          </mesh>

          <directionalLight intensity={0.4} />
        </group>

        <mesh rotation={[Math.PI * 0.1, Math.PI * 0.4, 0]}>
          <sphereGeometry args={[1000, 25, 25]} />
          <meshBasicMaterial
            color={0xffffff}
            side={BackSide}
            map={galaxyTexture}
          />
        </mesh>
      </>
    ),
    []
  );

  return (
    <>
      <Environment resolution={256} background>
        <group
          rotation={[Math.PI * 0.25, Math.PI * 0.33, -Math.PI * 0.18]}
          ref={groupRef2}
        >
          {envContents}
        </group>
      </Environment>
      <group
        rotation={[Math.PI * 0.25, Math.PI * 0.33, -Math.PI * 0.18]}
        ref={groupRef}
      >
        {envContents}
      </group>
    </>
  );
};

export default memo(Galaxy);
